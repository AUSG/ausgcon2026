import "server-only";

export function getGurumiDatabaseConfig(env: Record<string, string | undefined> = process.env) {
  // Pin the event database independently of Marketplace deployment branches.
  const pinned = Boolean(env.GURUMI_EVENT_DATABASE_URL || env.GURUMI_EVENT_AUTH_TOKEN);
  const urlKey = pinned ? "GURUMI_EVENT_DATABASE_URL" : "AUSGCON2026_TURSO_DATABASE_URL";
  const tokenKey = pinned ? "GURUMI_EVENT_AUTH_TOKEN" : "AUSGCON2026_TURSO_AUTH_TOKEN";
  const url = env[urlKey];
  const authToken = env[tokenKey];
  if (!url || !authToken) throw new Error(`Missing Gurumi database configuration: ${urlKey}, ${tokenKey}`);
  return { url, authToken };
}
