import { useState, FormEvent } from 'react';
import { Match, Team, MatchStats } from '../types';
import { TEAMS } from '../data';
import { ArrowLeft, MapPin, Calendar, UserCheck, ShieldAlert, Users, ListFilter, HelpCircle, Trophy } from 'lucide-react';

interface MatchDetailProps {
  match: Match;
  onBack: () => void;
}

export default function MatchDetail({ match, onBack }: MatchDetailProps) {
  const [activeSubTab, setActiveSubTab] = useState<'stats' | 'lineups' | 'timeline'>('stats');
  const [homePrediction, setHomePrediction] = useState('');
  const [awayPrediction, setAwayPrediction] = useState('');
  const [predictionSaved, setPredictionSaved] = useState(false);

  // Get team helpers
  const getTeam = (teamId: string): Team => {
    return TEAMS.find((t) => t.id === teamId) || {
      id: '',
      name: 'Equipo Desconocido',
      shortName: 'UNK',
      logoColor: 'bg-slate-300',
      logoEmoji: '❓',
      played: 0,
      won: 0,
      drawn: 0,
      lost: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      points: 0,
    };
  };

  const homeTeam = getTeam(match.homeTeamId);
  const awayTeam = getTeam(match.awayTeamId);
  const isPlayed = match.status === 'played';

  // Helper to render statistic bar
  const renderStatRow = (label: string, homeVal: number, awayVal: number, isPercent = false) => {
    const total = homeVal + awayVal;
    const homePercent = total === 0 ? 50 : Math.round((homeVal / total) * 100);
    const awayPercent = total === 0 ? 50 : 100 - homePercent;

    return (
      <div className="space-y-2 border-b border-slate-50 pb-4 last:border-0">
        <div className="flex justify-between text-xs sm:text-sm font-bold text-slate-700">
          <span className="font-mono text-base text-slate-800">{homeVal}{isPercent ? '%' : ''}</span>
          <span className="text-slate-500 font-medium">{label}</span>
          <span className="font-mono text-base text-slate-800">{awayVal}{isPercent ? '%' : ''}</span>
        </div>
        <div className="h-2.5 w-full bg-slate-100 rounded-full flex overflow-hidden">
          <div
            style={{ width: `${isPercent ? homeVal : homePercent}%` }}
            className={`h-full transition-all duration-500 ${homeTeam.logoColor}`}
          ></div>
          <div
            style={{ width: `${isPercent ? awayVal : awayPercent}%` }}
            className={`h-full transition-all duration-500 ${awayTeam.logoColor}`}
          ></div>
        </div>
      </div>
    );
  };

  const handleSavePrediction = (e: FormEvent) => {
    e.preventDefault();
    if (homePrediction !== '' && awayPrediction !== '') {
      setPredictionSaved(true);
    }
  };

  return (
    <div id="match-detail-container" className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
      {/* Top action bar */}
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-100 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a partidos
        </button>
        <span className="text-xs font-bold font-mono text-slate-400 bg-slate-50 px-3 py-1.5 rounded-lg">
          REF: #{match.id}
        </span>
      </div>

      {/* Main scoreboard banner */}
      <div className="relative bg-gradient-to-b from-slate-950 to-slate-900 text-white px-6 py-10 md:px-12 md:py-14 text-center border-b border-slate-800">
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        {/* Match Header metadata */}
        <div className="relative z-10 flex flex-col items-center gap-2 mb-8">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Jornada {match.round} • {isPlayed ? 'Resultado Oficial' : 'Programado'}
          </span>
          <div className="flex items-center gap-4 text-slate-300 text-xs mt-1 bg-white/5 px-4 py-1.5 rounded-xl">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-emerald-400" />
              {match.date} a las {match.time} HS
            </span>
            <span className="text-slate-600">|</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              {match.pitch}
            </span>
          </div>
        </div>

        {/* Score Board Flex Grid */}
        <div className="relative z-10 flex items-center justify-center gap-4 md:gap-10 max-w-3xl mx-auto">
          {/* Home Team Emblem & Title */}
          <div className="flex-1 flex flex-col items-center gap-3">
            <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl ${homeTeam.logoColor} flex items-center justify-center text-white text-3xl md:text-4xl font-bold shadow-lg shadow-black/30`}>
              {homeTeam.logoEmoji}
            </div>
            <span className="text-sm md:text-lg lg:text-xl font-extrabold tracking-tight">
              {homeTeam.name}
            </span>
            <span className="text-xs text-slate-400 uppercase font-mono font-bold tracking-wider">
              {homeTeam.shortName} • {homeTeam.points} PTS
            </span>
          </div>

          {/* Core Score/VS display */}
          <div className="shrink-0 flex flex-col items-center justify-center">
            {isPlayed ? (
              <div className="flex items-center gap-2 md:gap-4 bg-white/5 px-6 py-4 rounded-3xl border border-white/10 shadow-inner">
                <span className="text-4xl md:text-6xl font-black tracking-tighter text-white drop-shadow-md">
                  {match.homeScore}
                </span>
                <span className="text-slate-500 text-2xl font-light">-</span>
                <span className="text-4xl md:text-6xl font-black tracking-tighter text-white drop-shadow-md">
                  {match.awayScore}
                </span>
              </div>
            ) : (
              <div className="px-6 py-4 bg-emerald-600 rounded-2xl font-black text-sm tracking-widest text-white shadow-lg shadow-emerald-900/50">
                VS
              </div>
            )}
            <div className="mt-3 flex items-center gap-1 text-[10px] text-slate-400 font-medium">
              <UserCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Árbitro: {match.referee}</span>
            </div>
          </div>

          {/* Away Team Emblem & Title */}
          <div className="flex-1 flex flex-col items-center gap-3">
            <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl ${awayTeam.logoColor} flex items-center justify-center text-white text-3xl md:text-4xl font-bold shadow-lg shadow-black/30`}>
              {awayTeam.logoEmoji}
            </div>
            <span className="text-sm md:text-lg lg:text-xl font-extrabold tracking-tight">
              {awayTeam.name}
            </span>
            <span className="text-xs text-slate-400 uppercase font-mono font-bold tracking-wider">
              {awayTeam.shortName} • {awayTeam.points} PTS
            </span>
          </div>
        </div>
      </div>

      {/* Conditional Rendering: Played vs Scheduled */}
      {isPlayed ? (
        <div>
          {/* Sub Navigation Tabs */}
          <div className="bg-slate-50 border-b border-slate-100 flex justify-center">
            <div className="flex gap-2 p-2">
              <button
                onClick={() => setActiveSubTab('stats')}
                className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeSubTab === 'stats' ? 'bg-white text-slate-900 shadow-md border border-slate-100' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Estadísticas
              </button>
              <button
                onClick={() => setActiveSubTab('lineups')}
                className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeSubTab === 'lineups' ? 'bg-white text-slate-900 shadow-md border border-slate-100' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Alineaciones
              </button>
              <button
                onClick={() => setActiveSubTab('timeline')}
                className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeSubTab === 'timeline' ? 'bg-white text-slate-900 shadow-md border border-slate-100' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Línea de Tiempo
              </button>
            </div>
          </div>

          {/* Sub Tab Content */}
          <div className="p-6 md:p-8">
            {/* STATS TAB */}
            {activeSubTab === 'stats' && match.stats && (
              <div className="max-w-2xl mx-auto space-y-6">
                <h3 className="text-lg font-bold text-slate-800 mb-4 text-center">Ficha Técnica Comparativa</h3>
                {renderStatRow('Posesión de Balón', match.stats.possession[0], match.stats.possession[1], true)}
                {renderStatRow('Remates Totales', match.stats.shots[0], match.stats.shots[1])}
                {renderStatRow('Remates al Arco', match.stats.shotsOnTarget[0], match.stats.shotsOnTarget[1])}
                {renderStatRow('Faltas Cometidas', match.stats.fouls[0], match.stats.fouls[1])}
                {renderStatRow('Tiros de Esquina', match.stats.corners[0], match.stats.corners[1])}
                {renderStatRow('Tarjetas Amarillas', match.stats.yellowCards[0], match.stats.yellowCards[1])}
                {renderStatRow('Tarjetas Rojas', match.stats.redCards[0], match.stats.redCards[1])}
              </div>
            )}

            {/* LINEUPS TAB */}
            {activeSubTab === 'lineups' && match.lineups && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Home Lineup */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <h4 className="font-black text-slate-800 flex items-center gap-2">
                      <span className={`w-3 h-3 rounded ${homeTeam.logoColor}`}></span>
                      {homeTeam.name}
                    </h4>
                    <span className="text-xs font-mono font-bold bg-slate-100 px-2 py-1 rounded text-slate-600">
                      Formación: {match.lineups.home.formation}
                    </span>
                  </div>
                  
                  {/* Starters */}
                  <div>
                    <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Titulares</h5>
                    <div className="space-y-1.5">
                      {match.lineups.home.starting.map((p) => (
                        <div key={p.id} className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 border border-slate-100/50">
                          <div className="flex items-center gap-3">
                            <span className="w-6 text-xs font-black font-mono text-slate-400">{p.number}</span>
                            <span className="text-sm font-bold text-slate-700">{p.name}</span>
                          </div>
                          <span className="text-xs px-2 py-0.5 font-bold uppercase rounded bg-slate-100 text-slate-500 font-mono">
                            {p.position}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Subs */}
                  {match.lineups.home.subs.length > 0 && (
                    <div className="pt-2">
                      <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Suplentes</h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {match.lineups.home.subs.map((p) => (
                          <div key={p.id} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 text-xs">
                            <span className="font-bold text-slate-600 font-mono">#{p.number} {p.name}</span>
                            <span className="text-slate-400 uppercase font-mono">{p.position}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Away Lineup */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <h4 className="font-black text-slate-800 flex items-center gap-2">
                      <span className={`w-3 h-3 rounded ${awayTeam.logoColor}`}></span>
                      {awayTeam.name}
                    </h4>
                    <span className="text-xs font-mono font-bold bg-slate-100 px-2 py-1 rounded text-slate-600">
                      Formación: {match.lineups.away.formation}
                    </span>
                  </div>

                  {/* Starters */}
                  <div>
                    <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Titulares</h5>
                    <div className="space-y-1.5">
                      {match.lineups.away.starting.map((p) => (
                        <div key={p.id} className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 border border-slate-100/50">
                          <div className="flex items-center gap-3">
                            <span className="w-6 text-xs font-black font-mono text-slate-400">{p.number}</span>
                            <span className="text-sm font-bold text-slate-700">{p.name}</span>
                          </div>
                          <span className="text-xs px-2 py-0.5 font-bold uppercase rounded bg-slate-100 text-slate-500 font-mono">
                            {p.position}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Subs */}
                  {match.lineups.away.subs.length > 0 && (
                    <div className="pt-2">
                      <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Suplentes</h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {match.lineups.away.subs.map((p) => (
                          <div key={p.id} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 text-xs">
                            <span className="font-bold text-slate-600 font-mono">#{p.number} {p.name}</span>
                            <span className="text-slate-400 uppercase font-mono">{p.position}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TIMELINE TAB */}
            {activeSubTab === 'timeline' && match.events && (
              <div className="max-w-xl mx-auto">
                <h3 className="text-lg font-bold text-slate-800 mb-6 text-center">Incidencias del Encuentro</h3>
                <div className="relative border-l-2 border-slate-100 pl-6 space-y-6">
                  {match.events.map((event) => {
                    const isHomeEvent = event.team === 'home';
                    const eventTeam = isHomeEvent ? homeTeam : awayTeam;

                    return (
                      <div id={`event-${event.id}`} key={event.id} className="relative group">
                        {/* Circle marker containing the type icon */}
                        <span className="absolute -left-11 top-0.5 w-8 h-8 rounded-full border-4 border-white bg-slate-100 flex items-center justify-center text-sm shadow-md group-hover:scale-110 transition-all">
                          {event.type === 'goal' && '⚽'}
                          {event.type === 'yellow_card' && '🟨'}
                          {event.type === 'red_card' && '🟥'}
                          {event.type === 'substitution' && '🔄'}
                        </span>

                        <div className="bg-slate-50 group-hover:bg-slate-100/70 border border-slate-100 rounded-2xl p-4 transition-all">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-base font-black text-emerald-600">
                                {event.minute}'
                              </span>
                              <span className="text-xs font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-white text-slate-600 border border-slate-150">
                                {event.type === 'goal' && '¡GOL!'}
                                {event.type === 'yellow_card' && 'Amonestación'}
                                {event.type === 'red_card' && 'Expulsión'}
                                {event.type === 'substitution' && 'Cambio'}
                              </span>
                            </div>
                            <span className="text-xs font-bold text-slate-400">
                              {eventTeam.name}
                            </span>
                          </div>
                          <p className="text-sm font-bold text-slate-800">{event.player}</p>
                          <p className="text-xs text-slate-500 mt-1">{event.detail}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* SCHEDULED MATCH CENTER: Countdown & Predictor */
        <div className="p-8 max-w-2xl mx-auto space-y-8">
          {/* Historical Form Comparison */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-center">
            <h4 className="text-sm font-black text-slate-700 uppercase tracking-wider mb-4">Comparativa de Posición</h4>
            <div className="grid grid-cols-3 gap-4 items-center">
              <div>
                <div className="text-2xl font-black text-slate-800">{homeTeam.points}</div>
                <div className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Puntos</div>
                <div className="text-xs text-slate-400 mt-1">DG: {homeTeam.goalsFor - homeTeam.goalsAgainst}</div>
              </div>
              <div className="flex flex-col items-center">
                <Trophy className="w-6 h-6 text-amber-500" />
                <span className="text-[10px] text-slate-400 font-mono mt-1">HISTÓRICO</span>
              </div>
              <div>
                <div className="text-2xl font-black text-slate-800">{awayTeam.points}</div>
                <div className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Puntos</div>
                <div className="text-xs text-slate-400 mt-1">DG: {awayTeam.goalsFor - awayTeam.goalsAgainst}</div>
              </div>
            </div>
          </div>

          {/* Predictor Panel */}
          <div className="bg-gradient-to-br from-emerald-950 to-slate-900 text-white p-6 rounded-3xl shadow-xl border border-emerald-500/10 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none"></div>
            
            <div className="relative z-10 text-center space-y-4">
              <div className="inline-flex items-center gap-1 bg-emerald-500/15 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold border border-emerald-500/20">
                ⭐ Polla de Hinchas
              </div>
              <h4 className="text-lg font-bold">¿Quién ganará este encuentro?</h4>
              <p className="text-xs text-slate-300 max-w-sm mx-auto">
                Ingresa tu pronóstico y sé parte de la tabla de predicciones del torneo.
              </p>

              {predictionSaved ? (
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 max-w-md mx-auto space-y-2">
                  <p className="text-xs text-emerald-400 font-bold">¡Tu predicción ha sido registrada exitosamente!</p>
                  <p className="text-sm font-black">
                    {homeTeam.name} <span className="text-emerald-400 font-mono text-lg">{homePrediction}</span> - <span className="text-emerald-400 font-mono text-lg">{awayPrediction}</span> {awayTeam.name}
                  </p>
                  <button
                    onClick={() => setPredictionSaved(false)}
                    className="text-[10px] text-slate-400 hover:text-white underline cursor-pointer mt-1"
                  >
                    Modificar predicción
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSavePrediction} className="max-w-xs mx-auto flex items-center justify-center gap-3">
                  <div className="flex flex-col items-center gap-1 flex-1">
                    <span className="text-[11px] text-slate-400 font-bold truncate max-w-[80px]">{homeTeam.shortName}</span>
                    <input
                      id="home-prediction-input"
                      type="number"
                      min="0"
                      max="15"
                      required
                      placeholder="0"
                      value={homePrediction}
                      onChange={(e) => setHomePrediction(e.target.value)}
                      className="w-14 h-12 rounded-xl bg-slate-950/80 border border-slate-700/80 text-center font-black font-mono text-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white"
                    />
                  </div>
                  <span className="text-slate-500 font-bold text-lg mt-5">-</span>
                  <div className="flex flex-col items-center gap-1 flex-1">
                    <span className="text-[11px] text-slate-400 font-bold truncate max-w-[80px]">{awayTeam.shortName}</span>
                    <input
                      id="away-prediction-input"
                      type="number"
                      min="0"
                      max="15"
                      required
                      placeholder="0"
                      value={awayPrediction}
                      onChange={(e) => setAwayPrediction(e.target.value)}
                      className="w-14 h-12 rounded-xl bg-slate-950/80 border border-slate-700/80 text-center font-black font-mono text-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white"
                    />
                  </div>
                  <button
                    type="submit"
                    className="self-end h-12 px-4 bg-emerald-600 hover:bg-emerald-500 transition-all text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-950/80 cursor-pointer"
                  >
                    Votar
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
