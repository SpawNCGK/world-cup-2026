"use client";
import { useEffect, useState } from "react";

interface Odds {
  home: number;
  draw: number;
  away: number;
  bookmaker: string;
  updated: string;
}

interface OddsDisplayProps {
  homeTeam: string;
  awayTeam: string;
  homeFla: string;
  awayFla: string;
  fixtureId?: number;
}

const mockOdds: Odds[] = [
  { home: 2.10, draw: 3.40, away: 3.20, bookmaker: "Bet365", updated: "Agora" },
  { home: 2.15, draw: 3.35, away: 3.10, bookmaker: "Betano", updated: "Agora" },
];

export default function OddsDisplay({ homeTeam, awayTeam, homeFla, awayFla, fixtureId }: OddsDisplayProps) {
  const [odds, setOdds] = useState<Odds[]>(mockOdds);
  const [loading, setLoading] = useState(false);

  const bestHome = Math.max(...odds.map(o => o.home));
  const bestDraw = Math.max(...odds.map(o => o.draw));
  const bestAway = Math.max(...odds.map(o => o.away));

  return (
    <div className="rounded-2xl overflow-hidden"
      style={{ background: "#161b22", border: "1px solid rgba(255,255,255,0.08)" }}>

      {/* Header */}
      <div className="px-5 py-3 flex items-center justify-between border-b border-white/5"
        style={{ background: "#0d1117" }}>
        <div className="flex items-center gap-2">
          <span className="text-base">🎲</span>
          <span className="text-xs font-black uppercase tracking-widest text-white/50">Odds · Antes do Jogo</span>
        </div>
        <span className="text-[10px] text-white/25 uppercase tracking-wider">Melhores cotações</span>
      </div>

      {/* Times */}
      <div className="grid grid-cols-3 gap-2 px-5 py-4 border-b border-white/5">
        <div className="flex flex-col items-center gap-2">
          <img src={homeFla} alt={homeTeam} className="w-10 h-7 object-cover rounded shadow" />
          <span className="text-xs font-bold text-white text-center">{homeTeam}</span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <span className="text-white/20 text-lg font-light">×</span>
          <span className="text-white/30 text-[10px] uppercase tracking-wider mt-1">Empate</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <img src={awayFla} alt={awayTeam} className="w-10 h-7 object-cover rounded shadow" />
          <span className="text-xs font-bold text-white text-center">{awayTeam}</span>
        </div>
      </div>

      {/* Odds por casa */}
      <div className="px-5 py-3 flex flex-col gap-2">
        {odds.map((odd, i) => (
          <div key={i} className="rounded-xl overflow-hidden"
            style={{ background: "#1e2a3a", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="px-3 py-1.5 border-b border-white/5 flex items-center justify-between">
              <span className="text-xs font-black" style={{
                color: odd.bookmaker === "Bet365" ? "#00b159" : odd.bookmaker === "Betano" ? "#e63946" : "#ffdf00"
              }}>
                {odd.bookmaker}
              </span>
              <span className="text-[10px] text-white/20">{odd.updated}</span>
            </div>
            <div className="grid grid-cols-3">
              {[
                { label: "1", value: odd.home, best: odd.home === bestHome },
                { label: "X", value: odd.draw, best: odd.draw === bestDraw },
                { label: "2", value: odd.away, best: odd.away === bestAway },
              ].map((item) => (
                <div key={item.label}
                  className="flex flex-col items-center py-3 gap-1 transition hover:bg-white/5 cursor-pointer"
                  style={{ borderRight: "1px solid rgba(255,255,255,0.05)" }}>
                  <span className="text-[10px] text-white/30 uppercase">{item.label}</span>
                  <span className={`text-base font-black ${item.best ? "text-[#ffdf00]" : "text-white"}`}>
                    {item.value.toFixed(2)}
                  </span>
                  {item.best && (
                    <span className="text-[9px] uppercase tracking-wider" style={{ color: "#ffdf00" }}>melhor</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Aviso responsável */}
      <div className="px-5 py-3 border-t border-white/5 text-center">
        <p className="text-[10px] text-white/20 leading-relaxed">
          ⚠️ Jogue com responsabilidade. As odds podem mudar a qualquer momento.<br />
          +18 anos. Se precisar de ajuda: <span className="underline">jogaterapia.org.br</span>
        </p>
      </div>
    </div>
  );
}