const API_KEY = process.env.NEXT_PUBLIC_API_FOOTBALL_KEY;
const BASE_URL = "https://v3.football.api-sports.io";

const headers = {
  "x-apisports-key": API_KEY || "",
};

// ID da Copa do Mundo 2026 na API (vamos buscar dinamicamente)
export const WORLD_CUP_2026_ID = 1; // atualizar após a Copa começar

export async function getLiveMatches() {
  const res = await fetch(`${BASE_URL}/fixtures?live=all&league=${WORLD_CUP_2026_ID}`, {
    headers,
    next: { revalidate: 30 }, // atualiza a cada 30s
  });
  const data = await res.json();
  return data.response || [];
}

export async function getMatchById(fixtureId: string) {
  const res = await fetch(`${BASE_URL}/fixtures?id=${fixtureId}`, {
    headers,
    next: { revalidate: 30 },
  });
  const data = await res.json();
  return data.response?.[0] || null;
}

export async function getMatchStatistics(fixtureId: string) {
  const res = await fetch(`${BASE_URL}/fixtures/statistics?fixture=${fixtureId}`, {
    headers,
    next: { revalidate: 30 },
  });
  const data = await res.json();
  return data.response || [];
}

export async function getMatchEvents(fixtureId: string) {
  const res = await fetch(`${BASE_URL}/fixtures/events?fixture=${fixtureId}`, {
    headers,
    next: { revalidate: 30 },
  });
  const data = await res.json();
  return data.response || [];
}

export async function getPlayerStats(fixtureId: string) {
  const res = await fetch(`${BASE_URL}/fixtures/players?fixture=${fixtureId}`, {
    headers,
    next: { revalidate: 30 },
  });
  const data = await res.json();
  return data.response || [];
}

export async function getFixturesByLeague(leagueId: number, season: number) {
  const res = await fetch(`${BASE_URL}/fixtures?league=${leagueId}&season=${season}`, {
    headers,
    next: { revalidate: 3600 },
  });
  const data = await res.json();
  return data.response || [];
}