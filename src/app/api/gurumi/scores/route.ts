import {
  createScoreRecord,
  type ScoreSubmission,
} from "@/lib/gurumi/records";
import { scoreGurumiDrawing } from "@/lib/gurumi/server-score";
import { decodeStrokes } from "@/lib/gurumi/stroke-codec";
import {
  listGurumiScores,
  saveGurumiScore,
} from "@/lib/gurumi/storage";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const RESPONSE_HEADERS = {
  "Cache-Control": "no-store",
};

function errorResponse(message: string, status: number) {
  return Response.json({ error: message }, { headers: RESPONSE_HEADERS, status });
}

function normalizeName(value: unknown) {
  if (typeof value !== "string") return null;
  const name = value.normalize("NFKC").replace(/\s+/g, " ").trim();
  const length = Array.from(name).length;
  if (length < 2 || length > 10 || /[\u0000-\u001F\u007F]/.test(name)) return null;
  return name;
}

function normalizeSubmission(value: unknown): ScoreSubmission | null {
  if (!value || typeof value !== "object") return null;
  const submission = value as Partial<ScoreSubmission>;
  const name = normalizeName(submission.name);

  if (
    !name ||
    typeof submission.id !== "string" ||
    !/^[A-Za-z0-9-]{8,80}$/.test(submission.id) ||
    typeof submission.strokes !== "string"
  ) {
    return null;
  }

  return { id: submission.id, name, strokes: submission.strokes };
}

export async function GET() {
  try {
    return Response.json(
      { leaderboard: await listGurumiScores() },
      { headers: RESPONSE_HEADERS },
    );
  } catch (error) {
    console.error("Failed to load the Gurumi leaderboard.", error);
    return errorResponse("랭킹을 불러오지 못했습니다.", 503);
  }
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (Number.isFinite(contentLength) && contentLength > 500_000) {
    return errorResponse("그림 데이터가 너무 큽니다.", 413);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return errorResponse("요청 형식이 올바르지 않습니다.", 400);
  }

  const submission = normalizeSubmission(body);
  if (!submission) return errorResponse("참가자 정보가 올바르지 않습니다.", 400);

  let decoded: ReturnType<typeof decodeStrokes>;
  try {
    decoded = decodeStrokes(submission.strokes);
  } catch {
    return errorResponse("그림 좌표를 읽을 수 없습니다.", 400);
  }

  try {
    const score = await scoreGurumiDrawing(decoded.strokes);
    const candidate = createScoreRecord({
      id: submission.id,
      name: submission.name,
      score,
      createdAt: new Date().toISOString(),
    });
    const record = await saveGurumiScore({
      record: candidate,
      scoreDetails: score,
      strokes: submission.strokes,
      pointCount: decoded.pointCount,
    });
    const leaderboard = await listGurumiScores();

    return Response.json({ leaderboard, record }, { headers: RESPONSE_HEADERS, status: 201 });
  } catch (error) {
    console.error("Failed to save a Gurumi score.", error);
    return errorResponse("점수를 저장하지 못했습니다. 잠시 후 다시 시도해 주세요.", 503);
  }
}
