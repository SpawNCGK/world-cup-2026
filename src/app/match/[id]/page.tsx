"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import OddsDisplay from "@/components/odds/OddsDisplay";

interface MatchStats {
  team: { name: string; logo: string };
  statistics: Array<{ type: string; value: string | number }>;
}

interface MatchEvent {
  time: { elapsed: number };
  team: { name: string };
  player: { name: string };
  type: string;
  detail: string;
}

const StatBar = ({ label, home, away }: { label: string; home: number; away: number }) => {
  const total = home + away || 1;
  const homePct = Math.round((home / total) * 100);
  const awayPct = 100 - homePct;
  return (
    <div className="mb-4">
      <div className="flex justify-between text-xs text-white/60 mb-1">
        <span className="font-bold text-white">{home}</span>
        <span className="text-white/40 text-[10px] uppercase tracking-wider">{label}</span>
        <span className="font-bold text-white">{away}</span>
      </div>
      <div className="flex h-1.5 rounded-full overflow-hidden gap-0.5">
        <div className="rounded-full transition-all" style={{ width: `${homePct}%`, background: "#22c55e" }} />
        <div className="rounded-full transition-all" style={{ width: `${awayPct}%`, background: "#3b82f6" }} />
      </div>
    </div>
  );
};

export default function MatchPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<"stats" | "events" | "players">("stats");

  // Mock data para desenvolvimento (antes da Copa começar)
 const mockMatch: {
  home: { name: string; flag: string; score: number };
  away: { name: string; flag: string; score: number };
  minute: number;
  status: "upcoming" | "live" | "halftime" | "finished";
  date: string;
  time: string;
  venue: string;
  city: string;
} = {
  home: { name: "Brasil", flag: "https://flagcdn.com/br.svg", score: 2 },
  away: { name: "Marrocos", flag: "https://flagcdn.com/ma.svg", score: 1 },
  minute: 67,
  status: "live",
    date: "13/06/2026",
    time: "19:00 BRT",
    venue: "MetLife Stadium",
    city: "Nova Jersey",
  };

  const mockStats = [
    { label: "Posse de Bola (%)", home: 58, away: 42 },
    { label: "Chutes", home: 12, away: 7 },
    { label: "Chutes no Gol", home: 5, away: 3 },
    { label: "Escanteios", home: 6, away: 3 },
    { label: "Faltas", home: 8, away: 11 },
    { label: "Cartões Amarelos", home: 1, away: 2 },
    { label: "Impedimentos", home: 2, away: 1 },
    { label: "Passes", home: 423, away: 318 },
  ];

  const mockEvents = [
    { minute: 23, team: "Brasil", player: "Vinicius Jr.", type: "goal", detail: "Gol normal" },
    { minute: 41, team: "Marrocos", player: "Hakimi", type: "yellow", detail: "Falta" },
    { minute: 55, team: "Brasil", player: "Rodrygo", type: "goal", detail: "Gol normal" },
    { minute: 62, team: "Marrocos", player: "En-Nesyri", type: "goal", detail: "Gol normal" },
  ];

  const mockPlayers = {
    home: [
      { name: "Alisson", position: "G", saves: 3, rating: 7.8 },
      { name: "Vinicius Jr.", position: "F", goals: 1, assists: 1, dribblesCompleted: 4, rating: 8.9 },
      { name: "Rodrygo", position: "F", goals: 1, assists: 0, dribblesCompleted: 2, rating: 8.2 },
      { name: "Casemiro", position: "M", goals: 0, assists: 0, dribblesCompleted: 1, rating: 7.1 },
    ],
    away: [
      { name: "Bono", position: "G", saves: 4, rating: 8.1 },
      { name: "En-Nesyri", position: "F", goals: 1, assists: 0, dribblesCompleted: 1, rating: 7.5 },
      { name: "Hakimi", position: "D", goals: 0, assists: 0, dribblesCompleted: 2, rating: 6.8 },
      { name: "Amrabat", position: "M", goals: 0, assists: 0, dribblesCompleted: 0, rating: 7.0 },
    ],
  };

  return (
    <main className="min-h-screen text-white" style={{ background: "#0d1117" }}>

      {/* Header do jogo */}
      <div className="relative overflow-hidden" style={{ background: "linear-gradient(160deg,#003d0f,#006400,#004d1a)" }}>
        <div className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: "radial-gradient(circle,#fff 1px,transparent 1px)", backgroundSize: "28px 28px" }} />

        {/* Voltar */}
        <div className="relative z-10 px-4 pt-4">
          <a href="/" className="inline-flex items-center gap-2 text-white/50 text-sm hover:text-white transition">
            ← Voltar
          </a>
        </div>

        {/* Placar */}
        <div className="relative z-10 px-4 pb-8 pt-4">
          <div className="flex items-center justify-between max-w-lg mx-auto">

            {/* Time da casa */}
            <div className="flex flex-col items-center gap-3 flex-1">
              <img src={mockMatch.home.flag} alt={mockMatch.home.name}
                className="w-16 h-11 object-cover rounded-lg shadow-xl" />
              <span className="font-black text-white text-lg text-center">{mockMatch.home.name}</span>
            </div>

            {/* Placar central */}
            <div className="flex flex-col items-center gap-2 px-4">
              {mockMatch.status === "live" && (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider"
                  style={{ background: "#ef4444" }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                  ANTES DO JOGO
                </div>
              )}
              <div className="flex items-center gap-4">
                <span className="text-6xl font-black text-white">{mockMatch.home.score}</span>
                <span className="text-3xl text-white/30 font-light">–</span>
                <span className="text-6xl font-black text-white">{mockMatch.away.score}</span>
              </div>
              <div className="text-white/40 text-xs text-center">
                {mockMatch.venue} · {mockMatch.city}
              </div>
              {/* Link Cazé TV */}
              <a href="https://www.youtube.com/@CazeTVOficial" target="_blank" rel="noopener noreferrer"
                className="mt-2 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition hover:scale-105"
                style={{ background: "#ffdf00", color: "#004d1a" }}>
                📺 Assistir na Cazé TV
              </a>
            </div>

            {/* Time visitante */}
            <div className="flex flex-col items-center gap-3 flex-1">
              <img src={mockMatch.away.flag} alt={mockMatch.away.name}
                className="w-16 h-11 object-cover rounded-lg shadow-xl" />
              <span className="font-black text-white text-lg text-center">{mockMatch.away.name}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-0 z-20 border-b border-white/10"
        style={{ background: "#161b22" }}>
        <div className="max-w-lg mx-auto flex">
          {[
            { id: "stats", label: "Estatísticas" },
            { id: "events", label: "Eventos" },
            { id: "players", label: "Jogadores" },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-4 text-sm font-bold tracking-wide transition border-b-2 ${
                activeTab === tab.id
                  ? "border-[#ffdf00] text-[#ffdf00]"
                  : "border-transparent text-white/40 hover:text-white/70"
              }`}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Odds — aparece só antes do jogo */}
        {mockMatch.status === "upcoming" && (
          <div className="mb-6">
            <OddsDisplay
              homeTeam={mockMatch.home.name}
              awayTeam={mockMatch.away.name}
              homeFla={mockMatch.home.flag}
              awayFla={mockMatch.away.flag}
            />
          </div>
)}
        {/* ESTATÍSTICAS */}
        {activeTab === "stats" && (
          <div className="rounded-2xl p-5" style={{ background: "#161b22", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="flex justify-between text-xs font-bold mb-5">
              <span className="text-green-400">{mockMatch.home.name}</span>
              <span className="text-blue-400">{mockMatch.away.name}</span>
            </div>
            {mockStats.map(stat => (
              <StatBar key={stat.label} label={stat.label} home={stat.home} away={stat.away} />
            ))}
          </div>
        )}

        {/* EVENTOS */}
        {activeTab === "events" && (
          <div className="flex flex-col gap-3">
            {mockEvents.map((event, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl"
                style={{ background: "#161b22", border: "1px solid rgba(255,255,255,0.08)" }}>
                <span className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black flex-shrink-0"
                  style={{ background: "#0d1117" }}>
                  {event.minute}'
                </span>
                <span className="text-xl">
                  {event.type === "goal" ? "⚽" : event.type === "yellow" ? "🟨" : event.type === "red" ? "🟥" : "🔄"}
                </span>
                <div className="flex-1">
                  <p className="font-bold text-white text-sm">{event.player}</p>
                  <p className="text-white/40 text-xs">{event.team} · {event.detail}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* JOGADORES */}
        {activeTab === "players" && (
          <div className="flex flex-col gap-4">
            {[
              { label: mockMatch.home.name, color: "#22c55e", players: mockPlayers.home },
              { label: mockMatch.away.name, color: "#3b82f6", players: mockPlayers.away },
            ].map(team => (
              <div key={team.label} className="rounded-2xl overflow-hidden"
                style={{ background: "#161b22", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="px-4 py-3 font-black text-sm" style={{ color: team.color, background: "#0d1117" }}>
                  {team.label}
                </div>
                <table className="w-full text-xs">
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                      <th className="text-left px-4 py-2 text-white/30 font-medium">Jogador</th>
                      <th className="text-center px-2 py-2 text-white/30 font-medium">Pos</th>
                      <th className="text-center px-2 py-2 text-white/30 font-medium">⚽</th>
                      <th className="text-center px-2 py-2 text-white/30 font-medium">🅰️</th>
                      <th className="text-center px-2 py-2 text-white/30 font-medium">Dribles/Defesas</th>
                      <th className="text-center px-2 py-2 text-white/30 font-medium">Nota</th>
                    </tr>
                  </thead>
                  <tbody>
                    {team.players.map((player, i) => (
                      <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                        className="hover:bg-white/5 transition">
                        <td className="px-4 py-3 font-semibold text-white">{player.name}</td>
                        <td className="text-center px-2 py-3 text-white/40">{player.position}</td>
                        <td className="text-center px-2 py-3 text-white/60">{player.position === "G" ? "-" : player.goals ?? 0}</td>
                        <td className="text-center px-2 py-3 text-white/60">{player.position === "G" ? "-" : player.assists ?? 0}</td>
                        <td className="text-center px-2 py-3 text-white/60">
                          {player.position === "G" ? `${player.saves} defesas` : `${player.dribblesCompleted} dribles`}
                        </td>
                        <td className="text-center px-2 py-3">
                          <span className="px-2 py-0.5 rounded font-black text-xs"
                            style={{
                              background: player.rating >= 8 ? "#22c55e20" : player.rating >= 7 ? "#f59e0b20" : "#ef444420",
                              color: player.rating >= 8 ? "#22c55e" : player.rating >= 7 ? "#f59e0b" : "#ef4444"
                            }}>
                            {player.rating}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        )}
      </div>

      <footer className="text-center py-6 text-white/15 text-xs tracking-wider uppercase mt-4"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        Todos os horários no fuso de Brasília (BRT) · Copa do Mundo FIFA 2026
      </footer>
    </main>
  );
}