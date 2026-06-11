const BASE_URL = "/api";

export interface WCGame {
  id: string;
  home_team_name_en: string;
  away_team_name_en: string;
  home_score: string;
  away_score: string;
  group: string;
  matchday: string;
  local_date: string;
  finished: string;
  time_elapsed: string;
  type: string;
  home_team_label?: string;
  away_team_label?: string;
  stadium_id: string;
}

export async function getAllGames(): Promise<WCGame[]> {
  const res = await fetch(`${BASE_URL}/games`);
  const data = await res.json();
  return data.games || [];
}

export async function getGameById(id: string): Promise<WCGame | null> {
  const all = await getAllGames();
  return all.find(g => g.id === id) || null;
}

export async function getLiveGames(): Promise<WCGame[]> {
  const all = await getAllGames();
  return all.filter(g => g.time_elapsed !== "notstarted" && g.finished === "FALSE");
}

export async function getStandings() {
  const res = await fetch(`${BASE_URL}/groups`);
  return res.json();
}export const teamNameMap: Record<string, string> = {
  "Brazil": "Brasil",
  "Morocco": "Marrocos",
  "Mexico": "México",
  "South Africa": "África do Sul",
  "South Korea": "Coreia do Sul",
  "Czech Republic": "Rep. Tcheca",
  "Canada": "Canadá",
  "Bosnia and Herzegovina": "Bósnia-Herz.",
  "Qatar": "Catar",
  "Switzerland": "Suíça",
  "United States": "EUA",
  "Australia": "Austrália",
  "Turkey": "Turquia",
  "Paraguay": "Paraguai",
  "Germany": "Alemanha",
  "Ivory Coast": "Costa do Marfim",
  "Ecuador": "Equador",
  "Netherlands": "Holanda",
  "Japan": "Japão",
  "Sweden": "Suécia",
  "Tunisia": "Tunísia",
  "Belgium": "Bélgica",
  "Egypt": "Egito",
  "Iran": "Irã",
  "New Zealand": "Nova Zelândia",
  "Spain": "Espanha",
  "Saudi Arabia": "Arábia Saudita",
  "Uruguay": "Uruguai",
  "Cape Verde": "Cabo Verde",
  "France": "França",
  "Senegal": "Senegal",
  "Iraq": "Iraque",
  "Norway": "Noruega",
  "Argentina": "Argentina",
  "Algeria": "Argélia",
  "Austria": "Áustria",
  "Jordan": "Jordânia",
  "Portugal": "Portugal",
  "Colombia": "Colômbia",
  "Democratic Republic of the Congo": "Rep. D. Congo",
  "Uzbekistan": "Uzbequistão",
  "England": "Inglaterra",
  "Panama": "Panamá",
  "Croatia": "Croácia",
  "Ghana": "Gana",
  "Scotland": "Escócia",
  "Haiti": "Haiti",
  "Curaçao": "Curaçao",
};

export const translateTeam = (name: string): string => teamNameMap[name] || name;