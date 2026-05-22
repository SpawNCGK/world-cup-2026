"use client";
import { useState } from "react";
import { groups, getTeamsByGroup, getMatchesByGroup, initialStandings } from "@/data/groups";

const ResultDot = ({ r }: { r: "W" | "D" | "L" | null }) => {
  const base = "w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black";
  if (r === "W") return <span className={`${base} bg-green-500 text-white`}>V</span>;
  if (r === "D") return <span className={`${base} bg-amber-400 text-white`}>E</span>;
  if (r === "L") return <span className={`${base} bg-red-500 text-white`}>D</span>;
  return <span className={`${base} bg-white/10 border border-white/20`} />;
};

function GroupCard({ group, onClick }: { group: string; onClick: () => void }) {
  const standings = initialStandings(group);
  const matches = getMatchesByGroup(group);

  return (
    <div className="rounded-2xl overflow-hidden shadow-2xl cursor-pointer group"
      style={{ background: "#161b22", border: "1px solid rgba(255,255,255,0.08)" }}
      onClick={onClick}>

      {/* Cabeçalho */}
      <div className="flex items-center justify-between px-5 py-4 transition-all group-hover:brightness-110"
        style={{ background: "linear-gradient(90deg,#004d1a,#007a1f)" }}>
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-full font-black text-xl flex items-center justify-center shadow-lg"
            style={{ background: "#ffdf00", color: "#004d1a" }}>
            {group}
          </span>
          <span className="font-black text-white text-xl tracking-wide">Grupo {group}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-white/30 text-xs uppercase tracking-widest hidden md:block">6 partidas</span>
          <span className="text-white/50 text-lg md:hidden">›</span>
        </div>
      </div>

      {/* Tabela DESKTOP (oculta no mobile) */}
      <div className="hidden md:block">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: "#0d1117", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
              <th className="text-left pl-5 pr-2 py-3 text-white/30 font-medium text-xs w-8">#</th>
              <th className="text-left px-2 py-3 text-white/30 font-medium text-xs">Equipe</th>
              <th className="text-center px-3 py-3 font-black text-xs" style={{ color: "#ffdf00" }}>Pts</th>
              {["PJ","V","E","D","GM","GC","SG"].map(h => (
                <th key={h} className="text-center px-2 py-3 text-white/30 font-medium text-xs">{h}</th>
              ))}
              <th className="text-center px-4 py-3 text-white/30 font-medium text-xs">Últ. 5</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((team, i) => (
              <tr key={team.code} className="transition-colors hover:bg-white/[0.04]"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", borderLeft: i < 2 ? "3px solid #22c55e" : "3px solid transparent" }}>
                <td className="pl-5 pr-2 py-3 text-white/25 text-xs">{i + 1}</td>
                <td className="px-2 py-3">
                  <div className="flex items-center gap-2">
                    <img src={team.flag} alt={team.team} className="w-8 h-5 object-cover rounded shadow flex-shrink-0" />
                    <span className="font-semibold text-white truncate max-w-[130px]">{team.team}</span>
                  </div>
                </td>
                <td className="text-center px-3 py-3 font-black text-white text-base">{team.points}</td>
                {[team.played, team.won, team.drawn, team.lost, team.gf, team.ga, team.gd].map((v, j) => (
                  <td key={j} className="text-center px-2 py-3 text-white/40 text-xs">{v}</td>
                ))}
                <td className="px-4 py-3">
                  <div className="flex gap-1 justify-center">
                    {Array(5).fill(null).map((_, j) => <ResultDot key={j} r={null} />)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Legenda + próximo jogo (desktop) */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex items-center gap-2 px-5 py-2" style={{ background: "#0d1117" }}>
            <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
            <span className="text-white/25 text-xs">Classificado para as oitavas de final</span>
          </div>
          {matches[0] && (
            <div className="flex items-center justify-between px-5 py-3"
              style={{ background: "#161b22", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider"
                  style={{ background: "rgba(255,223,0,0.12)", color: "#ffdf00" }}>Próximo</span>
                <span className="text-white/80 text-sm font-semibold">
                  {matches[0].home} <span className="text-white/30 mx-1">×</span> {matches[0].away}
                </span>
              </div>
              <span className="text-white/30 text-xs whitespace-nowrap">
                {matches[0].date.split("-").reverse().join("/")} · {matches[0].time} BRT
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Preview MOBILE (visível só no mobile) */}
      <div className="md:hidden px-4 py-3 flex items-center justify-between"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex gap-2">
          {standings.slice(0, 4).map((team, i) => (
            <div key={team.code} className="flex items-center gap-1.5">
              <img src={team.flag} alt={team.team} className="w-5 h-3.5 object-cover rounded-sm" />
              <span className="text-white/60 text-xs">{team.code}</span>
            </div>
          ))}
        </div>
        <span className="text-white/30 text-xs">Ver tabela →</span>
      </div>
    </div>
  );
}

function GroupModal({ group, onClose }: { group: string; onClose: () => void }) {
  const standings = initialStandings(group);
  const matches = getMatchesByGroup(group);

  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ background: "#0d1117" }}>
      {/* Header do modal */}
      <div className="flex items-center gap-4 px-4 py-4 flex-shrink-0"
        style={{ background: "linear-gradient(90deg,#004d1a,#007a1f)", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <button onClick={onClose} className="w-9 h-9 rounded-full flex items-center justify-center text-white text-lg font-bold transition hover:bg-white/10"
          style={{ background: "rgba(0,0,0,0.3)" }}>
          ‹
        </button>
        <div className="flex items-center gap-3">
          <span className="w-9 h-9 rounded-full font-black text-lg flex items-center justify-center"
            style={{ background: "#ffdf00", color: "#004d1a" }}>
            {group}
          </span>
          <span className="font-black text-white text-xl">Grupo {group}</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Tabela completa */}
        <div className="px-4 pt-5 pb-2">
          <p className="text-white/30 text-xs uppercase tracking-widest mb-3">Classificação</p>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: "#161b22", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
              <th className="text-left pl-5 pr-2 py-3 text-white/30 text-xs">#</th>
              <th className="text-left px-2 py-3 text-white/30 text-xs">Equipe</th>
              <th className="text-center px-2 py-3 font-black text-xs" style={{ color: "#ffdf00" }}>Pts</th>
              {["PJ","V","E","D","GM","GC","SG"].map(h => (
                <th key={h} className="text-center px-2 py-3 text-white/30 text-xs">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {standings.map((team, i) => (
              <tr key={team.code}
                style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", borderLeft: i < 2 ? "3px solid #22c55e" : "3px solid transparent" }}>
                <td className="pl-5 pr-2 py-4 text-white/25 text-xs">{i + 1}</td>
                <td className="px-2 py-4">
                  <div className="flex items-center gap-2">
                    <img src={team.flag} alt={team.team} className="w-8 h-5 object-cover rounded shadow flex-shrink-0" />
                    <span className="font-semibold text-white text-sm">{team.team}</span>
                  </div>
                </td>
                <td className="text-center px-2 py-4 font-black text-white text-lg">{team.points}</td>
                {[team.played, team.won, team.drawn, team.lost, team.gf, team.ga, team.gd].map((v, j) => (
                  <td key={j} className="text-center px-2 py-4 text-white/50 text-xs">{v}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex items-center gap-2 px-5 py-3 mx-4 rounded-lg mt-2 mb-6"
          style={{ background: "#161b22" }}>
          <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
          <span className="text-white/30 text-xs">Classificado para as oitavas de final</span>
        </div>

        {/* Jogos do grupo */}
        <div className="px-4 pb-2">
          <p className="text-white/30 text-xs uppercase tracking-widest mb-3">Jogos</p>
        </div>
        <div className="px-4 pb-8 flex flex-col gap-3">
          {matches.map((match) => (
            <div key={match.id} className="rounded-xl px-4 py-4"
              style={{ background: "#161b22", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/30 text-xs">
                  {match.date.split("-").reverse().join("/")} · {match.time} BRT
                </span>
                <span className="text-white/30 text-xs">{match.city}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 flex-1">
                  <img src={getTeamsByGroup(group).find(t => t.name === match.home)?.flag}
                    alt={match.home} className="w-8 h-5 object-cover rounded shadow" />
                  <span className="font-bold text-white text-sm">{match.home}</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg flex-shrink-0"
                  style={{ background: "#0d1117" }}>
                  {match.status === "finished" || match.status === "live"
                    ? <span className="font-black text-white text-base">{match.homeScore} – {match.awayScore}</span>
                    : <span className="text-white/30 text-xs font-medium">vs</span>
                  }
                </div>
                <div className="flex items-center gap-2 flex-1 justify-end">
                  <span className="font-bold text-white text-sm text-right">{match.away}</span>
                  <img src={getTeamsByGroup(group).find(t => t.name === match.away)?.flag}
                    alt={match.away} className="w-8 h-5 object-cover rounded shadow" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<"grupos" | "eliminatorias">("grupos");
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  return (
    <main className="min-h-screen text-white" style={{ background: "#0d1117" }}>

      {/* Modal mobile */}
      {selectedGroup && (
        <GroupModal group={selectedGroup} onClose={() => setSelectedGroup(null)} />
      )}

      {/* Header */}
      <header className="relative overflow-hidden text-center py-10 px-4"
        style={{ background: "linear-gradient(160deg,#003d0f 0%,#006400 45%,#004d1a 100%)" }}>
        <div className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: "radial-gradient(circle,#fff 1px,transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="relative z-10">
          <div className="text-5xl mb-3">🏆</div>
          <h1 className="text-3xl md:text-5xl font-black text-[#ffdf00] tracking-tight leading-none drop-shadow-lg">
            COPA DO MUNDO FIFA 2026
          </h1>
          <p className="mt-3 text-white/60 text-xs tracking-[0.2em] uppercase">
            EUA · México · Canadá &nbsp;|&nbsp; 11 Jun – 19 Jul
          </p>
          <div className="flex justify-center gap-6 mt-5">
            {[["🌎","48 Seleções"],["⚽","104 Jogos"],["🏟️","16 Estádios"]].map(([icon,label]) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <span className="text-xl">{icon}</span>
                <span className="text-white/40 text-[10px] uppercase tracking-widest">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="sticky top-0 z-20"
        style={{ background: "#161b22", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="max-w-screen-xl mx-auto px-4 flex">
          {[{ id:"grupos", label:"Fase de Grupos" },{ id:"eliminatorias", label:"Eliminatórias" }].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-4 text-sm font-bold tracking-wide transition-all border-b-2 ${
                activeTab === tab.id
                  ? "border-[#ffdf00] text-[#ffdf00]"
                  : "border-transparent text-white/40 hover:text-white/70"
              }`}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Conteúdo */}
      <div className="max-w-screen-xl mx-auto px-4 py-6">
        {activeTab === "grupos" && (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            {groups.map(group => (
              <GroupCard
                key={group}
                group={group}
                onClick={() => {
                  if (window.innerWidth < 768) setSelectedGroup(group);
                }}
              />
            ))}
          </div>
        )}

        {activeTab === "eliminatorias" && (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <span className="text-7xl">🏆</span>
            <p className="text-white/20 text-sm tracking-widest uppercase">
              Chaveamento disponível após a fase de grupos
            </p>
          </div>
        )}
      </div>

      <footer className="text-center py-8 text-white/15 text-xs tracking-wider uppercase"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        Todos os horários no fuso de Brasília (BRT) · Copa do Mundo FIFA 2026
      </footer>
    </main>
  );
}