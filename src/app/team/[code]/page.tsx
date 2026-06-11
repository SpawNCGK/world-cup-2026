"use client";
import { useParams } from "next/navigation";
import { teams } from "@/data/groups";
import { squads } from "@/data/squads";

const positionOrder = ["Goleiro", "Defensor", "Meio-campista", "Atacante"];
const positionColors: Record<string, string> = {
  "Goleiro": "#f59e0b",
  "Defensor": "#22c55e",
  "Meio-campista": "#3b82f6",
  "Atacante": "#ef4444",
};

export default function TeamPage() {
  const { code } = useParams();
  const team = teams.find(t => t.code === code);
  const squad = squads[code as string];

  if (!team) {
    return (
      <main className="min-h-screen flex items-center justify-center" style={{ background: "#0d1117" }}>
        <div className="text-center">
          <p className="text-5xl mb-4">🏳️</p>
          <p className="text-white/40 text-sm">Seleção não encontrada</p>
          <a href="/" className="mt-4 inline-block text-[#ffdf00] text-sm hover:underline">← Voltar</a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen text-white" style={{ background: "#0d1117" }}>

      {/* Header */}
      <div className="relative overflow-hidden py-10 px-4 text-center"
        style={{ background: "linear-gradient(160deg,#003d0f,#006400,#004d1a)" }}>
        <div className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: "radial-gradient(circle,#fff 1px,transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="relative z-10 mb-4 text-left max-w-2xl mx-auto">
          <a href="/" className="text-white/50 text-sm hover:text-white transition">← Voltar</a>
        </div>
        <div className="relative z-10 flex flex-col items-center gap-4">
          <img src={team.flag} alt={team.name} className="w-24 h-16 object-cover rounded-xl shadow-2xl" />
          <h1 className="text-3xl font-black text-white">{team.name}</h1>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
              style={{ background: "rgba(255,223,0,0.15)", color: "#ffdf00" }}>
              Grupo {team.group}
            </span>
            {squad && (
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)" }}>
                Técnico: {squad.coach}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {squad ? (
          <>
            {/* Estatísticas rápidas */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { label: "Gols", value: squad.players.reduce((a, p) => a + (p.goals || 0), 0), icon: "⚽" },
                { label: "Assistências", value: squad.players.reduce((a, p) => a + (p.assists || 0), 0), icon: "🅰️" },
                { label: "Jogadores", value: squad.players.length, icon: "👥" },
              ].map(stat => (
                <div key={stat.label} className="rounded-xl p-4 text-center"
                  style={{ background: "#161b22", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="text-2xl mb-1">{stat.icon}</div>
                  <div className="text-2xl font-black text-white">{stat.value}</div>
                  <div className="text-white/30 text-xs uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Lista por posição */}
            {positionOrder.map(position => {
              const players = squad.players.filter(p => p.position === position);
              if (players.length === 0) return null;
              return (
                <div key={position} className="mb-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-3 h-3 rounded-full" style={{ background: positionColors[position] }}></span>
                    <span className="text-xs font-black uppercase tracking-widest"
                      style={{ color: positionColors[position] }}>
                      {position}s
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    {players.map(player => (
                      <div key={player.number} className="flex items-center gap-3 px-4 py-3 rounded-xl"
                        style={{ background: "#161b22", border: "1px solid rgba(255,255,255,0.07)" }}>
                        <span className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0"
                          style={{ background: positionColors[position] + "20", color: positionColors[position] }}>
                          {player.number}
                        </span>
                        <div className="flex-1">
                          <p className="font-bold text-white text-sm">{player.name}</p>
                          <p className="text-white/30 text-xs">{player.club}</p>
                        </div>
                        <div className="flex items-center gap-3 text-xs">
                          {player.position === "Goleiro" ? (
                            <span className="text-white/40">{player.saves ?? 0} defesas</span>
                          ) : (
                            <>
                              <span className="flex items-center gap-1 text-white/60">
                                ⚽ {player.goals ?? 0}
                              </span>
                              <span className="flex items-center gap-1 text-white/60">
                                🅰️ {player.assists ?? 0}
                              </span>
                              {player.dribblesCompleted !== undefined && (
                                <span className="flex items-center gap-1 text-white/40">
                                  🏃 {player.dribblesCompleted}
                                </span>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <div className="text-center py-16 rounded-2xl"
            style={{ background: "#161b22", border: "1px solid rgba(255,255,255,0.08)" }}>
            <p className="text-4xl mb-3">📋</p>
            <p className="text-white/40 text-sm">Convocação em breve</p>
          </div>
        )}
      </div>
    </main>
  );
}