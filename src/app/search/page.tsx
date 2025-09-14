// src/app/(site)/search/page.tsx
"use client";

import { useState } from "react";

type LeagueEntry = {
  queueType: string;
  tier: string;
  rank: string;
  leaguePoints: number;
  wins: number;
  losses: number;
};

type ApiOk = {
  region: string;
  riotId: string;
  puuid: string;
  summoner: {
    name?: string;
    profileIconId?: number;
    summonerLevel?: number;
    id?: string;
    puuid?: string;
  };
  league: LeagueEntry[];
  warning?: string;
  leagueEndpoint?: string;
};

type ApiErr = { error: string; status?: number; details?: unknown };

const normalizeRiotId = (v: string) => {
  const s = v.trim();
  const i = s.indexOf("#");
  if (i === -1) return s;
  const name = s.slice(0, i).trim();
  const tag = s.slice(i + 1).trim().toUpperCase();
  return `${name}#${tag}`;
};

export default function SearchPage() {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [debug, setDebug] = useState<string | null>(null);
  const [data, setData] = useState<ApiOk | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setDebug(null);
    setData(null);

    if (!value.includes("#")) {
      setErr('Use Riot ID format "name#tagLine" (e.g., name#EUNE)');
      return;
    }

    setLoading(true);
    try {
      const q = normalizeRiotId(value);
      const res = await fetch(`/api/tft/${encodeURIComponent(q)}`);
      const body = await res.json();

      if (!res.ok) {
        const b = body as ApiErr;
        setErr(b.error ?? "Lookup failed.");
        setDebug(
          [
            b.status ? `status=${b.status}` : null,
            b.details ? `details=${typeof b.details === "string" ? b.details : JSON.stringify(b.details)}` : null,
          ]
            .filter(Boolean)
            .join("\n")
        );
      } else {
        setData(body as ApiOk);
      }
    } catch {
      setErr("Network error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="p-6 max-w-2xl mx-auto">
      <h1 className="mb-2 text-3xl font-bold">🔎 Search TFT Player (EUNE)</h1>
      <p className="mb-6 text-slate-400">
        Enter Riot ID <code>name#tagLine</code> (e.g., <code>name#EUNE</code>). We’ll fetch PUUID → TFT profile → ranked.
      </p>

      <form onSubmit={submit} className="flex gap-3">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder='e.g., name#EUNE'
          className="flex-1 rounded-md border border-slate-600 bg-slate-900 px-4 py-3 text-white"
        />
        <button
          type="submit"
          disabled={loading || !value.trim()}
          className="rounded-md bg-blue-600 px-6 py-3 text-white hover:bg-blue-500 disabled:opacity-50"
        >
          {loading ? "Searching…" : "Search"}
        </button>
      </form>

      {err && (
        <div className="mt-4 rounded-md border border-red-500 bg-red-950/40 p-3 text-red-200">
          {err}
          {debug && (
            <pre className="mt-2 whitespace-pre-wrap text-xs text-red-300/90">{debug}</pre>
          )}
        </div>
      )}

      {data && (
        <div className="mt-6 rounded-lg border border-slate-700 bg-slate-800 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              {data.summoner.name ?? data.riotId} <span className="text-slate-400">({data.region})</span>
            </h2>
            <span className="text-xs rounded bg-slate-700 px-2 py-1 text-slate-200">
              PUUID: {data.puuid?.slice(0, 10) ?? "—"}…
            </span>
          </div>

          <p className="text-slate-300 mt-1">Level: {data.summoner.summonerLevel ?? "—"}</p>
          {data.warning && <p className="mt-2 text-amber-300 text-sm">{data.warning}</p>}
          {data.leagueEndpoint && (
            <p className="mt-1 text-xs text-slate-400">league source: {data.leagueEndpoint}</p>
          )}

          {Array.isArray(data.league) && data.league.length > 0 ? (
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {data.league.map((e) => (
                <div key={`${e.queueType}-${e.tier}-${e.rank}`} className="rounded-md border border-slate-700 bg-slate-900/40 p-3">
                  <div className="text-xs uppercase tracking-wide text-slate-400">
                    {(e.queueType || "TFT_RANKED").replace(/_/g, " ")}
                  </div>
                  <div className="font-medium">
                    {e.tier ?? "—"} {e.rank ?? ""} • {e.leaguePoints ?? 0} LP
                  </div>
                  <div className="text-slate-300">
                    {e.wins ?? 0}W / {e.losses ?? 0}L
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-slate-400">No ranked data found.</p>
          )}
        </div>
      )}
    </section>
  );
}
