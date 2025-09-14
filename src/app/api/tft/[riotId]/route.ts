// src/app/api/tft/[riotId]/route.ts
import { NextResponse } from "next/server";
import {
  normalizeRiotId,
  getAccountByRiotId,
  getSummonerByPuuid,
  getLeagueByPuuid,
  getLeagueBySummonerId,
  readBody,
} from "@/lib/riot";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ riotId: string }> };

interface RiotAPIError extends Error {
  status?: number;
  details?: any;
  response?: Response;
}

export async function GET(_req: Request, ctx: Ctx) {
  if (!process.env.RIOT_API_KEY) {
    return NextResponse.json({ error: "Missing RIOT_API_KEY" }, { status: 500 });
  }

  try {
    const { riotId } = await ctx.params;
    const { gameName, tagLine } = normalizeRiotId(riotId ?? "");

    if (!gameName || !tagLine) {
      return NextResponse.json(
        { error: 'Use Riot ID format "name#tagLine" (e.g., name#EUNE)' },
        { status: 400 }
      );
    }

    const acc = await getAccountByRiotId(gameName, tagLine);
    const puuid = acc.puuid;
    const summoner = await getSummonerByPuuid(puuid);

    let league: unknown[] = [];
    let leagueEndpoint: "by-puuid" | "entries-by-summoner" = "by-puuid";

    try {
      league = await getLeagueByPuuid(puuid);
    } catch {
      leagueEndpoint = "entries-by-summoner";
      const encId = summoner?.id;
      league = encId ? await getLeagueBySummonerId(encId) : [];
    }

    return NextResponse.json({
      region: "EUNE",
      riotId: `${acc.gameName ?? gameName}#${acc.tagLine ?? tagLine}`,
      puuid,
      summoner,
      league,
      leagueEndpoint,
    });
  } catch (err) {
    const error = err as RiotAPIError;

    const status = error.status ?? 500;
    const details = error.response ? await readBody(error.response) : error.details ?? null;

    return NextResponse.json(
      {
        error: error.message ?? "Server error",
        status,
        details,
      },
      { status }
    );
  }
}
