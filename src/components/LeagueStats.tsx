import { TOP_SCORERS, TOP_ASSISTS, TEAMS } from '../data';
import { Trophy, Award, ShieldAlert, Heart, Calendar, Zap, AlertCircle } from 'lucide-react';

export default function LeagueStats() {
  // Sort teams for Fair Play: yellow cards = 1 pt, red cards = 3 pts. Fewer points is better.
  // We can simulate fair play values for teams based on cards
  const fairPlayTeams = TEAMS.map((team, index) => {
    // Generate slight simulated card values for realism
    const yellow = 2 + (index % 3) * 2 + (index % 2);
    const red = index === 4 || index === 0 ? 1 : 0;
    const score = yellow * 1 + red * 3;
    return {
      ...team,
      yellow,
      red,
      score,
    };
  }).sort((a, b) => a.score - b.score);

  return (
    <div id="league-stats-section" className="space-y-8">
      {/* Top Players grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Top Scorers Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-amber-500/10 to-amber-600/5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                Tabla de Goleadores
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Máximos anotadores del Torneo Apertura</p>
            </div>
            <span className="text-xs font-black px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 font-mono">
              BOTA DE ORO
            </span>
          </div>

          <div className="p-4 sm:p-6 divide-y divide-slate-100">
            {TOP_SCORERS.map((player, index) => (
              <div key={index} className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0 group">
                <div className="flex items-center gap-4">
                  <span className={`w-6 text-center font-mono font-black text-sm ${
                    index === 0 ? 'text-amber-500 text-lg' : index === 1 ? 'text-slate-400' : 'text-slate-300'
                  }`}>
                    {index + 1}
                  </span>
                  <div>
                    <h4 className="text-sm sm:text-base font-extrabold text-slate-800 group-hover:text-amber-600 transition-colors">
                      {player.name}
                    </h4>
                    <span className="text-xs text-slate-400 font-medium">{player.teamName}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg sm:text-xl font-black font-mono text-slate-800">{player.goals}</span>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">goles</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Assist Leaders Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-emerald-500/10 to-emerald-600/5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-500" />
                Líderes de Asistencias
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Asistidores clave de cada anotación</p>
            </div>
            <span className="text-xs font-black px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-mono">
              CREADORES
            </span>
          </div>

          <div className="p-4 sm:p-6 divide-y divide-slate-100">
            {TOP_ASSISTS.map((player, index) => (
              <div key={index} className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0 group">
                <div className="flex items-center gap-4">
                  <span className={`w-6 text-center font-mono font-black text-sm ${
                    index === 0 ? 'text-emerald-500 text-lg' : index === 1 ? 'text-slate-400' : 'text-slate-300'
                  }`}>
                    {index + 1}
                  </span>
                  <div>
                    <h4 className="text-sm sm:text-base font-extrabold text-slate-800 group-hover:text-emerald-600 transition-colors">
                      {player.name}
                    </h4>
                    <span className="text-xs text-slate-400 font-medium">{player.teamName}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg sm:text-xl font-black font-mono text-slate-800">{player.assists}</span>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">asist</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fair Play & Discipline Index */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500 fill-red-500" />
              Tabla de Juego Limpio (Fair Play)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Clasificación por amonestaciones y disciplina en la cancha</p>
          </div>
          <div className="text-xs font-medium text-slate-400 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
            Fórmula: Amarilla (1 pt) | Roja (3 pts). Menor puntuación es mejor.
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 pl-6 text-center w-12">Pos</th>
                <th className="py-3.5 pl-2">Equipo</th>
                <th className="py-3.5 text-center w-24">🟨 Amarillas</th>
                <th className="py-3.5 text-center w-24">🟥 Rojas</th>
                <th className="py-3.5 text-center w-28 bg-slate-100/30 font-black text-slate-700">Puntaje Fair Play</th>
              </tr>
            </thead>
            <tbody>
              {fairPlayTeams.map((team, index) => {
                const position = index + 1;
                return (
                  <tr key={team.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition duration-150">
                    <td className="py-3.5 pl-6 text-center">
                      <span className="text-xs font-bold font-mono text-slate-500">{position}</span>
                    </td>
                    <td className="py-3.5 pl-2">
                      <div className="flex items-center gap-2.5">
                        <span className="text-lg">{team.logoEmoji}</span>
                        <span className="text-sm font-bold text-slate-700">{team.name}</span>
                      </div>
                    </td>
                    <td className="py-3.5 text-center font-mono font-bold text-slate-600">{team.yellow}</td>
                    <td className="py-3.5 text-center font-mono font-bold text-slate-600">{team.red}</td>
                    <td className="py-3.5 text-center bg-slate-50/30 font-mono font-black text-sm text-slate-800">
                      {team.score} PTS
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
