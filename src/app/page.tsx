"use client";
import { useState } from "react";
import { groups, getTeamsByGroup, getMatchesByGroup, initialStandings } from "@/data/groups";

const resultIcon = (r: "W" | "D" | "L" | null) => {
  if (r === "W") return <span className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-[10px] font-bold text-white">V</span>;
  if (r === "D") return <span className="w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center text-[10px] font-bold text-white">E</span>;
  if (r === "L") return <span className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-[10px] font-bold text-white">D</span>;
  return <span className="w-6 h-6 rounded-full border border-white/20 bg-white/5"></span>;
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<"grupos" | "eliminatorias">("grupos");

  return (
    <main className="min-h-screen text-white" style={{ background: "linear-gradient(135deg, #0d1117 0%, #0f1e2e 50%, #0d1117 100%)" }}>

      {/* Header */}
      <header className="relative overflow-hidden py-10 px-4 text-center" style={{ background: "linear-gradient(135deg, #004d1a 0%, #006400 40%, #007a00 60%, #004d1a 100%)" }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, #ffdf00 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
        <div className="relative">
          <div className="text-5xl mb-3">🏆</div>
          <h1 className="text-3xl md:text-5xl font-black text-[#ffdf00] tracking-tight drop-shadow-lg">
            COPA DO MUNDO FIFA 2026
          </h1>
          <p className="text-white/70 mt-2 text-sm md:text-base tracking-widest uppercase">
            EUA · México · Canadá &nbsp;|&nbsp; 11 Jun – 19 Jul
          </p>
          <div className="flex justify-center gap-6 mt-4 text-xs text-white/50 uppercase tracking-wider">
            <span>🌎 48 Seleções</span>
            <span>⚽ 104 Jogos</span>
            <span>🏟️ 16 Estádios</span>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="sticky top-0 z-10 border-b border-white/10" style={{ background: "#0f1e2e" }}>
        <div className="max-w-screen-2xl mx-auto px-4 flex gap-1">
          {[
            { id: "grupos", label: "Fase de Grupos" },
            { id: "eliminatorias", label: "Eliminatórias" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-4 text-sm font-semibold tracking-wide transition border-b-2 ${
                activeTab === tab.id
                  ? "border-[#ffdf00] text-[#ffdf00]"
                  : "border-transparent text-white/40 hover:text-white/70"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Conteúdo */}
      <div className="max-w-screen-2xl mx-auto px-4 py-8">
        {activeTab === "grupos" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {groups.map((group) => {
              const standings = initialStandings(group);
              const matches = getMatchesByGroup(group);

              return (
                <div key={group} className="rounded-2xl overflow-hidden border border-white/10 shadow-xl" style={{ background: "#161f2e" }}>

                  {/* Header do grupo */}
                  <div className="px-5 py-4 flex items-center justify-between" style={{ background: "linear-gradient(90deg, #004d1a, #006400)" }}>
                    <div className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-full bg-[#ffdf00] text-[#006400] font-black text-lg flex items-center justify-center shadow">
                        {group}
                      </span>
                      <span className="font-bold text-white text-lg tracking-wide">Grupo {group}</span>
                    </div>
                    <span className="text-white/40 text-xs uppercase tracking-wider">6 partidas</span>
                  </div>

                  {/* Tabela */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-white/10" style={{ background: "#0f1824" }}>
                          <th className="text-left px-4 py-3 text-white/40 font-medium text-xs w-6">#</th>
                          <th className="text-left px-2 py-3 text-white/40 font-medium text-xs">Equipe</th>
                          <th className="text-center px-3 py-3 text-[#ffdf00] font-bold text-xs">Pts</th>
                          <th className="text-center px-2 py-3 text-white/40 font-medium text-xs">PJ</th>
                          <th className="text-center px-2 py-3 text-white/40 font-medium text-xs">V</th>
                          <th className="text-center px-2 py-3 text-white/40 font-medium text-xs">E</th>
                          <th className="text-center px-2 py-3 text-white/40 font-medium text-xs">D</th>
                          <th className="text-center px-2 py-3 text-white/40 font-medium text-xs">GM</th>
                          <th className="text-center px-2 py-3 text-white/40 font-medium text-xs">GC</th>
                          <th className="text-center px-2 py-3 text-white/40 font-medium text-xs">SG</th>
                          <th className="text-center px-3 py-3 text-white/40 font-medium text-xs">Últ. 5</th>
                        </tr>
                      </thead>
                      <tbody>
                        {standings.map((team, i) => (
                          <tr
                            key={team.code}
                            className="border-b border-white/5 hover:bg-white/5 transition-colors"
                            style={{ borderLeft: i < 2 ? "3px solid #22c55e" : "3px solid transparent" }}
                          >
                            <td className="px-4 py-3 text-white/30 text-xs">{i + 1}</td>
                            <td className="px-2 py-3">
                              <div className="flex items-center gap-2 min-w-[120px]">
                                <img src={team.flag} alt={team.team} className="w-7 h-5 object-cover rounded shadow-sm flex-shrink-0" />
                                <span className="font-semibold text-white text-sm truncate">{team.team}</span>
                              </div>
                            </td>
                            <td className="text-center px-3 py-3 font-black text-white text-base">{team.points}</td>
                            <td className="text-center px-2 py-3 text-white/50 text-xs">{team.played}</td>
                            <td className="text-center px-2 py-3 text-white/50 text-xs">{team.won}</td>
                            <td className="text-center px-2 py-3 text-white/50 text-xs">{team.drawn}</td>
                            <td className="text-center px-2 py-3 text-white/50 text-xs">{team.lost}</td>
                            <td className="text-center px-2 py-3 text-white/50 text-xs">{team.gf}</td>
                            <td className="text-center px-2 py-3 text-white/50 text-xs">{team.ga}</td>
                            <td className="text-center px-2 py-3 text-white/50 text-xs">{team.gd}</td>
                            <td className="px-3 py-3">
                              <div className="flex gap-1 justify-center">
                                {[null, null, null, null, null].map((_, j) => (
                                  <span key={j}>{resultIcon(null)}</span>
                                ))}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Legenda */}
                  <div className="px-4 py-2 flex items-center gap-2 border-t border-white/5" style={{ background: "#0f1824" }}>
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    <span className="text-white/30 text-xs">Classificado para as oitavas</span>
                  </div>

                  {/* Próximo jogo */}
                  {matches[0] && (
                    <div className="px-4 py-3 border-t border-white/10 flex items-center justify-between" style={{ background: "#1a2535" }}>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider" style={{ background: "#ffdf0020", color: "#ffdf00" }}>
                          Próximo
                        </span>
                        <span className="text-white/80 font-medium">{matches[0].home} × {matches[0].away}</span>
                      </div>
                      <span className="text-white/30 text-xs whitespace-nowrap ml-2">
                        {matches[0].date.split("-").reverse().join("/")} · {matches[0].time}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {activeTab === "eliminatorias" && (
          <div className="flex flex-col items-center justify-center h-64 gap-3">
            <span className="text-6xl">🏆</span>
            <p className="text-white/30 text-sm">Chaveamento disponível após a fase de grupos</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="text-center py-6 text-white/20 text-xs border-t border-white/5 mt-8">
        Todos os horários no fuso de Brasília (BRT) · Copa do Mundo FIFA 2026
      </footer>
    </main>
  );
}