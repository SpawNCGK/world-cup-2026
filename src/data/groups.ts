export interface Team {
  name: string;
  code: string;
  flag: string;
  group: string;
}

export interface Match {
  id: number;
  group: string;
  home: string;
  away: string;
  date: string;
  time: string; // Horário de Brasília
  venue: string;
  city: string;
  homeScore?: number;
  awayScore?: number;
  status: "upcoming" | "live" | "finished";
}

export interface GroupStanding {
  team: string;
  code: string;
  flag: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gf: number;
  ga: number;
  gd: number;
  points: number;
}

export const teams: Team[] = [
  // Grupo A
  { name: "México",          code: "MEX", flag: "https://flagcdn.com/mx.svg",     group: "A" },
  { name: "África do Sul",   code: "RSA", flag: "https://flagcdn.com/za.svg",     group: "A" },
  { name: "Coreia do Sul",   code: "KOR", flag: "https://flagcdn.com/kr.svg",     group: "A" },
  { name: "Rep. Tcheca",     code: "CZE", flag: "https://flagcdn.com/cz.svg",     group: "A" },
  // Grupo B
  { name: "Canadá",          code: "CAN", flag: "https://flagcdn.com/ca.svg",     group: "B" },
  { name: "Bósnia-Herz.",    code: "BIH", flag: "https://flagcdn.com/ba.svg",     group: "B" },
  { name: "Catar",           code: "QAT", flag: "https://flagcdn.com/qa.svg",     group: "B" },
  { name: "Suíça",           code: "SUI", flag: "https://flagcdn.com/ch.svg",     group: "B" },
  // Grupo C
  { name: "Brasil",          code: "BRA", flag: "https://flagcdn.com/br.svg",     group: "C" },
  { name: "Marrocos",        code: "MAR", flag: "https://flagcdn.com/ma.svg",     group: "C" },
  { name: "Escócia",         code: "SCO", flag: "https://flagcdn.com/gb-sct.svg", group: "C" },
  { name: "Haiti",           code: "HAI", flag: "https://flagcdn.com/ht.svg",     group: "C" },
  // Grupo D
  { name: "EUA",             code: "USA", flag: "https://flagcdn.com/us.svg",     group: "D" },
  { name: "Austrália",       code: "AUS", flag: "https://flagcdn.com/au.svg",     group: "D" },
  { name: "Turquia",         code: "TUR", flag: "https://flagcdn.com/tr.svg",     group: "D" },
  { name: "Paraguai",        code: "PAR", flag: "https://flagcdn.com/py.svg",     group: "D" },
  // Grupo E
  { name: "Alemanha",        code: "GER", flag: "https://flagcdn.com/de.svg",     group: "E" },
  { name: "Costa do Marfim", code: "CIV", flag: "https://flagcdn.com/ci.svg",     group: "E" },
  { name: "Equador",         code: "ECU", flag: "https://flagcdn.com/ec.svg",     group: "E" },
  { name: "Curaçao",         code: "CUW", flag: "https://flagcdn.com/cw.svg",     group: "E" },
  // Grupo F
  { name: "Holanda",         code: "NED", flag: "https://flagcdn.com/nl.svg",     group: "F" },
  { name: "Japão",           code: "JPN", flag: "https://flagcdn.com/jp.svg",     group: "F" },
  { name: "Suécia",          code: "SWE", flag: "https://flagcdn.com/se.svg",     group: "F" },
  { name: "Tunísia",         code: "TUN", flag: "https://flagcdn.com/tn.svg",     group: "F" },
  // Grupo G
  { name: "Bélgica",         code: "BEL", flag: "https://flagcdn.com/be.svg",     group: "G" },
  { name: "Egito",           code: "EGY", flag: "https://flagcdn.com/eg.svg",     group: "G" },
  { name: "Irã",             code: "IRN", flag: "https://flagcdn.com/ir.svg",     group: "G" },
  { name: "Nova Zelândia",   code: "NZL", flag: "https://flagcdn.com/nz.svg",     group: "G" },
  // Grupo H
  { name: "Espanha",         code: "ESP", flag: "https://flagcdn.com/es.svg",     group: "H" },
  { name: "Arábia Saudita",  code: "KSA", flag: "https://flagcdn.com/sa.svg",     group: "H" },
  { name: "Uruguai",         code: "URU", flag: "https://flagcdn.com/uy.svg",     group: "H" },
  { name: "Cabo Verde",      code: "CPV", flag: "https://flagcdn.com/cv.svg",     group: "H" },
  // Grupo I
  { name: "França",          code: "FRA", flag: "https://flagcdn.com/fr.svg",     group: "I" },
  { name: "Senegal",         code: "SEN", flag: "https://flagcdn.com/sn.svg",     group: "I" },
  { name: "Iraque",          code: "IRQ", flag: "https://flagcdn.com/iq.svg",     group: "I" },
  { name: "Noruega",         code: "NOR", flag: "https://flagcdn.com/no.svg",     group: "I" },
  // Grupo J
  { name: "Argentina",       code: "ARG", flag: "https://flagcdn.com/ar.svg",     group: "J" },
  { name: "Argélia",         code: "ALG", flag: "https://flagcdn.com/dz.svg",     group: "J" },
  { name: "Áustria",         code: "AUT", flag: "https://flagcdn.com/at.svg",     group: "J" },
  { name: "Jordânia",        code: "JOR", flag: "https://flagcdn.com/jo.svg",     group: "J" },
  // Grupo K
  { name: "Portugal",        code: "POR", flag: "https://flagcdn.com/pt.svg",     group: "K" },
  { name: "Colômbia",        code: "COL", flag: "https://flagcdn.com/co.svg",     group: "K" },
  { name: "Rep. D. Congo",   code: "COD", flag: "https://flagcdn.com/cd.svg",     group: "K" },
  { name: "Uzbequistão",     code: "UZB", flag: "https://flagcdn.com/uz.svg",     group: "K" },
  // Grupo L
  { name: "Inglaterra",      code: "ENG", flag: "https://flagcdn.com/gb-eng.svg", group: "L" },
  { name: "Panamá",          code: "PAN", flag: "https://flagcdn.com/pa.svg",     group: "L" },
  { name: "Croácia",         code: "CRO", flag: "https://flagcdn.com/hr.svg",     group: "L" },
  { name: "Gana",            code: "GHA", flag: "https://flagcdn.com/gh.svg",     group: "L" },
];

export const groups = ["A","B","C","D","E","F","G","H","I","J","K","L"];

export const getTeamsByGroup = (group: string): Team[] =>
  teams.filter((t) => t.group === group);

export const initialStandings = (group: string): GroupStanding[] =>
  getTeamsByGroup(group).map((t) => ({
    team: t.name, code: t.code, flag: t.flag,
    played: 0, won: 0, drawn: 0, lost: 0,
    gf: 0, ga: 0, gd: 0, points: 0,
  }));

export const allMatches: Match[] = [
  // ── RODADA 1 ──────────────────────────────────────────────────────────────
  { id: 1,  group:"A", home:"México",          away:"África do Sul",  date:"2026-06-11", time:"16:00", venue:"Estádio Azteca",       city:"Cidade do México", status:"upcoming" },
  { id: 2,  group:"B", home:"Canadá",          away:"Bósnia-Herz.",   date:"2026-06-12", time:"16:00", venue:"BMO Field",             city:"Toronto",          status:"upcoming" },
  { id: 3,  group:"D", home:"EUA",             away:"Paraguai",       date:"2026-06-12", time:"22:00", venue:"SoFi Stadium",          city:"Los Angeles",      status:"upcoming" },
  { id: 4,  group:"C", home:"Brasil",          away:"Marrocos",       date:"2026-06-13", time:"19:00", venue:"MetLife Stadium",       city:"Nova Jersey",      status:"upcoming" },
  { id: 5,  group:"A", home:"Coreia do Sul",   away:"Rep. Tcheca",    date:"2026-06-13", time:"23:00", venue:"Estadio Akron",         city:"Guadalajara",      status:"upcoming" },
  { id: 6,  group:"B", home:"Suíça",           away:"Catar",          date:"2026-06-14", time:"16:00", venue:"BC Place",              city:"Vancouver",        status:"upcoming" },
  { id: 7,  group:"E", home:"Alemanha",        away:"Curaçao",        date:"2026-06-14", time:"14:00", venue:"NRG Stadium",           city:"Houston",          status:"upcoming" },
  { id: 8,  group:"F", home:"Holanda",         away:"Japão",          date:"2026-06-14", time:"17:00", venue:"AT&T Stadium",          city:"Dallas",           status:"upcoming" },
  { id: 9,  group:"E", home:"Costa do Marfim", away:"Equador",        date:"2026-06-15", time:"20:00", venue:"Lincoln Financial",     city:"Filadélfia",       status:"upcoming" },
  { id: 10, group:"F", home:"Suécia",          away:"Tunísia",        date:"2026-06-15", time:"23:00", venue:"Estadio BBVA",          city:"Monterrey",        status:"upcoming" },
  { id: 11, group:"H", home:"Espanha",         away:"Cabo Verde",     date:"2026-06-15", time:"13:00", venue:"Mercedes-Benz Stadium", city:"Atlanta",          status:"upcoming" },
  { id: 12, group:"D", home:"Turquia",         away:"Austrália",      date:"2026-06-15", time:"23:00", venue:"Levi's Stadium",        city:"San Francisco",    status:"upcoming" },
  { id: 13, group:"G", home:"Bélgica",         away:"Egito",          date:"2026-06-16", time:"16:00", venue:"Lumen Field",           city:"Seattle",          status:"upcoming" },
  { id: 14, group:"H", home:"Arábia Saudita",  away:"Uruguai",        date:"2026-06-16", time:"19:00", venue:"Hard Rock Stadium",     city:"Miami",            status:"upcoming" },
  { id: 15, group:"G", home:"Irã",             away:"Nova Zelândia",  date:"2026-06-16", time:"22:00", venue:"SoFi Stadium",          city:"Los Angeles",      status:"upcoming" },
  { id: 16, group:"C", home:"Escócia",         away:"Haiti",          date:"2026-06-17", time:"01:00", venue:"Levi's Stadium",        city:"San Francisco",    status:"upcoming" },
  { id: 17, group:"I", home:"França",          away:"Senegal",        date:"2026-06-17", time:"16:00", venue:"MetLife Stadium",       city:"Nova Jersey",      status:"upcoming" },
  { id: 18, group:"I", home:"Iraque",          away:"Noruega",        date:"2026-06-17", time:"19:00", venue:"Gillette Stadium",      city:"Boston",           status:"upcoming" },
  { id: 19, group:"J", home:"Argentina",       away:"Argélia",        date:"2026-06-17", time:"22:00", venue:"Arrowhead Stadium",     city:"Kansas City",      status:"upcoming" },
  { id: 20, group:"J", home:"Áustria",         away:"Jordânia",       date:"2026-06-18", time:"01:00", venue:"Levi's Stadium",        city:"San Francisco",    status:"upcoming" },
  { id: 21, group:"L", home:"Gana",            away:"Panamá",         date:"2026-06-18", time:"14:00", venue:"BMO Field",             city:"Toronto",          status:"upcoming" },
  { id: 22, group:"L", home:"Inglaterra",      away:"Croácia",        date:"2026-06-18", time:"17:00", venue:"AT&T Stadium",          city:"Dallas",           status:"upcoming" },
  { id: 23, group:"K", home:"Portugal",        away:"Rep. D. Congo",  date:"2026-06-18", time:"23:00", venue:"NRG Stadium",           city:"Houston",          status:"upcoming" },
  { id: 24, group:"K", home:"Uzbequistão",     away:"Colômbia",       date:"2026-06-19", time:"00:00", venue:"Estadio Azteca",        city:"Cidade do México", status:"upcoming" },
  // ── RODADA 2 ──────────────────────────────────────────────────────────────
  { id: 25, group:"C", home:"Brasil",          away:"Haiti",          date:"2026-06-19", time:"22:00", venue:"Lincoln Financial",     city:"Filadélfia",       status:"upcoming" },
  { id: 26, group:"C", home:"Escócia",         away:"Marrocos",       date:"2026-06-19", time:"19:00", venue:"Gillette Stadium",      city:"Boston",           status:"upcoming" },
  { id: 27, group:"A", home:"México",          away:"Coreia do Sul",  date:"2026-06-20", time:"22:00", venue:"Estadio Akron",         city:"Guadalajara",      status:"upcoming" },
  { id: 28, group:"A", home:"Rep. Tcheca",     away:"África do Sul",  date:"2026-06-20", time:"13:00", venue:"Mercedes-Benz Stadium", city:"Atlanta",          status:"upcoming" },
  { id: 29, group:"B", home:"Canadá",          away:"Catar",          date:"2026-06-20", time:"19:00", venue:"BC Place",              city:"Vancouver",        status:"upcoming" },
  { id: 30, group:"B", home:"Suíça",           away:"Bósnia-Herz.",   date:"2026-06-20", time:"16:00", venue:"SoFi Stadium",          city:"Los Angeles",      status:"upcoming" },
  { id: 31, group:"D", home:"EUA",             away:"Austrália",      date:"2026-06-21", time:"16:00", venue:"Lumen Field",           city:"Seattle",          status:"upcoming" },
  { id: 32, group:"D", home:"Turquia",         away:"Paraguai",       date:"2026-06-21", time:"01:00", venue:"Levi's Stadium",        city:"San Francisco",    status:"upcoming" },
  { id: 33, group:"E", home:"Alemanha",        away:"Costa do Marfim",date:"2026-06-21", time:"17:00", venue:"BMO Field",             city:"Toronto",          status:"upcoming" },
  { id: 34, group:"E", home:"Equador",         away:"Curaçao",        date:"2026-06-21", time:"21:00", venue:"Arrowhead Stadium",     city:"Kansas City",      status:"upcoming" },
  { id: 35, group:"F", home:"Holanda",         away:"Suécia",         date:"2026-06-22", time:"14:00", venue:"NRG Stadium",           city:"Houston",          status:"upcoming" },
  { id: 36, group:"F", home:"Tunísia",         away:"Japão",          date:"2026-06-22", time:"01:00", venue:"Estadio BBVA",          city:"Monterrey",        status:"upcoming" },
  { id: 37, group:"H", home:"Espanha",         away:"Arábia Saudita", date:"2026-06-22", time:"13:00", venue:"Mercedes-Benz Stadium", city:"Atlanta",          status:"upcoming" },
  { id: 38, group:"H", home:"Uruguai",         away:"Cabo Verde",     date:"2026-06-22", time:"19:00", venue:"Hard Rock Stadium",     city:"Miami",            status:"upcoming" },
  { id: 39, group:"G", home:"Bélgica",         away:"Irã",            date:"2026-06-23", time:"16:00", venue:"SoFi Stadium",          city:"Los Angeles",      status:"upcoming" },
  { id: 40, group:"G", home:"Nova Zelândia",   away:"Egito",          date:"2026-06-23", time:"22:00", venue:"BC Place",              city:"Vancouver",        status:"upcoming" },
  { id: 41, group:"I", home:"França",          away:"Iraque",         date:"2026-06-23", time:"17:00", venue:"MetLife Stadium",       city:"Nova Jersey",      status:"upcoming" },
  { id: 42, group:"I", home:"Senegal",         away:"Noruega",        date:"2026-06-23", time:"20:00", venue:"Gillette Stadium",      city:"Boston",           status:"upcoming" },
  { id: 43, group:"J", home:"Argentina",       away:"Áustria",        date:"2026-06-24", time:"22:00", venue:"AT&T Stadium",          city:"Dallas",           status:"upcoming" },
  { id: 44, group:"J", home:"Jordânia",        away:"Argélia",        date:"2026-06-24", time:"23:00", venue:"AT&T Stadium",          city:"Dallas",           status:"upcoming" },
  { id: 45, group:"K", home:"Portugal",        away:"Uzbequistão",    date:"2026-06-24", time:"20:30", venue:"Hard Rock Stadium",     city:"Miami",            status:"upcoming" },
  { id: 46, group:"K", home:"Colômbia",        away:"Rep. D. Congo",  date:"2026-06-24", time:"23:00", venue:"Estadio Azteca",        city:"Cidade do México", status:"upcoming" },
  { id: 47, group:"L", home:"Inglaterra",      away:"Panamá",         date:"2026-06-25", time:"18:00", venue:"MetLife Stadium",       city:"Nova Jersey",      status:"upcoming" },
  { id: 48, group:"L", home:"Croácia",         away:"Gana",           date:"2026-06-25", time:"18:00", venue:"Lincoln Financial",     city:"Filadélfia",       status:"upcoming" },
  // ── RODADA 3 (simultâneos por grupo) ─────────────────────────────────────
  { id: 49, group:"A", home:"México",          away:"Rep. Tcheca",    date:"2026-06-26", time:"22:00", venue:"Estadio Azteca",        city:"Cidade do México", status:"upcoming" },
  { id: 50, group:"A", home:"África do Sul",   away:"Coreia do Sul",  date:"2026-06-26", time:"22:00", venue:"Estadio BBVA",          city:"Monterrey",        status:"upcoming" },
  { id: 51, group:"B", home:"Canadá",          away:"Suíça",          date:"2026-06-26", time:"16:00", venue:"BC Place",              city:"Vancouver",        status:"upcoming" },
  { id: 52, group:"B", home:"Bósnia-Herz.",    away:"Catar",          date:"2026-06-26", time:"16:00", venue:"Lumen Field",           city:"Seattle",          status:"upcoming" },
  { id: 53, group:"C", home:"Brasil",          away:"Escócia",        date:"2026-06-27", time:"19:00", venue:"Hard Rock Stadium",     city:"Miami",            status:"upcoming" },
  { id: 54, group:"C", home:"Marrocos",        away:"Haiti",          date:"2026-06-27", time:"19:00", venue:"Mercedes-Benz Stadium", city:"Atlanta",          status:"upcoming" },
  { id: 55, group:"D", home:"EUA",             away:"Turquia",        date:"2026-06-27", time:"22:00", venue:"SoFi Stadium",          city:"Los Angeles",      status:"upcoming" },
  { id: 56, group:"D", home:"Austrália",       away:"Paraguai",       date:"2026-06-27", time:"22:00", venue:"Levi's Stadium",        city:"San Francisco",    status:"upcoming" },
  { id: 57, group:"E", home:"Alemanha",        away:"Equador",        date:"2026-06-28", time:"17:00", venue:"MetLife Stadium",       city:"Nova Jersey",      status:"upcoming" },
  { id: 58, group:"E", home:"Costa do Marfim", away:"Curaçao",        date:"2026-06-28", time:"17:00", venue:"NRG Stadium",           city:"Houston",          status:"upcoming" },
  { id: 59, group:"F", home:"Holanda",         away:"Tunísia",        date:"2026-06-28", time:"22:00", venue:"Arrowhead Stadium",     city:"Kansas City",      status:"upcoming" },
  { id: 60, group:"F", home:"Japão",           away:"Suécia",         date:"2026-06-28", time:"22:00", venue:"AT&T Stadium",          city:"Dallas",           status:"upcoming" },
  { id: 61, group:"G", home:"Bélgica",         away:"Nova Zelândia",  date:"2026-06-29", time:"00:00", venue:"BC Place",              city:"Vancouver",        status:"upcoming" },
  { id: 62, group:"G", home:"Egito",           away:"Irã",            date:"2026-06-29", time:"00:00", venue:"Lumen Field",           city:"Seattle",          status:"upcoming" },
  { id: 63, group:"H", home:"Espanha",         away:"Uruguai",        date:"2026-06-29", time:"17:00", venue:"Gillette Stadium",      city:"Boston",           status:"upcoming" },
  { id: 64, group:"H", home:"Arábia Saudita",  away:"Cabo Verde",     date:"2026-06-29", time:"17:00", venue:"Lincoln Financial",     city:"Filadélfia",       status:"upcoming" },
  { id: 65, group:"I", home:"França",          away:"Noruega",        date:"2026-06-30", time:"20:00", venue:"MetLife Stadium",       city:"Nova Jersey",      status:"upcoming" },
  { id: 66, group:"I", home:"Senegal",         away:"Iraque",         date:"2026-06-30", time:"20:00", venue:"Gillette Stadium",      city:"Boston",           status:"upcoming" },
  { id: 67, group:"J", home:"Argentina",       away:"Jordânia",       date:"2026-06-30", time:"23:00", venue:"AT&T Stadium",          city:"Dallas",           status:"upcoming" },
  { id: 68, group:"J", home:"Argélia",         away:"Áustria",        date:"2026-06-30", time:"23:00", venue:"Arrowhead Stadium",     city:"Kansas City",      status:"upcoming" },
  { id: 69, group:"K", home:"Portugal",        away:"Colômbia",       date:"2026-07-01", time:"20:30", venue:"Hard Rock Stadium",     city:"Miami",            status:"upcoming" },
  { id: 70, group:"K", home:"Rep. D. Congo",   away:"Uzbequistão",    date:"2026-07-01", time:"20:30", venue:"Mercedes-Benz Stadium", city:"Atlanta",          status:"upcoming" },
  { id: 71, group:"L", home:"Inglaterra",      away:"Gana",           date:"2026-07-01", time:"18:00", venue:"MetLife Stadium",       city:"Nova Jersey",      status:"upcoming" },
  { id: 72, group:"L", home:"Panamá",          away:"Croácia",        date:"2026-07-01", time:"18:00", venue:"Lincoln Financial",     city:"Filadélfia",       status:"upcoming" },
];

export const getMatchesByGroup = (group: string): Match[] =>
  allMatches.filter((m) => m.group === group);

export const getLiveMatches = (): Match[] =>
  allMatches.filter((m) => m.status === "live");

export const getUpcomingMatches = (limit = 5): Match[] =>
  allMatches.filter((m) => m.status === "upcoming").slice(0, limit);