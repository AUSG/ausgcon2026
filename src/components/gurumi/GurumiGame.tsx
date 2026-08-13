"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";

import {
  buildGurumiReferenceModel,
  GURUMI_PART_IDS,
  GURUMI_SCORE_GRID_SIZE,
  scoreDrawing,
  type GurumiPartId,
  type GurumiReferenceModel,
} from "@/lib/gurumi/similarity";
import {
  createScoreRecord,
  GURUMI_LEADERBOARD_LIMIT,
  isLeaderboardResponse,
  isScoreRecord,
  isScoreSubmissionResponse,
  sortRecords,
  type ScoreRecord,
  type ScoreSubmission,
  type ScoreSubmissionResponse,
} from "@/lib/gurumi/records";
import { encodeStrokes } from "@/lib/gurumi/stroke-codec";

import { DrawingCanvas, type DrawingCanvasHandle } from "./DrawingCanvas";
import styles from "./GurumiGame.module.css";

const REFERENCE_IMAGE = "/assets/ausgcon/gurumi/reference.png";
const SCORE_STORAGE_KEY = "ausgcon-2026-gurumi-scores-semantic-v2";
const PENDING_STORAGE_KEY = "ausgcon-2026-gurumi-pending-semantic-v2";
const ROUND_DURATION = 30_000;
const LEADERBOARD_REFRESH_INTERVAL = 10_000;

const PART_LABELS: Record<GurumiPartId, string> = {
  body: "몸통",
  eyes: "양쪽 눈",
  cap: "모자",
  raisedArm: "든 팔",
  propHand: "소품·손",
  face: "코·입",
  feet: "두 발",
};

type Phase = "intro" | "countdown" | "drawing" | "scoring" | "result";
type StorageMode = "loading" | "live" | "saving" | "offline";

type PendingScore = {
  record: ScoreRecord;
  submission: ScoreSubmission;
};

function isPendingScore(value: unknown): value is PendingScore {
  if (!value || typeof value !== "object") return false;
  const pending = value as Partial<PendingScore>;
  return (
    isScoreRecord(pending.record) &&
    Boolean(pending.submission) &&
    typeof pending.submission?.id === "string" &&
    typeof pending.submission.name === "string" &&
    typeof pending.submission.strokes === "string" &&
    pending.submission.id === pending.record.id
  );
}

function readCachedRecords() {
  try {
    const stored = window.localStorage.getItem(SCORE_STORAGE_KEY);
    if (!stored) return [];
    const parsed: unknown = JSON.parse(stored);
    return Array.isArray(parsed)
      ? sortRecords(parsed.filter(isScoreRecord)).slice(0, GURUMI_LEADERBOARD_LIMIT)
      : [];
  } catch {
    return [];
  }
}

function readPendingScores() {
  try {
    const stored = window.localStorage.getItem(PENDING_STORAGE_KEY);
    if (!stored) return [];
    const parsed: unknown = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed.filter(isPendingScore).slice(-25) : [];
  } catch {
    return [];
  }
}

function persistPendingScores(pendingScores: PendingScore[]) {
  try {
    if (pendingScores.length === 0) {
      window.localStorage.removeItem(PENDING_STORAGE_KEY);
      return;
    }
    window.localStorage.setItem(PENDING_STORAGE_KEY, JSON.stringify(pendingScores.slice(-25)));
  } catch {
    // A failed submission still remains visible in memory for the current round.
  }
}

function mergeRecords(serverRecords: ScoreRecord[], pendingScores: PendingScore[]) {
  const recordsById = new Map<string, ScoreRecord>();
  for (const pending of pendingScores) recordsById.set(pending.record.id, pending.record);
  for (const record of serverRecords) recordsById.set(record.id, record);
  return sortRecords([...recordsById.values()]).slice(0, GURUMI_LEADERBOARD_LIMIT);
}

async function fetchWithTimeout(input: RequestInfo | URL, init?: RequestInit) {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 8_000);
  try {
    return await fetch(input, { ...init, signal: controller.signal });
  } finally {
    window.clearTimeout(timeout);
  }
}

async function loadServerLeaderboard() {
  const response = await fetchWithTimeout("/api/gurumi/scores", { cache: "no-store" });
  if (!response.ok) throw new Error("Leaderboard request failed.");
  const body: unknown = await response.json();
  if (!isLeaderboardResponse(body)) throw new Error("Leaderboard response is invalid.");
  return body.leaderboard;
}

async function submitScore(submission: ScoreSubmission): Promise<ScoreSubmissionResponse> {
  const response = await fetchWithTimeout("/api/gurumi/scores", {
    body: JSON.stringify(submission),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  });
  if (!response.ok) throw new Error("Score submission failed.");
  const body: unknown = await response.json();
  if (!isScoreSubmissionResponse(body)) throw new Error("Score response is invalid.");
  return body;
}

function resultMessage(score: number) {
  if (score >= 90) return "구르미 그 자체!";
  if (score >= 75) return "구르미 마스터!";
  if (score >= 55) return "제법 닮았구름!";
  if (score >= 30) return "상상력이 피어났구름!";
  return "30초의 용기가 멋져요!";
}

function KioskHeader() {
  return (
    <header className={styles.header}>
      <Link className={styles.brand} href="/" aria-label="AUSGCON 2026 홈으로 이동">
        AUSGCON <span>2026</span>
      </Link>
      <div className={styles.boothId}>
        <span>BOOTH</span>
        <strong>03</strong>
      </div>
    </header>
  );
}

const STORAGE_STATUS_LABEL: Record<StorageMode, string> = {
  loading: "CONNECTING",
  live: "TURSO LIVE",
  saving: "SAVING",
  offline: "LOCAL BACKUP",
};

function FullLeaderboard({
  open,
  records,
  storageMode,
  onClose,
  highlightId,
}: {
  open: boolean;
  records: ScoreRecord[];
  storageMode: StorageMode;
  onClose: () => void;
  highlightId?: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const headingId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      aria-labelledby={headingId}
      className={styles.fullRankingDialog}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      onClose={onClose}
      ref={dialogRef}
    >
      <div className={styles.fullRankingBoard}>
        <header className={styles.fullRankingHeader}>
          <div>
            <p>ALL CHALLENGERS</p>
            <h2 id={headingId}>전체 랭킹</h2>
          </div>
          <div className={styles.fullRankingMeta}>
            <span>{STORAGE_STATUS_LABEL[storageMode]}</span>
            <strong>{records.length.toLocaleString("ko-KR")}</strong>
            <small>명 참여</small>
          </div>
          <button aria-label="전체 랭킹 닫기" onClick={onClose} type="button">
            닫기 <span aria-hidden="true">×</span>
          </button>
        </header>

        <div className={styles.fullRankingLegend} aria-hidden="true">
          {[0, 1, 2].map((column) => (
            <div key={column}>
              <span>RANK</span>
              <span>CHALLENGER</span>
              <span>SCORE</span>
            </div>
          ))}
        </div>

        {open && records.length > 0 ? (
          <ol className={styles.fullRankGrid}>
            {records.map((record, index) => (
              <li
                aria-current={record.id === highlightId ? "true" : undefined}
                className={record.id === highlightId ? styles.fullRankHighlighted : undefined}
                data-podium={index < 3 ? "true" : undefined}
                key={record.id}
              >
                <span className={styles.fullRankNumber}>
                  {String(index + 1).padStart(3, "0")}
                </span>
                <strong>{record.name}</strong>
                <span className={styles.fullRankScore}>
                  <b>{record.score}</b>
                  <small>PTS</small>
                </span>
              </li>
            ))}
          </ol>
        ) : (
          <div className={styles.fullRankingEmpty}>
            <strong>아직 기록이 없어요.</strong>
            <span>첫 번째 구르미를 기다리고 있습니다.</span>
          </div>
        )}

        <footer className={styles.fullRankingFooter}>
          <span>점수순 · 동점일 경우 보정점수와 기록시각 순</span>
          <b>AUSGCON 2026 · BOOTH 03</b>
        </footer>
      </div>
    </dialog>
  );
}

function Leaderboard({
  records,
  storageMode,
  highlightId,
}: {
  records: ScoreRecord[];
  storageMode: StorageMode;
  highlightId?: string;
}) {
  const [fullRankingOpen, setFullRankingOpen] = useState(false);
  const topFive = records.slice(0, 5);

  return (
    <>
      <div className={styles.leaderboard}>
        <div className={styles.leaderboardHeading}>
          <div>
            <p>TODAY&apos;S RANKING</p>
            <h2>오늘의 TOP 5</h2>
          </div>
          <span>{STORAGE_STATUS_LABEL[storageMode]}</span>
        </div>
        {topFive.length > 0 ? (
          <ol className={styles.rankList}>
            {topFive.map((record, index) => (
              <li
                className={record.id === highlightId ? styles.highlightedRank : undefined}
                key={record.id}
              >
                <span className={styles.rankNumber}>{String(index + 1).padStart(2, "0")}</span>
                <strong>{record.name}</strong>
                <b>{record.score}</b>
              </li>
            ))}
          </ol>
        ) : (
          <div className={styles.emptyRanking}>
            <strong>첫 번째 기록을 기다리는 중</strong>
            <span>오늘의 1위가 되어보세요.</span>
          </div>
        )}
        <div className={styles.leaderboardFooter}>
          {storageMode === "offline" && (
            <p className={styles.localNotice}>
              연결 전까지 이 기기에 보관하고 자동으로 다시 저장합니다.
            </p>
          )}
          <button
            className={styles.fullRankingButton}
            disabled={records.length === 0}
            onClick={() => setFullRankingOpen(true)}
            type="button"
          >
            <span>전체 랭킹</span>
            <b>{records.length.toLocaleString("ko-KR")}명</b>
            <span aria-hidden="true">↗</span>
          </button>
        </div>
      </div>
      <FullLeaderboard
        highlightId={highlightId}
        onClose={() => setFullRankingOpen(false)}
        open={fullRankingOpen}
        records={records}
        storageMode={storageMode}
      />
    </>
  );
}

export function GurumiGame() {
  const canvasRef = useRef<DrawingCanvasHandle>(null);
  const resultSectionRef = useRef<HTMLElement>(null);
  const recordsRef = useRef<ScoreRecord[]>([]);
  const synchronizingRef = useRef(false);
  const roundFinishedRef = useRef(false);
  const revealTimeoutRef = useRef<number | null>(null);
  const [phase, setPhase] = useState<Phase>("intro");
  const [name, setName] = useState("");
  const [countdown, setCountdown] = useState(3);
  const [secondsLeft, setSecondsLeft] = useState(ROUND_DURATION / 1_000);
  const [referenceModel, setReferenceModel] = useState<GurumiReferenceModel | null>(null);
  const [referenceError, setReferenceError] = useState(false);
  const [records, setRecords] = useState<ScoreRecord[]>([]);
  const [currentRecord, setCurrentRecord] = useState<ScoreRecord | null>(null);
  const [storageMode, setStorageMode] = useState<StorageMode>("loading");

  useEffect(() => {
    const cachedRecords = readCachedRecords();
    recordsRef.current = cachedRecords;
    setRecords(cachedRecords);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const image = new window.Image();
    image.src = REFERENCE_IMAGE;
    image.onload = () => {
      if (cancelled) return;
      const canvas = document.createElement("canvas");
      canvas.width = GURUMI_SCORE_GRID_SIZE;
      canvas.height = GURUMI_SCORE_GRID_SIZE;
      const context = canvas.getContext("2d", { willReadFrequently: true });
      if (!context) {
        setReferenceError(true);
        return;
      }
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      try {
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        setReferenceModel(buildGurumiReferenceModel(imageData));
      } catch {
        setReferenceError(true);
      }
    };
    image.onerror = () => {
      if (!cancelled) setReferenceError(true);
    };

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(
    () => () => {
      if (revealTimeoutRef.current !== null) window.clearTimeout(revealTimeoutRef.current);
    },
    [],
  );

  const persistRecords = useCallback((nextRecords: ScoreRecord[]) => {
    try {
      window.localStorage.setItem(SCORE_STORAGE_KEY, JSON.stringify(nextRecords));
    } catch {
      // The round still completes if private browsing or storage limits block persistence.
    }
  }, []);

  const synchronizeRecords = useCallback(async () => {
    if (synchronizingRef.current) return;
    synchronizingRef.current = true;
    let pendingScores = readPendingScores();
    let serverRecords: ScoreRecord[] | null = null;

    try {
      for (const pending of [...pendingScores]) {
        const response = await submitScore(pending.submission);
        serverRecords = response.leaderboard;
        pendingScores = pendingScores.filter((candidate) => candidate.record.id !== pending.record.id);
        persistPendingScores(pendingScores);
      }

      serverRecords ??= await loadServerLeaderboard();
      pendingScores = readPendingScores();
      const nextRecords = mergeRecords(serverRecords, pendingScores);
      recordsRef.current = nextRecords;
      setRecords(nextRecords);
      setCurrentRecord((current) =>
        current ? nextRecords.find((record) => record.id === current.id) ?? current : null,
      );
      persistRecords(nextRecords);
      setStorageMode(pendingScores.length > 0 ? "offline" : "live");
    } catch {
      const nextRecords = mergeRecords(readCachedRecords(), pendingScores);
      recordsRef.current = nextRecords;
      setRecords(nextRecords);
      setStorageMode("offline");
    } finally {
      synchronizingRef.current = false;
    }
  }, [persistRecords]);

  useEffect(() => {
    void synchronizeRecords();
    const interval = window.setInterval(() => {
      void synchronizeRecords();
    }, LEADERBOARD_REFRESH_INTERVAL);
    return () => window.clearInterval(interval);
  }, [synchronizeRecords]);

  const finishRound = useCallback(async () => {
    if (roundFinishedRef.current || !referenceModel) return;
    roundFinishedRef.current = true;
    setSecondsLeft(0);
    setPhase("scoring");
    setStorageMode("saving");
    const scoringStartedAt = performance.now();

    const strokes = canvasRef.current?.getStrokes() ?? [];
    const score = scoreDrawing(strokes, referenceModel);
    const id = window.crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const localRecord = createScoreRecord({
      id,
      name: name.trim(),
      createdAt: new Date().toISOString(),
      score,
    });
    const { encoded } = encodeStrokes(strokes);
    const submission: ScoreSubmission = {
      id,
      name: localRecord.name,
      strokes: encoded,
    };
    let record = localRecord;
    let nextRecords: ScoreRecord[];

    try {
      const response = await submitScore(submission);
      record = response.record;
      nextRecords = sortRecords(response.leaderboard).slice(0, GURUMI_LEADERBOARD_LIMIT);
      const remainingPending = readPendingScores().filter(
        (pending) => pending.record.id !== record.id,
      );
      persistPendingScores(remainingPending);
      setStorageMode("live");
    } catch {
      const pendingScores = readPendingScores();
      persistPendingScores([
        ...pendingScores.filter((pending) => pending.record.id !== localRecord.id),
        { record: localRecord, submission },
      ]);
      nextRecords = sortRecords([...recordsRef.current, localRecord]).slice(
        0,
        GURUMI_LEADERBOARD_LIMIT,
      );
      setStorageMode("offline");
    }

    setCurrentRecord(record);
    recordsRef.current = nextRecords;
    setRecords(nextRecords);
    persistRecords(nextRecords);

    const remainingRevealDelay = Math.max(0, 900 - (performance.now() - scoringStartedAt));
    revealTimeoutRef.current = window.setTimeout(() => {
      setPhase("result");
    }, remainingRevealDelay);
  }, [name, persistRecords, referenceModel]);

  useEffect(() => {
    if (phase !== "countdown") return;
    const startedAt = performance.now();
    setCountdown(3);

    const interval = window.setInterval(() => {
      const elapsed = performance.now() - startedAt;
      const nextCount = Math.ceil((3_000 - elapsed) / 1_000);
      if (nextCount <= 0) {
        window.clearInterval(interval);
        setPhase("drawing");
      } else {
        setCountdown(nextCount);
      }
    }, 50);

    return () => window.clearInterval(interval);
  }, [phase]);

  useEffect(() => {
    if (phase !== "drawing") return;
    const deadline = performance.now() + ROUND_DURATION;
    let animationFrame = 0;

    const tick = () => {
      const remaining = Math.max(0, deadline - performance.now());
      const nextSeconds = Math.ceil(remaining / 1_000);
      setSecondsLeft((previousSeconds) =>
        previousSeconds === nextSeconds ? previousSeconds : nextSeconds,
      );
      if (remaining <= 0) {
        void finishRound();
        return;
      }
      animationFrame = window.requestAnimationFrame(tick);
    };

    animationFrame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [finishRound, phase]);

  useEffect(() => {
    if (phase !== "result") return;
    const frame = window.requestAnimationFrame(() => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      resultSectionRef.current?.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [phase]);

  const sortedRecords = useMemo(() => sortRecords(records), [records]);
  const currentRank = useMemo(() => {
    if (!currentRecord) return null;
    const index = sortedRecords.findIndex((record) => record.id === currentRecord.id);
    return index >= 0 ? index + 1 : null;
  }, [currentRecord, sortedRecords]);
  const validName = name.trim().length >= 2;
  const referenceReady = referenceModel !== null && !referenceError;

  const startRound = () => {
    if (!validName || !referenceReady) return;
    roundFinishedRef.current = false;
    if (revealTimeoutRef.current !== null) window.clearTimeout(revealTimeoutRef.current);
    revealTimeoutRef.current = null;
    canvasRef.current?.clear();
    setSecondsLeft(ROUND_DURATION / 1_000);
    setCurrentRecord(null);
    setPhase("countdown");
  };

  const resetForNextParticipant = () => {
    canvasRef.current?.clear();
    setName("");
    setCurrentRecord(null);
    setSecondsLeft(ROUND_DURATION / 1_000);
    setPhase("intro");
  };

  const exportRecords = () => {
    const escapeCell = (value: string | number) => {
      const text = String(value);
      const spreadsheetSafeText = typeof value === "string" && /^[=+\-@]/.test(text) ? `'${text}` : text;
      return `"${spreadsheetSafeText.replaceAll('"', '""')}"`;
    };
    const rows = [
      [
        "순위",
        "닉네임",
        "점수",
        "보정점수",
        "원시점수",
        "의미점수",
        "전체형태점수",
        "잉크밀도",
        "겹쳐그리기효율",
        "선방향다양성",
        "반복폐곡선",
        ...GURUMI_PART_IDS.map((part) => PART_LABELS[part]),
        "기록시각",
        "채점버전",
      ],
      ...sortedRecords.map((record, index) => [
        index + 1,
        record.name,
        record.score,
        record.calibrated.toFixed(6),
        record.raw.toFixed(6),
        record.semantic.toFixed(6),
        record.global.toFixed(6),
        record.densityRatio.toFixed(6),
        record.overdrawEfficiency.toFixed(6),
        record.orientationEntropy.toFixed(6),
        record.loopMonotony.toFixed(6),
        ...GURUMI_PART_IDS.map((part) => record.partScores[part].toFixed(6)),
        record.createdAt,
        record.scoreVersion,
      ]),
    ];
    const csv = `\uFEFF${rows.map((row) => row.map(escapeCell).join(",")).join("\n")}`;
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `ausgcon-gurumi-scores-${new Date().toISOString().slice(0, 10)}.csv`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  if (phase === "intro") {
    return (
      <main className={styles.page}>
        <div className={styles.gridBackdrop} aria-hidden="true" />
        <KioskHeader />
        <div className={styles.introLayout}>
          <section className={styles.introCopy}>
            <p className={styles.eyebrow}>AUSGCON 2026 · SIDE EVENT</p>
            <h1>
              DRAW
              <strong>GURUMI</strong>
            </h1>
            <p className={styles.introLead}>
              30초 안에 점프하는 AUSG 구르미를 그려보세요.
              <br />
              완성된 그림을 원본과 비교해 유사도 점수를 알려드려요.
            </p>

            <div className={styles.ruleRow} aria-label="게임 규칙">
              <span><b>01</b> 마우스로 그리기</span>
              <span><b>02</b> 제한 시간 30초</span>
              <span><b>03</b> 자동 채점</span>
            </div>

            <div className={styles.entryForm}>
              <label htmlFor="gurumi-name">기록에 남길 닉네임</label>
              <div className={styles.inputRow}>
                <input
                  id="gurumi-name"
                  autoComplete="off"
                  maxLength={10}
                  placeholder="2–10자로 입력"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") startRound();
                  }}
                />
                <button disabled={!validName || !referenceReady} onClick={startRound} type="button">
                  {referenceReady ? "도전 시작" : "이미지 준비 중"}
                  <span aria-hidden="true">↗</span>
                </button>
              </div>
              <p>닉네임과 점수만 현장 리더보드에 공개돼요.</p>
              {referenceError && (
                <p className={styles.errorMessage}>기준 이미지를 불러오지 못했습니다. 새로고침해 주세요.</p>
              )}
            </div>
          </section>

          <section className={styles.introVisual} aria-label="그리기 기준 이미지">
            <div className={styles.characterCard}>
              <div className={styles.characterLabel}>
                <span>TARGET</span>
                <b>점프 구르미</b>
              </div>
              <Image
                alt="주황색 모자를 쓰고 보라색 소품을 든 채 점프하는 AUSG 구르미"
                className={styles.characterImage}
                height={1254}
                priority
                sizes="(max-width: 900px) 82vw, 38vw"
                src={REFERENCE_IMAGE}
                width={1254}
              />
              <p>한 손은 번쩍, 한 손엔 보라색 소품!</p>
            </div>
          </section>

          <aside className={styles.introRanking}>
            <Leaderboard records={sortedRecords} storageMode={storageMode} />
            <details className={styles.operatorTools}>
              <summary>운영 도구</summary>
              <div>
                <button disabled={sortedRecords.length === 0} onClick={exportRecords} type="button">
                  CSV 내보내기
                </button>
              </div>
            </details>
          </aside>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.gridBackdrop} aria-hidden="true" />
      <KioskHeader />
      <div className={styles.gameLayout}>
        <div className={styles.gameStatus}>
          <div>
            <p>CHALLENGER</p>
            <strong>{name.trim()}</strong>
          </div>
          <div className={styles.phaseLabel}>
            {phase === "countdown" && "READY"}
            {phase === "drawing" && "DRAW NOW"}
            {phase === "scoring" && "ANALYZING"}
            {phase === "result" && "RESULT"}
          </div>
          <div className={styles.timer} data-danger={phase === "drawing" && secondsLeft <= 5}>
            <span>TIME LEFT</span>
            <strong aria-live="polite">{secondsLeft}</strong>
            <small>SEC</small>
          </div>
        </div>

        <div className={styles.gameStage}>
          <section className={styles.referencePanel}>
            <div className={styles.panelHeading}>
              <span>REFERENCE</span>
              <b>이 구르미를 따라 그려보세요</b>
            </div>
            <div className={styles.referenceImageWrap}>
              <Image
                alt="주황색 모자를 쓰고 보라색 소품을 든 채 점프하는 AUSG 구르미 기준 이미지"
                fill
                priority
                sizes="(max-width: 900px) 88vw, 40vw"
                src={REFERENCE_IMAGE}
              />
            </div>
          </section>

          <section className={styles.canvasPanel}>
            <div className={styles.panelHeading}>
              <span>YOUR DRAWING</span>
              <div className={styles.canvasActions}>
                <button disabled={phase !== "drawing"} onClick={() => canvasRef.current?.undo()} type="button">
                  한 획 취소
                </button>
                <button disabled={phase !== "drawing"} onClick={() => canvasRef.current?.clear()} type="button">
                  전체 지우기
                </button>
              </div>
            </div>
            <DrawingCanvas disabled={phase !== "drawing"} ref={canvasRef} />
          </section>

          {phase === "countdown" && (
            <div className={styles.countdownOverlay} aria-live="assertive">
              <p>구르미를 잘 봐주세요</p>
              <strong key={countdown}>{countdown}</strong>
              <span>마우스를 준비하세요</span>
            </div>
          )}

          {phase === "scoring" && (
            <div className={styles.scoringOverlay} aria-live="polite">
              <div className={styles.scoringCloud} aria-hidden="true">☁</div>
              <strong>구르미와 닮은 점을 찾는 중…</strong>
              <span>완성된 그림을 원본과 비교하고 있어요.</span>
            </div>
          )}
        </div>

        {phase === "result" && currentRecord && (
          <section className={styles.resultSection} ref={resultSectionRef}>
            <div className={styles.scoreCard}>
              <p>MATCH SCORE</p>
              <div className={styles.scoreValue}>
                <strong>{currentRecord.score}</strong>
                <span>점</span>
              </div>
              <h2>{resultMessage(currentRecord.score)}</h2>
              <p className={styles.rankCopy}>
                {currentRank === 1
                  ? "새로운 1위 기록이에요!"
                  : currentRank
                    ? `현재 ${currentRank}위예요. 순위는 행사 종료 전까지 바뀔 수 있어요.`
                    : "기록을 저장했어요."}
              </p>
              <button onClick={resetForNextParticipant} type="button">
                다음 참가자 <span aria-hidden="true">→</span>
              </button>
            </div>
            <Leaderboard
              highlightId={currentRecord.id}
              records={sortedRecords}
              storageMode={storageMode}
            />
          </section>
        )}
      </div>
    </main>
  );
}
