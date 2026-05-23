"use client";
import { useState, useMemo } from "react";
import { allMatches, teams, Match } from "@/data/groups";

const groupColors: Record<string, string> = {
  A: "#ef4444", B: "#f97316", C: "#eab308", D: "#22c55e",
  E: "#14b8a6", F: "#3b82f6", G: "#8b5cf6", H: "#ec4899",
  I: "#f43f5e", J: "#10b981", K: "#6366f1", L: "#f59e0b",
};

const getFlag = (name: string) =>
  teams.find(t => t.name === name)?.flag || "";

const formatDate = (date: string) => {
  const [y, m, d] = date.split("-");
  const months = ["","Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];
  return `${d} ${months[parseInt(m)]}`;
};

const getDayLabel = (date: string) => {
  const [y, m, d] = date.split("-");
  const months = ["","Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
  const weekDays = ["Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado"];
  const dt = new Date(parseInt(y), parseInt(m) - 1, parseInt(d));
  return `${weekDays[dt.getDay()]}, ${d} de ${months[parseInt(m)]}`;
};

export default function Calendar() {
  const [filterGroup, setFilterGroup] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const groups = ["all","A","B","C","D","E","F","G","H","I","J","K","L"];

  const filtered = useMemo(() => {
    return allMatches.filter(m => {
      if (filterGroup !== "all" && m.group !== filterGroup) return false;
      if (filterStatus !== "all" && m.status !== filterStatus) return false;
      return true;
    });
  }, [filterGroup, filterStatus]);

  // Agrupa por data
  const byDate = useMemo(() => {
    const map: Record<string, Match[]> = {};
    filtered.forEach(m => {
      if (!map[m.date]) map[m.date] = [];
      map[m.date].push(m);
    });
    return Object.entries(map).sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);

  return (
    <div className="max-w-3xl mx-auto">

      {/* Filtros */}
      <div className="flex flex-wrap gap-3 mb-6">
        {/* Filtro grupo */}
        <div className="flex flex-wrap gap-1.5">
          {groups.map(g => (
            <button key={g} onClick={() => setFilterGroup(g)}
              className="px-3 py-1.5 rounded-full text-xs font-bold transition"
              style={{
                background: filterGroup === g
                  ? g === "all" ? "#ffdf00" : groupColors[g]
                  : "rgba(255,255,255,0.07)",
                color: filterGroup === g ? "#0d1117" : "rgba(255,255,255,0.5)",
              }}>
              {g === "all" ? "Todos" : `Grupo ${g}`}
            </button>
          ))}
        </div>

        {/* Filtro status */}
        <div className="flex gap-1.5 ml-auto">
          {[
            { id: "all", label: "Todos" },
            { id: "live", label: "🔴 Ao Vivo" },
            { id: "upcoming", label: "Próximos" },
            { id: "finished", label: "Encerrados" },
          ].map(s => (
            <button key={s.id} onClick={() => setFilterStatus(s.id)}
              className="px-3 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap"
              style={{
                background: filterStatus === s.id ? "#ffdf00" : "rgba(255,255,255,0.07)",
                color: filterStatus === s.id ? "#0d1117" : "rgba(255,255,255,0.5)",
              }}>
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Contagem */}
      <p className="text-white/25 text-xs mb-4 uppercase tracking-wider">
        {filtered.length} jogo{filtered.length !== 1 ? "s" : ""} encontrado{filtered.length !== 1 ? "s" : ""}
      </p>

      {/* Lista por dia */}
      {byDate.length === 0 ? (
        <div className="text-center py-16 text-white/20 text-sm">Nenhum jogo encontrado</div>
      ) : (
        byDate.map(([date, matches]) => (
          <div key={date} className="mb-6">
            {/* Label do dia */}
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.07)" }}></div>
              <span className="text-xs font-bold uppercase tracking-widest text-white/40">
                {getDayLabel(date)}
              </span>
              <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.07)" }}></div>
            </div>

            {/* Jogos do dia */}
            <div className="flex flex-col gap-2">
              {matches.map(match => {
                const homeFla = getFlag(match.home);
                const awayFla = getFlag(match.away);
                return (
                  <a key={match.id} href={`/match/${match.id}`}
                    className="rounded-xl overflow-hidden transition hover:brightness-110"
                    style={{ background: "#161b22", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <div className="flex items-center gap-2 px-4 py-2 border-b border-white/5">
                      <span className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ background: groupColors[match.group] }}></span>
                      <span className="text-[10px] font-bold uppercase tracking-wider"
                        style={{ color: groupColors[match.group] }}>
                        Grupo {match.group}
                      </span>
                      {match.status === "live" && (
                        <span className="ml-auto flex items-center gap-1 text-[10px] font-black text-red-400 uppercase">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse"></span>
                          Ao Vivo
                        </span>
                      )}
                      {match.status !== "live" && (
                        <span className="ml-auto text-[10px] text-white/25">
                          {match.time} BRT · {match.city}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center px-4 py-3 gap-3">
                      {/* Casa */}
                      <div className="flex items-center gap-2 flex-1 justify-end">
                        <span className="font-bold text-white text-sm text-right">{match.home}</span>
                        <img src={homeFla} alt={match.home} className="w-8 h-5 object-cover rounded shadow flex-shrink-0" />
                      </div>

                      {/* Placar / Horário */}
                      <div className="flex-shrink-0 w-16 text-center">
                        {match.status === "finished" ? (
                          <span className="font-black text-white text-lg">
                            {match.homeScore} – {match.awayScore}
                          </span>
                        ) : match.status === "live" ? (
                          <span className="font-black text-red-400 text-lg">
                            {match.homeScore ?? 0} – {match.awayScore ?? 0}
                          </span>
                        ) : (
                          <span className="font-bold text-white/30 text-sm">{match.time}</span>
                        )}
                      </div>

                      {/* Visitante */}
                      <div className="flex items-center gap-2 flex-1">
                        <img src={awayFla} alt={match.away} className="w-8 h-5 object-cover rounded shadow flex-shrink-0" />
                        <span className="font-bold text-white text-sm">{match.away}</span>
                      </div>
                    </div>

                    <div className="px-4 py-1.5 border-t border-white/5 flex items-center justify-between">
                      <span className="text-[10px] text-white/20">{match.venue}</span>
                      <span className="text-[10px] text-white/30 font-bold">Ver jogo →</span>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        ))
      )}
    </div>
  );
}