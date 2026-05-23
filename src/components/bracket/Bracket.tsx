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
  venue?: string;
  status: "upcoming" | "live" | "finished" | "tbd";
}

const MatchCard = ({ match, size = "md" }: { match: BracketMatch; size?: "sm" | "md" | "lg" }) => {
  const width = size === "lg" ? "w-52" : size === "sm" ? "w-44" : "w-48";
  return (
    <div className={`${width} rounded-xl overflow-hidden shadow-lg flex-shrink-0`}
      style={{ background: "#1e2a3a", border: `1px solid ${match.status === "live" ? "#ef4444" : "rgba(255,255,255,0.1)"}` }}>
      {match.status === "live" && (
        <div className="flex items-center gap-1.5 px-3 py-1 text-[10px] font-black uppercase tracking-wider" style={{ background: "#ef4444" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>AO VIVO
        </div>
      )}
      {match.date && (
        <div className="px-3 py-1 text-[10px] border-b border-white/5" style={{ color: "rgba(255,255,255,0.25)" }}>
          {match.date}{match.venue ? ` · ${match.venue}` : ""}
        </div>
      )}
      <div className="flex items-center justify-between px-3 py-2 border-b border-white/5 hover:bg-white/5 transition">
        <div className="flex items-center gap-2">
          {match.homeFla
            ? <img src={match.homeFla} alt={match.home} className="w-5 h-3.5 object-cover rounded-sm flex-shrink-0" />
            : <span className="w-5 h-3.5 rounded-sm flex-shrink-0" style={{ background: "rgba(255,255,255,0.08)" }}></span>}
          <span className={`text-xs ${match.home ? "text-white font-semibold" : "text-white/25"}`}>
            {match.home || "A definir"}
          </span>
        </div>
        {(match.status === "finished" || match.status === "live") && (
          <span className={`text-sm font-black ml-2 ${match.status === "finished" && match.homeScore! > match.awayScore! ? "text-[#ffdf00]" : "text-white/70"}`}>
            {match.homeScore ?? 0}
          </span>
        )}
      </div>
      <div className="flex items-center justify-between px-3 py-2 hover:bg-white/5 transition">
        <div className="flex items-center gap-2">
          {match.awayFla
            ? <img src={match.awayFla} alt={match.away} className="w-5 h-3.5 object-cover rounded-sm flex-shrink-0" />
            : <span className="w-5 h-3.5 rounded-sm flex-shrink-0" style={{ background: "rgba(255,255,255,0.08)" }}></span>}
          <span className={`text-xs ${match.away ? "text-white font-semibold" : "text-white/25"}`}>
            {match.away || "A definir"}
          </span>
        </div>
        {(match.status === "finished" || match.status === "live") && (
          <span className={`text-sm font-black ml-2 ${match.status === "finished" && match.awayScore! > match.homeScore! ? "text-[#ffdf00]" : "text-white/70"}`}>
            {match.awayScore ?? 0}
          </span>
        )}
      </div>
    </div>
  );
};

const tbd = (id: string, date?: string, venue?: string): BracketMatch => ({ id, status: "tbd", date, venue });

const roundOf32Dates = [
  "28 Jun", "28 Jun", "29 Jun", "29 Jun",
  "30 Jun", "30 Jun", "01 Jul", "01 Jul",
  "02 Jul", "02 Jul", "02 Jul", "02 Jul",
  "03 Jul", "03 Jul", "03 Jul", "03 Jul",
];

const roundOf16Dates = [
  "05 Jul", "05 Jul", "06 Jul", "06 Jul",
  "07 Jul", "07 Jul", "08 Jul", "08 Jul",
];

const qfDates = ["11 Jul", "11 Jul", "12 Jul", "12 Jul"];
const sfDates = ["15 Jul", "16 Jul"];

const RoundLabel = ({ label }: { label: string }) => (
  <div className="text-[10px] font-black uppercase tracking-widest text-center mb-4 whitespace-nowrap"
    style={{ color: "rgba(255,255,255,0.3)" }}>
    {label}
  </div>
);

const Connector = ({ side = "right" }: { side?: "right" | "left" }) => (
  <div className={`w-5 h-px flex-shrink-0`} style={{ background: "rgba(255,255,255,0.12)" }} />
);

export default function Bracket() {
  const r32 = roundOf32Dates.map((d, i) => tbd(`r32-${i}`, d));
  const r16 = roundOf16Dates.map((d, i) => tbd(`r16-${i}`, d));
  const qf = qfDates.map((d, i) => tbd(`qf-${i}`, d));
  const sf = sfDates.map((d, i) => tbd(`sf-${i}`, d));
  const third = tbd("third", "18 Jul", "Miami");
  const final = tbd("final", "19 Jul", "Nova Jersey");

  return (
    <div className="w-full overflow-x-auto pb-10 pt-2">
      <div className="inline-flex items-start gap-0 min-w-max px-4">

        {/* 32avos ESQUERDO */}
        <div className="flex flex-col">
          <RoundLabel label="32avos de Final" />
          <div className="flex flex-col gap-2">
            {r32.slice(0, 8).map((m) => (
              <div key={m.id} className="flex items-center">
                <MatchCard match={m} size="sm" />
                <Connector />
              </div>
            ))}
          </div>
        </div>

        {/* Oitavas ESQUERDO */}
        <div className="flex flex-col">
          <RoundLabel label="Oitavas de Final" />
          <div className="flex flex-col" style={{ gap: "40px", paddingTop: "20px" }}>
            {r16.slice(0, 4).map((m) => (
              <div key={m.id} className="flex items-center">
                <MatchCard match={m} size="sm" />
                <Connector />
              </div>
            ))}
          </div>
        </div>

        {/* Quartas ESQUERDO */}
        <div className="flex flex-col">
          <RoundLabel label="Quartas de Final" />
          <div className="flex flex-col" style={{ gap: "120px", paddingTop: "56px" }}>
            {qf.slice(0, 2).map((m) => (
              <div key={m.id} className="flex items-center">
                <MatchCard match={m} />
                <Connector />
              </div>
            ))}
          </div>
        </div>

        {/* Semifinais ESQUERDO */}
        <div className="flex flex-col">
          <RoundLabel label="Semifinais" />
          <div className="flex flex-col" style={{ gap: "0px", paddingTop: "130px" }}>
            <div className="flex items-center">
              <MatchCard match={sf[0]} />
              <Connector />
            </div>
          </div>
        </div>

        {/* FINAL + 3º Lugar */}
        <div className="flex flex-col items-center">
          <RoundLabel label="Final" />
          <div style={{ paddingTop: "180px" }}>
            <div className="flex flex-col items-center gap-3">
              <div className="text-4xl">🏆</div>
              <MatchCard match={final} size="lg" />
              <p className="text-[10px] uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.2)" }}>
                19 Jul · MetLife Stadium
              </p>
            </div>
          </div>
          <div style={{ paddingTop: "40px" }}>
            <div className="flex flex-col items-center gap-1">
              <p className="text-[10px] uppercase tracking-widest mb-1" style={{ color: "rgba(255,223,0,0.5)" }}>
                🥉 3º Lugar
              </p>
              <MatchCard match={third} />
              <p className="text-[10px] uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.2)" }}>
                18 Jul · Hard Rock Stadium
              </p>
            </div>
          </div>
        </div>

        {/* Semifinais DIREITO */}
        <div className="flex flex-col">
          <RoundLabel label="Semifinais" />
          <div style={{ paddingTop: "130px" }}>
            <div className="flex items-center">
              <Connector side="left" />
              <MatchCard match={sf[1]} />
            </div>
          </div>
        </div>

        {/* Quartas DIREITO */}
        <div className="flex flex-col">
          <RoundLabel label="Quartas de Final" />
          <div className="flex flex-col" style={{ gap: "120px", paddingTop: "56px" }}>
            {qf.slice(2, 4).map((m) => (
              <div key={m.id} className="flex items-center">
                <Connector side="left" />
                <MatchCard match={m} />
              </div>
            ))}
          </div>
        </div>

        {/* Oitavas DIREITO */}
        <div className="flex flex-col">
          <RoundLabel label="Oitavas de Final" />
          <div className="flex flex-col" style={{ gap: "40px", paddingTop: "20px" }}>
            {r16.slice(4, 8).map((m) => (
              <div key={m.id} className="flex items-center">
                <Connector side="left" />
                <MatchCard match={m} size="sm" />
              </div>
            ))}
          </div>
        </div>

        {/* 32avos DIREITO */}
        <div className="flex flex-col">
          <RoundLabel label="32avos de Final" />
          <div className="flex flex-col gap-2">
            {r32.slice(8, 16).map((m) => (
              <div key={m.id} className="flex items-center">
                <Connector side="left" />
                <MatchCard match={m} size="sm" />
              </div>
            ))}
          </div>
        </div>

      </div>

      <p className="text-center text-white/15 text-xs mt-6 uppercase tracking-wider">
        Horários no fuso de Brasília (BRT) · Copa do Mundo FIFA 2026
      </p>
    </div>
  );
}