import { useState } from 'react';
import { TEAMS, MATCHES } from '../data';
import { Team } from '../types';
import { Shield, TrendingUp, HelpCircle } from 'lucide-react';

interface StandingsTableProps {
  onSelectTeam?: (teamId: string) => void;
}

export default function StandingsTable({ onSelectTeam }: StandingsTableProps) {
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  // Helper to calculate form (last 5 played matches) for a team
  const getTeamForm = (teamId: string) => {
    const teamMatches = MATCHES.filter(
      (m) => m.status === 'played' && (m.homeTeamId === teamId || m.awayTeamId === teamId)
    ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Latest first

    return teamMatches.slice(0, 5).map((match) => {
      const isHome = match.homeTeamId === teamId;
      const scoreSelf = isHome ? match.homeScore : match.awayScore;
      const scoreOpponent = isHome ? match.awayScore : match.homeScore;

      if (scoreSelf === undefined || scoreOpponent === undefined) return 'D'; // Drawer/no status
      if (scoreSelf > scoreOpponent) return 'W'; // Win
      if (scoreSelf < scoreOpponent) return 'L'; // Loss
      return 'D'; // Draw
    });
  };

  // Sort teams by points, then goal difference, then goals for
  const sortedTeams = [...TEAMS].sort((a, b) => {
    if (b.points !== a.points) {
      return b.points - a.points;
    }
    const aGD = a.goalsFor - a.goalsAgainst;
    const bGD = b.goalsFor - b.goalsAgainst;
    if (bGD !== aGD) {
      return bGD - aGD;
    }
    return b.goalsFor - a.goalsFor;
  });

  return (
    <div id="standings-table-container" className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
      {/* Table Header Section */}
      <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            Clasificación General
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Los primeros 4 equipos clasifican de forma directa a las Semifinales del torneo.
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs font-medium text-slate-500 bg-slate-100/80 p-2.5 rounded-xl border border-slate-200/50">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Zona Clasificación
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-slate-300"></span> Permanencia
          </span>
        </div>
      </div>

      {/* Main Responsive Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/70 border-b border-slate-100 text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">
              <th className="py-4 pl-6 text-center w-12">Pos</th>
              <th className="py-4 pl-2 min-w-[150px] sm:min-w-[200px]">Equipo</th>
              <th className="py-4 text-center w-12">PJ</th>
              <th className="py-4 text-center w-12">PG</th>
              <th className="py-4 text-center w-12 hidden md:table-cell">PE</th>
              <th className="py-4 text-center w-12 hidden md:table-cell">PP</th>
              <th className="py-4 text-center w-14 hidden sm:table-cell">GF</th>
              <th className="py-4 text-center w-14 hidden sm:table-cell">GC</th>
              <th className="py-4 text-center w-14">DG</th>
              <th className="py-4 text-center w-16 bg-slate-100/30 font-black text-slate-700">Pts</th>
              <th className="py-4 pr-6 text-center w-36 hidden lg:table-cell">Últimos 5</th>
            </tr>
          </thead>
          <tbody>
            {sortedTeams.map((team, index) => {
              const position = index + 1;
              const goalDiff = team.goalsFor - team.goalsAgainst;
              const form = getTeamForm(team.id);
              const isPromoted = position <= 4;
              const isHovered = hoveredRow === team.id;

              return (
                <tr
                  id={`standing-row-${team.id}`}
                  key={team.id}
                  onMouseEnter={() => setHoveredRow(team.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                  onClick={() => onSelectTeam && onSelectTeam(team.id)}
                  className={`border-b border-slate-100/70 last:border-0 transition-all duration-200 cursor-pointer ${
                    isHovered ? 'bg-slate-50/80 scale-[0.995] z-10 relative' : ''
                  }`}
                >
                  {/* Position Column */}
                  <td className="py-4 pl-6 text-center">
                    <span
                      className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${
                        isPromoted
                          ? position === 1
                            ? 'bg-amber-100 text-amber-800 border border-amber-200'
                            : 'bg-emerald-50 text-emerald-800'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {position}
                    </span>
                  </td>

                  {/* Team Name and Logo */}
                  <td className="py-4 pl-2 font-semibold text-slate-800">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl ${team.logoColor} flex items-center justify-center text-white font-black text-base shadow-md shadow-slate-200 shrink-0`}>
                        <span className="drop-shadow-sm">{team.logoEmoji}</span>
                      </div>
                      <div>
                        <span className="text-sm sm:text-base font-bold text-slate-800">{team.name}</span>
                        <span className="block text-[10px] text-slate-400 font-mono tracking-wider sm:hidden">
                          {team.shortName}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Matches Played */}
                  <td className="py-4 text-center text-sm font-semibold text-slate-700">{team.played}</td>

                  {/* Won */}
                  <td className="py-4 text-center text-sm font-medium text-slate-700">{team.won}</td>

                  {/* Drawn */}
                  <td className="py-4 text-center text-sm font-medium text-slate-500 hidden md:table-cell">
                    {team.drawn}
                  </td>

                  {/* Lost */}
                  <td className="py-4 text-center text-sm font-medium text-slate-500 hidden md:table-cell">
                    {team.lost}
                  </td>

                  {/* Goals For */}
                  <td className="py-4 text-center text-sm font-mono text-slate-500 hidden sm:table-cell">
                    {team.goalsFor}
                  </td>

                  {/* Goals Against */}
                  <td className="py-4 text-center text-sm font-mono text-slate-500 hidden sm:table-cell">
                    {team.goalsAgainst}
                  </td>

                  {/* Goal Difference */}
                  <td className="py-4 text-center">
                    <span
                      className={`text-sm font-bold font-mono ${
                        goalDiff > 0 ? 'text-emerald-600' : goalDiff < 0 ? 'text-red-500' : 'text-slate-400'
                      }`}
                    >
                      {goalDiff > 0 ? `+${goalDiff}` : goalDiff}
                    </span>
                  </td>

                  {/* Points */}
                  <td className="py-4 text-center bg-slate-50/50 font-extrabold text-slate-900 text-base border-x border-slate-100/40">
                    {team.points}
                  </td>

                  {/* Form Icons */}
                  <td className="py-4 pr-6 hidden lg:table-cell text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      {form.length === 0 ? (
                        <span className="text-xs text-slate-300 italic">- Sin juegos -</span>
                      ) : (
                        form.map((result, rIdx) => (
                          <span
                            key={rIdx}
                            className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-black text-white ${
                              result === 'W'
                                ? 'bg-emerald-500 shadow-sm shadow-emerald-200'
                                : result === 'L'
                                ? 'bg-red-500 shadow-sm shadow-red-200'
                                : 'bg-slate-400'
                            }`}
                            title={result === 'W' ? 'Victoria' : result === 'L' ? 'Derrota' : 'Empate'}
                          >
                            {result === 'W' ? 'V' : result === 'L' ? 'D' : 'E'}
                          </span>
                        ))
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Rules Notice */}
      <div className="p-4 bg-slate-50 border-t border-slate-100 text-xs text-slate-500 flex items-start gap-2.5">
        <HelpCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Criterios de desempate:</strong> 1) Mayor puntaje obtenido, 2) Mayor diferencia de gol (DG), 3) Mayor número de goles a favor (GF), 4) Resultado del enfrentamiento directo, 5) Sorteo de la junta administrativa de la liga.
        </p>
      </div>
    </div>
  );
}
