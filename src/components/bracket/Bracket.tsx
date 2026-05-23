"use client";

interface BracketMatch {
  id: string;
  home?: string;
  homeFla?: string;
  away?: string;
  awayFla?: string;
  homeScore?: number;
  awayScore?: number;
  date?: string;
  time?: string;
  status: "upcoming" | "live" | "finished" | "tbd";
}

const MatchCard = ({ match }: { match: BracketMatch }) => (
  <div className="rounded-xl overflow-hidden w-48 shadow-xl"
    style={{ background: "#161b22", border: `1px solid ${match.status === "live" ? "#ef4444" : "rgba(255,255,255,0.08)"}` }}>
    {match.status === "live" && (
      <div className="flex items-center gap-1.5 px-3 py-1 text-[10px] font-black uppercase" style={{ background: "#ef4444" }}>
        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
        Ao Vivo
      </div>
    )}
    {match.date && (
      <div className="px-3 py-1.5 text-[10px] text-white/30 border-b border-white/5">
        {match.date} · {match.time}
      </div>
    )}
    {/* Time da casa */}
    <div className={`flex items-center justify-between px-3 py-2.5 border-b border-white/5 ${match.status === "finished" && match.homeScore! > match.awayScore! ? "bg-white/5" : ""}`}>
      <div className="flex items-center gap-2">
        {match.homeFla
          ? <img src={match.homeFla} alt={match.home} className="w-6 h-4 object-cover rounded-sm" />
          : <span className="w-6 h-4 rounded-sm bg-white/10"></span>
        }
        <span className={`text-xs font-semibold ${match.home ? "text-white" : "text-white/20"}`}>
          {match.home || "A definir"}
        </span>
      </div>
      {match.status !== "tbd" && match.status !== "upcoming" && (
        <span className={`text-sm font-black ${match.status === "finished" && match.homeScore! > match.awayScore! ? "text-[#ffdf00]" : "text-white"}`}>
          {match.homeScore ?? "-"}
        </span>
      )}
    </div>
    {/* Time visitante */}
    <div className={`flex items-center justify-between px-3 py-2.5 ${match.status === "finished" && match.awayScore! > match.homeScore! ? "bg-white/5" : ""}`}>
      <div className="flex items-center gap-2">
        {match.awayFla
          ? <img src={match.awayFla} alt={match.away} className="w-6 h-4 object-cover rounded-sm" />
          : <span className="w-6 h-4 rounded-sm bg-white/10"></span>
        }
        <span className={`text-xs font-semibold ${match.away ? "text-white" : "text-white/20"}`}>
          {match.away || "A definir"}
        </span>
      </div>
      {match.status !== "tbd" && match.status !== "upcoming" && (
        <span className={`text-sm font-black ${match.status === "finished" && match.awayScore! > match.homeScore! ? "text-[#ffdf00]" : "text-white"}`}>
          {match.awayScore ?? "-"}
        </span>
      )}
    </div>
  </div>
);

const rounds = [
  { id: "r32", label: "Oitavas de Final", matches: 16 },
  { id: "r16", label: "Quartas de Final", matches: 8 },
  { id: "sf", label: "Semifinais", matches: 4 },
  { id: "f", label: "Final", matches: 2 },
];

const tbd: BracketMatch = { id: "tbd", status: "tbd" };

const mockR32: BracketMatch[] = Array(16).fill(null).map((_, i) => ({
  id: `r32-${i}`,
  status: "upcoming" as const,
  date: "Jul 2026",
  home: undefined,
  away: undefined,
}));

export default function Bracket() {
  return (
    <div className="w-full overflow-x-auto pb-8">
      <div className="min-w-[900px] px-4">
        {/* Labels das fases */}
        <div className="grid grid-cols-4 mb-6">
          {rounds.map(r => (
            <div key={r.id} className="text-center">
              <span className="text-xs font-black uppercase tracking-widest text-white/40">{r.label}</span>
            </div>
          ))}
        </div>

        {/* Bracket */}
        <div className="grid grid-cols-4 gap-4 items-center">
          {/* Oitavas */}
          <div className="flex flex-col gap-3">
            {mockR32.slice(0, 8).map(m => <MatchCard key={m.id} match={m} />)}
          </div>

          {/* Quartas */}
          <div className="flex flex-col gap-12 justify-around h-full">
            {Array(4).fill(null).map((_, i) => (
              <MatchCard key={i} match={{ id: `qf-${i}`, status: "tbd" }} />
            ))}
          </div>

          {/* Semifinais */}
          <div className="flex flex-col gap-32 justify-around h-full">
            {Array(2).fill(null).map((_, i) => (
              <MatchCard key={i} match={{ id: `sf-${i}`, status: "tbd" }} />
            ))}
          </div>

          {/* Final */}
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-4xl mb-3">🏆</div>
            <MatchCard match={{ id: "final", status: "tbd" }} />
            <p className="text-white/20 text-xs mt-3 uppercase tracking-wider">19 Jul · Nova Jersey</p>
          </div>
        </div>

        {/* Lado direito do chaveamento */}
        <div className="grid grid-cols-4 gap-4 items-center mt-3">
          <div className="flex flex-col gap-3">
            {mockR32.slice(8, 16).map(m => <MatchCard key={m.id} match={m} />)}
          </div>
          <div className="flex flex-col gap-12 justify-around h-full">
            {Array(4).fill(null).map((_, i) => (
              <MatchCard key={i} match={{ id: `qf2-${i}`, status: "tbd" }} />
            ))}
          </div>
          <div className="col-span-2"></div>
        </div>

        <p className="text-center text-white/15 text-xs mt-8 uppercase tracking-wider">
          Horários no fuso de Brasília (BRT)
        </p>
      </div>
    </div>
  );
}