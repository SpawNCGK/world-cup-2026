"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getGameById, WCGame, translateTeam } from "@/lib/api/worldcup";
import { teams } from "@/data/groups";
import OddsDisplay from "@/components/odds/OddsDisplay";

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

const getFlag = (name: string) => teams.find(t => t.name === name)?.flag || "";

const formatDate = (localDate: string) => {
  const [date, time] = localDate.split(" ");
  const [m, d, y] = date.split("/");
  return `${d}/${m}/${y} · ${time} BRT`;
};

export default function MatchPage() {
  const { id } = useParams();
  const [game, setGame] = useState<WCGame | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"stats" | "events" | "players">("stats");

  useEffect(() => {
    const fetchGame = async () => {
      const data = await getGameById(id as string);
      setGame(data);
      setLoading(false);
    };
    fetchGame();
    // Atualiza a cada 30s se jogo ao vivo
    const interval = setInterval(fetchGame, 30000);
    return () => clearInterval(interval);
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center" style={{ background: "#0d1117" }}>
        <div className="text-center">
          <div className="text-5xl mb-4 animate-bounce">⚽</div>
          <p className="text-white/40 text-sm">Carregando jogo...</p>
        </div>
      </main>
    );
  }

  if (!game) {
    return (
      <main className="min-h-screen flex items-center justify-center" style={{ background: "#0d1117" }}>
        <div className="text-center">
          <p className="text-5xl mb-4">⚽</p>
          <p className="text-white/40 text-sm">Jogo não encontrado</p>
          <a href="/" className="mt-4 inline-block text-[#ffdf00] text-sm hover:underline">← Voltar</a>
        </div>
      </main>
    );
  }

  const isLive = game.time_elapsed !== "notstarted" && game.finished === "FALSE";
  const isFinished = game.finished === "TRUE";
  const isUpcoming = game.time_elapsed === "notstarted" && game.finished === "FALSE";


// ...
const homeName = translateTeam(game.home_team_name_en || game.home_team_label || "A definir");
const awayName = translateTeam(game.away_team_name_en || game.away_team_label || "A definir");
  const homeFla = getFlag(homeName);
  const awayFla = getFlag(awayName);

  return (
    <main className="min-h-screen text-white" style={{ background: "#0d1117" }}>

      {/* Header */}
      <div className="relative overflow-hidden"
        style={{ background: "linear-gradient(160deg,#003d0f,#006400,#004d1a)" }}>
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
            {isLive && (
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase"
                style={{ background: "#ef4444" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                AO VIVO · {game.time_elapsed}'
              </div>
            )}
            {isFinished && (
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase"
                style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)" }}>
                ENCERRADO
              </span>
            )}
            {isUpcoming && (
              <div className="text-center">
                <span className="px-3 py-1 rounded-full text-xs font-black uppercase"
                  style={{ background: "rgba(255,223,0,0.15)", color: "#ffdf00" }}>
                  ANTES DO JOGO
                </span>
                <p className="text-white/40 text-xs mt-2">{formatDate(game.local_date)}</p>
              </div>
            )}
          </div>

          {/* Placar */}
          <div className="flex items-center justify-between max-w-lg mx-auto">
            <div className="flex flex-col items-center gap-3 flex-1">
              {homeFla
                ? <img src={homeFla} alt={homeName} className="w-16 h-11 object-cover rounded-lg shadow-xl" />
                : <span className="text-4xl">🏳️</span>
              }
              <span className="font-black text-white text-base text-center">{homeName}</span>
            </div>

            <div className="flex flex-col items-center gap-2 px-4">
              {isUpcoming ? (
                <span className="text-4xl font-black text-white/20">vs</span>
              ) : (
                <div className="flex items-center gap-4">
                  <span className="text-6xl font-black text-white">{game.home_score}</span>
                  <span className="text-3xl text-white/30 font-light">–</span>
                  <span className="text-6xl font-black text-white">{game.away_score}</span>
                </div>
              )}
              <a href="https://www.youtube.com/cazetv" target="_blank" rel="noopener noreferrer"
                className="mt-2 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition hover:scale-105"
                style={{ background: "#ffdf00", color: "#004d1a" }}>
                📺 Assistir na Cazé TV
              </a>
            </div>

            <div className="flex flex-col items-center gap-3 flex-1">
              {awayFla
                ? <img src={awayFla} alt={awayName} className="w-16 h-11 object-cover rounded-lg shadow-xl" />
                : <span className="text-4xl">🏳️</span>
              }
              <span className="font-black text-white text-base text-center">{awayName}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Odds — só antes do jogo */}
      {isUpcoming && (
        <div className="max-w-lg mx-auto px-4 pt-6">
          <OddsDisplay
            homeTeam={homeName}
            awayTeam={awayName}
            homeFla={homeFla}
            awayFla={awayFla}
          />
        </div>
      )}

      {/* Info do jogo upcoming */}
      {isUpcoming && (
        <div className="max-w-lg mx-auto px-4 mt-4">
          <div className="rounded-2xl p-5 text-center"
            style={{ background: "#161b22", border: "1px solid rgba(255,255,255,0.08)" }}>
            <p className="text-4xl mb-3">🏟️</p>
            <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Data e Horário</p>
            <p className="text-white font-bold">{formatDate(game.local_date)}</p>
          </div>
        </div>
      )}

      {/* Tabs — durante/após o jogo */}
      {(isLive || isFinished) && (
        <>
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

          <div className="max-w-lg mx-auto px-4 py-6">
            {activeTab === "stats" && (
              <div className="rounded-2xl p-5"
                style={{ background: "#161b22", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="flex justify-between text-xs font-bold mb-5">
                  <span className="text-green-400">{homeName}</span>
                  <span className="text-blue-400">{awayName}</span>
                </div>
                <p className="text-center text-white/20 text-xs py-8">
                  Estatísticas em tempo real em breve
                </p>
              </div>
            )}
            {activeTab === "events" && (
              <div className="text-center py-12 text-white/20 text-sm">
                <p className="text-4xl mb-3">⚽</p>
                Eventos em tempo real em breve
              </div>
            )}
            {activeTab === "players" && (
              <div className="text-center py-12 text-white/20 text-sm">
                <p className="text-4xl mb-3">👤</p>
                Estatísticas de jogadores em breve
              </div>
            )}
          </div>
        </>
      )}

      <footer className="text-center py-6 text-white/15 text-xs tracking-wider uppercase mt-4"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        Todos os horários no fuso de Brasília (BRT) · Copa do Mundo FIFA 2026
      </footer>
    </main>
  );
}