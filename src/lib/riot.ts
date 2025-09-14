// src/lib/riot.ts
/* Riot helpers for Account + TFT (EUNE shard).
   Endpoints:
   - /riot/account/v1/accounts/by-riot-id/{gameName}/{tagLine} → AccountDto { puuid, gameName, tagLine }
   - /tft/summoner/v1/summoners/by-puuid/{encryptedPUUID}      → SummonerDTO
   - /tft/league/v1/by-puuid/{puuid}                           → Set[LeagueEntryDTO]
   - /tft/league/v1/entries/by-summoner/{encryptedSummonerId}  → Set[LeagueEntryDTO]
   Reference: Riot API detailed endpoints PDF :contentReference[oaicite:1]{index=1}
*/

export type LeagueEntry = {
  queueType?: string;
  tier?: string;
  rank?: string;
  leaguePoints?: number;
  wins?: number;
  losses?: number;
};

export type Summoner = {
  id?: string; // encryptedSummonerId
  puuid?: string;
  name?: string;
  profileIconId?: number;
  summonerLevel?: number;
};

export type Account = {
  puuid: string;
  gameName?: string;
  tagLine?: string;
};

const RIOT_API_KEY = process.env.RIOT_API_KEY;
const REGION = "europe.api.riotgames.com"; // Account (EU regional cluster)
const PLATFORM = "eun1.api.riotgames.com"; // EUNE platform cluster for TFT
const HDRS: HeadersInit = { "X-Riot-Token": RIOT_API_KEY ?? "" };

export function normalizeRiotId(input: string) {
  const raw = decodeURIComponent(String(input || "")).trim();
  const i = raw.indexOf("#");
  if (i === -1) return { gameName: raw, tagLine: "" };
  const gameName = raw.slice(0, i).trim();
  const tagLine = raw.slice(i + 1).trim().toUpperCase();
  return { gameName, tagLine };
}

export function isLikelyPuuid(s: string) {
  return typeof s === "string" && s.length >= 70 && s.length <= 120;
}

export async function readBody(res: Response) {
  const text = await res.text();
  try { return JSON.parse(text); } catch { return text; }
}

/** RiotID -> Account (PUUID + canonical names) */
export async function getAccountByRiotId(gameName: string, tagLine: string): Promise<Account> {
  if (!RIOT_API_KEY) {
    throw Object.assign(new Error("Missing RIOT_API_KEY"), { status: 500 });
  }
  const url = `https://${REGION}/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`;
  const r = await fetch(url, { headers: HDRS, cache: "no-store" });
  if (!r.ok) {
    const details = await readBody(r);
    throw Object.assign(new Error("Account lookup failed"), { status: r.status, details });
  }
  return r.json();
}

/** PUUID -> TFT Summoner (EUNE) */
export async function getSummonerByPuuid(puuid: string): Promise<Summoner> {
  const url = `https://${PLATFORM}/tft/summoner/v1/summoners/by-puuid/${encodeURIComponent(puuid)}`;
  const r = await fetch(url, { headers: HDRS, cache: "no-store" });
  if (!r.ok) {
    const details = await readBody(r);
    throw Object.assign(new Error("Summoner not found by PUUID on EUNE"), { status: r.status, details });
  }
  return r.json();
}

/** Preferred: TFT league by PUUID (if supported) */
export async function getLeagueByPuuid(puuid: string): Promise<LeagueEntry[]> {
  const url = `https://${PLATFORM}/tft/league/v1/by-puuid/${encodeURIComponent(puuid)}`;
  const r = await fetch(url, { headers: HDRS, cache: "no-store" });
  if (r.ok) return r.json();
  const details = await readBody(r);
  throw Object.assign(new Error("League-by-puuid unavailable"), { status: r.status, details });
}

/** Fallback: by encryptedSummonerId */
export async function getLeagueBySummonerId(encId: string): Promise<LeagueEntry[]> {
  const url = `https://${PLATFORM}/tft/league/v1/entries/by-summoner/${encodeURIComponent(encId)}`;
  const r = await fetch(url, { headers: HDRS, cache: "no-store" });
  if (r.status === 404 || r.status === 204) return [];
  if (!r.ok) {
    const details = await readBody(r);
    throw Object.assign(new Error("Failed to fetch league by enc. summoner id"), { status: r.status, details });
  }
  return r.json();
}
