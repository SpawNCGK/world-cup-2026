"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { allMatches, teams } from "@/data/groups";
import OddsDisplay from "@/components/odds/OddsDisplay";

const ResultDot = ({ r }: { r: "W" | "D" | "L" | null }) => {
  const base = "w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black";
  if (r === "W") return <span className={`${base} bg-green-500 text-white`}>V</span>;
  if (r === "D") return <span className={`${base} bg-amber-400 text-white`}>E</span>;
  if (r === "L") return <span className={`${base} bg-red-500 text-white`}>D</span>;
  return <span className={`${base} bg-white/10 border border-white/20`} />;
};

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

  // Busca o jogo real pelo ID
  const match = allMatches.find(m => m.id === Number(id));

  // Se não encontrar o jogo
  if (!match) {
    return (
      <main className="min-h-screen text-white flex items-center justify-center" style={{ background: "#0d1117" }}>
        <div className="text-center">
          <p className="text-6xl mb-4">⚽</p>
          <p className="text-white/40 text-sm">Jogo não encontrado</p>
          <a href="/" className="mt-4 inline-block text-[#ffdf00] text-sm hover:underline">← Voltar</a>
        </div>
      </main>
    );
  }

  const homeTeam = teams.find(t => t.name === match.home);
  const awayTeam = teams.find(t => t.name === match.away);
  const homeFla = homeTeam?.flag || "";
  const awayFla = awayTeam?.flag || "";

  const mockStats = [
    { label: "Posse de Bola (%)", home: 0, away: 0 },
    { label: "Chutes", home: 0, away: 0 },
    { label: "Chutes no Gol", home: 0, away: 0 },
    { label: "Escanteios", home: 0, away: 0 },
    { label: "Faltas", home: 0, away: 0 },
    { label: "Cartões Amarelos", home: 0, away: 0 },
    { label: "Passes", home: 0, away: 0 },
  ];

  return (
    <main className="min-h-screen text-white" style={{ background: "#0d1117" }}>

      {/* Header do jogo */}
      <div className="relative overflow-hidden" style={{ background: "linear-gradient(160deg,#003d0f,#006400,#004d1a)" }}>
        <div className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: "radial-gradient(circle,#fff 1px,transparent 1px)", backgroundSize: "28px 28px" }} />

        <div className="relative z-10 px-4 pt-4">
          <a href="/" className="inline-flex items-center gap-2 text-white/50 text-sm hover:text-white transition">
            ← Voltar
          </a>
        </div>

        <div className="relative z-10 px-4 pb-8 pt-4">
          {/* Status */}
          <div className="flex justify-center mb-4">
            {match.status === "live" ? (
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase"
                style={{ background: "#ef4444" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                AO VIVO
              </div>
            ) : match.status === "finished" ? (
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase"
                style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)" }}>
                ENCERRADO
              </span>
            ) : (
              <div className="text-center">
                <span className="px-3 py-1 rounded-full text-xs font-black uppercase"
                  style={{ background: "rgba(255,223,0,0.15)", color: "#ffdf00" }}>
                  ANTES DO JOGO
                </span>
                <p className="text-white/40 text-xs mt-2">
                  {match.date.split("-").reverse().join("/")} · {match.time} BRT
                </p>
              </div>
            )}
          </div>

          {/* Placar */}
          <div className="flex items-center justify-between max-w-lg mx-auto">
            <div className="flex flex-col items-center gap-3 flex-1">
              <img src={homeFla} alt={match.home} className="w-16 h-11 object-cover rounded-lg shadow-xl" />
              <span className="font-black text-white text-lg text-center">{match.home}</span>
            </div>

            <div className="flex flex-col items-center gap-2 px-4">
              {match.status === "upcoming" ? (
                <span className="text-4xl font-black text-white/20">vs</span>
              ) : (
                <div className="flex items-center gap-4">
                  <span className="text-6xl font-black text-white">{match.homeScore ?? 0}</span>
                  <span className="text-3xl text-white/30 font-light">–</span>
                  <span className="text-6xl font-black text-white">{match.awayScore ?? 0}</span>
                </div>
              )}
              <div className="text-white/40 text-xs text-center mt-1">
                {match.venue} · {match.city}
              </div>
              <a href="https://www.youtube.com/@CazeTV" target="_blank" rel="noopener noreferrer"
                className="mt-2 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition hover:scale-105"
                style={{ background: "#ffdf00", color: "#004d1a" }}>
                📺 Assistir na Cazé TV
              </a>
            </div>

            <div className="flex flex-col items-center gap-3 flex-1">
              <img src={awayFla} alt={match.away} className="w-16 h-11 object-cover rounded-lg shadow-xl" />
              <span className="font-black text-white text-lg text-center">{match.away}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Odds — só antes do jogo */}
      {match.status === "upcoming" && (
        <div className="max-w-lg mx-auto px-4 pt-6">
          <OddsDisplay
            homeTeam={match.home}
            awayTeam={match.away}
            homeFla={homeFla}
            awayFla={awayFla}
          />
        </div>
      )}

      {/* Tabs — só durante/após o jogo */}
      {match.status !== "upcoming" && (
        <div className="sticky top-0 z-20 border-b border-white/10" style={{ background: "#161b22" }}>
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
      )}

      <div className="max-w-lg mx-auto px-4 py-6">
        {match.status !== "upcoming" && (
          <>
            {activeTab === "stats" && (
              <div className="rounded-2xl p-5" style={{ background: "#161b22", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="flex justify-between text-xs font-bold mb-5">
                  <span className="text-green-400">{match.home}</span>
                  <span className="text-blue-400">{match.away}</span>
                </div>
                {mockStats.map(stat => (
                  <StatBar key={stat.label} label={stat.label} home={stat.home} away={stat.away} />
                ))}
                <p className="text-center text-white/20 text-xs mt-4">
                  Estatísticas disponíveis quando o jogo começar
                </p>
              </div>
            )}

            {activeTab === "events" && (
              <div className="text-center py-12 text-white/20 text-sm">
                <p className="text-4xl mb-3">⚽</p>
                Eventos disponíveis quando o jogo começar
              </div>
            )}

            {activeTab === "players" && (
              <div className="text-center py-12 text-white/20 text-sm">
                <p className="text-4xl mb-3">👤</p>
                Estatísticas de jogadores disponíveis quando o jogo começar
              </div>
            )}
          </>
        )}

        {match.status === "upcoming" && (
          <div className="mt-4 rounded-2xl p-5 text-center" style={{ background: "#161b22", border: "1px solid rgba(255,255,255,0.08)" }}>
            <p className="text-4xl mb-3">🏟️</p>
            <p className="text-white font-bold mb-1">{match.venue}</p>
            <p className="text-white/40 text-sm">{match.city}</p>
            <div className="mt-4 pt-4 border-t border-white/5">
              <p className="text-white/25 text-xs uppercase tracking-wider">Data e horário</p>
              <p className="text-white font-bold mt-1">
                {match.date.split("-").reverse().join("/")} · {match.time} BRT
              </p>
            </div>
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