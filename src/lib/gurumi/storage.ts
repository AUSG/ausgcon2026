import "server-only";

import { createClient, type Client, type Row } from "@libsql/client";

import {
  GURUMI_LEADERBOARD_LIMIT,
  isScoreRecord,
  type ScoreRecord,
} from "./records";
import type { SimilarityScore } from "./similarity";

const TABLE_NAME = "gurumi_scores";

let client: Client | null = null;
let schemaPromise: Promise<void> | null = null;

function requiredEnvironmentVariable(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

function getClient() {
  if (!client) {
    client = createClient({
      authToken: requiredEnvironmentVariable("AUSGCON2026_TURSO_AUTH_TOKEN"),
      url: requiredEnvironmentVariable("AUSGCON2026_TURSO_DATABASE_URL"),
    });
  }
  return client;
}

async function ensureSchema() {
  if (!schemaPromise) {
    schemaPromise = getClient()
      .batch(
        [
          `CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            score INTEGER NOT NULL CHECK (score BETWEEN 0 AND 100),
            calibrated REAL NOT NULL,
            raw REAL NOT NULL,
            semantic REAL NOT NULL,
            global_score REAL NOT NULL,
            density_ratio REAL NOT NULL,
            overdraw_efficiency REAL NOT NULL,
            orientation_entropy REAL NOT NULL,
            loop_monotony REAL NOT NULL,
            part_scores TEXT NOT NULL,
            score_details TEXT NOT NULL,
            strokes TEXT NOT NULL,
            point_count INTEGER NOT NULL,
            created_at TEXT NOT NULL,
            score_version TEXT NOT NULL
          )`,
          `CREATE INDEX IF NOT EXISTS idx_${TABLE_NAME}_ranking
            ON ${TABLE_NAME} (score DESC, calibrated DESC, raw DESC, created_at ASC)`,
          `CREATE INDEX IF NOT EXISTS idx_${TABLE_NAME}_created_at
            ON ${TABLE_NAME} (created_at DESC)`,
        ],
        "write",
      )
      .then(() => undefined)
      .catch((error: unknown) => {
        schemaPromise = null;
        throw error;
      });
  }

  return schemaPromise;
}

function numberFromRow(value: Row[string]) {
  if (typeof value === "number") return value;
  if (typeof value === "bigint") return Number(value);
  if (typeof value === "string") return Number(value);
  return Number.NaN;
}

function stringFromRow(value: Row[string]) {
  return typeof value === "string" ? value : String(value ?? "");
}

function recordFromRow(row: Row): ScoreRecord {
  const candidate: ScoreRecord = {
    id: stringFromRow(row.id),
    name: stringFromRow(row.name),
    score: numberFromRow(row.score),
    calibrated: numberFromRow(row.calibrated),
    raw: numberFromRow(row.raw),
    semantic: numberFromRow(row.semantic),
    global: numberFromRow(row.global_score),
    densityRatio: numberFromRow(row.density_ratio),
    overdrawEfficiency: numberFromRow(row.overdraw_efficiency),
    orientationEntropy: numberFromRow(row.orientation_entropy),
    loopMonotony: numberFromRow(row.loop_monotony),
    partScores: JSON.parse(stringFromRow(row.part_scores)) as ScoreRecord["partScores"],
    createdAt: stringFromRow(row.created_at),
    scoreVersion: stringFromRow(row.score_version),
  };

  if (!isScoreRecord(candidate)) throw new Error("Stored Gurumi score has an invalid shape.");
  return candidate;
}

export async function listGurumiScores(limit = GURUMI_LEADERBOARD_LIMIT) {
  await ensureSchema();
  const safeLimit = Math.min(GURUMI_LEADERBOARD_LIMIT, Math.max(1, Math.trunc(limit)));
  const result = await getClient().execute({
    sql: `SELECT id, name, score, calibrated, raw, semantic, global_score,
      density_ratio, overdraw_efficiency, orientation_entropy, loop_monotony,
      part_scores, created_at, score_version
      FROM ${TABLE_NAME}
      ORDER BY score DESC, calibrated DESC, raw DESC, created_at ASC
      LIMIT ?`,
    args: [safeLimit],
  });

  return result.rows.map(recordFromRow);
}

export async function findGurumiScore(id: string) {
  await ensureSchema();
  const result = await getClient().execute({
    sql: `SELECT id, name, score, calibrated, raw, semantic, global_score,
      density_ratio, overdraw_efficiency, orientation_entropy, loop_monotony,
      part_scores, created_at, score_version
      FROM ${TABLE_NAME}
      WHERE id = ?
      LIMIT 1`,
    args: [id],
  });

  return result.rows[0] ? recordFromRow(result.rows[0]) : null;
}

export async function findGurumiDrawing(id: string) {
  await ensureSchema();
  const result = await getClient().execute({
    sql: `SELECT strokes FROM ${TABLE_NAME} WHERE id = ? LIMIT 1`,
    args: [id],
  });
  return result.rows[0] ? { strokes: stringFromRow(result.rows[0].strokes) } : null;
}

export async function updateGurumiScore({
  id,
  name,
  score,
}: {
  id: string;
  name: string;
  score: number;
}) {
  await ensureSchema();
  const result = await getClient().execute({
    sql: `UPDATE ${TABLE_NAME}
      SET name = ?, score = ?
      WHERE id = ?`,
    args: [name, score, id],
  });
  if (result.rowsAffected === 0) return null;
  return findGurumiScore(id);
}

export async function deleteGurumiScore(id: string) {
  await ensureSchema();
  const result = await getClient().execute({
    sql: `DELETE FROM ${TABLE_NAME} WHERE id = ?`,
    args: [id],
  });
  return result.rowsAffected > 0;
}

export async function saveGurumiScore({
  record,
  scoreDetails,
  strokes,
  pointCount,
}: {
  record: ScoreRecord;
  scoreDetails: SimilarityScore;
  strokes: string;
  pointCount: number;
}) {
  await ensureSchema();
  await getClient().execute({
    sql: `INSERT OR IGNORE INTO ${TABLE_NAME} (
      id, name, score, calibrated, raw, semantic, global_score,
      density_ratio, overdraw_efficiency, orientation_entropy, loop_monotony,
      part_scores, score_details, strokes, point_count, created_at, score_version
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      record.id,
      record.name,
      record.score,
      record.calibrated,
      record.raw,
      record.semantic,
      record.global,
      record.densityRatio,
      record.overdrawEfficiency,
      record.orientationEntropy,
      record.loopMonotony,
      JSON.stringify(record.partScores),
      JSON.stringify(scoreDetails),
      strokes,
      pointCount,
      record.createdAt,
      record.scoreVersion,
    ],
  });

  const storedRecord = await findGurumiScore(record.id);
  if (!storedRecord) throw new Error("Saved Gurumi score could not be loaded.");
  return storedRecord;
}
