import { useState } from 'react';
import { MATCHES, TEAMS } from '../data';
import { Match, Team } from '../types';
import { Calendar, MapPin, Search, ChevronRight, Filter, UserCheck, ShieldAlert } from 'lucide-react';

interface MatchListProps {
  onSelectMatch: (match: Match) => void;
  selectedTeamId?: string;
  setSelectedTeamId?: (id: string | undefined) => void;
}

export default function MatchList({ onSelectMatch, selectedTeamId, setSelectedTeamId }: MatchListProps) {
  const [selectedRound, setSelectedRound] = useState<number | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'played' | 'scheduled'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Get unique rounds
  const rounds = Array.from(new Set(MATCHES.map((m) => m.round))).sort((a, b) => a - b);

  // Helper to get team details
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

  // Filtered matches
  const filteredMatches = MATCHES.filter((match) => {
    // Round filter
    if (selectedRound !== 'all' && match.round !== selectedRound) {
      return false;
    }
    // Status filter
    if (statusFilter === 'played' && match.status !== 'played') {
      return false;
    }
    if (statusFilter === 'scheduled' && match.status !== 'scheduled') {
      return false;
    }
    // Team filter
    if (selectedTeamId && match.homeTeamId !== selectedTeamId && match.awayTeamId !== selectedTeamId) {
      return false;
    }
    // Search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      const home = getTeam(match.homeTeamId).name.toLowerCase();
      const away = getTeam(match.awayTeamId).name.toLowerCase();
      const pitch = match.pitch.toLowerCase();
      const referee = match.referee.toLowerCase();
      return home.includes(query) || away.includes(query) || pitch.includes(query) || referee.includes(query);
    }
    return true;
  }).sort((a, b) => {
    // Played first, then date descending for played, date ascending for scheduled
    if (a.status !== b.status) {
      return a.status === 'played' ? -1 : 1;
    }
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div id="match-list-section" className="space-y-6">
      {/* Search and Filters panel */}
      <div className="bg-white p-6 rounded-3xl shadow-xl border border-slate-100 flex flex-col gap-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
            <input
              id="search-match"
              type="text"
              placeholder="Buscar por equipo, cancha o árbitro..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-800 placeholder-slate-400"
            />
          </div>
          
          {/* Quick status tabs */}
          <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200/50 shrink-0 self-start lg:self-auto">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all ${
                statusFilter === 'all'
                  ? 'bg-white text-slate-900 shadow-md'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setStatusFilter('played')}
              className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all ${
                statusFilter === 'played'
                  ? 'bg-white text-slate-900 shadow-md'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Resultados
            </button>
            <button
              onClick={() => setStatusFilter('scheduled')}
              className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all ${
                statusFilter === 'scheduled'
                  ? 'bg-white text-slate-900 shadow-md'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Calendario
            </button>
          </div>
        </div>

        {/* Detailed drop downs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
          {/* Round Filter */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Jornada / Fecha</label>
            <select
              id="select-round"
              value={selectedRound}
              onChange={(e) => setSelectedRound(e.target.value === 'all' ? 'all' : Number(e.target.value))}
              className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 text-slate-700 font-medium"
            >
              <option value="all">Todas las jornadas</option>
              {rounds.map((r) => (
                <option key={r} value={r}>
                  Jornada {r}
                </option>
              ))}
            </select>
          </div>

          {/* Team Filter */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Filtrar por Equipo</label>
            <select
              id="select-team"
              value={selectedTeamId || 'all'}
              onChange={(e) => setSelectedTeamId && setSelectedTeamId(e.target.value === 'all' ? undefined : e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 text-slate-700 font-medium"
            >
              <option value="all">Todos los equipos</option>
              {TEAMS.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.logoEmoji} {t.name}
                </option>
              ))}
            </select>
          </div>

          {/* Reset Filters button */}
          <div className="flex items-end">
            {(selectedRound !== 'all' || selectedTeamId || statusFilter !== 'all' || searchQuery !== '') && (
              <button
                onClick={() => {
                  setSelectedRound('all');
                  setStatusFilter('all');
                  setSelectedTeamId && setSelectedTeamId(undefined);
                  setSearchQuery('');
                }}
                className="w-full text-center py-2.5 px-4 bg-slate-100 hover:bg-slate-200 transition text-slate-600 rounded-xl text-sm font-bold flex items-center justify-center gap-1.5"
              >
                Limpiar filtros
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Matches Grid List */}
      <div className="space-y-4">
        {filteredMatches.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl shadow-md border border-slate-100 text-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
              <ShieldAlert className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">No se encontraron encuentros</h3>
            <p className="text-slate-400 text-sm mt-1 max-w-sm mx-auto">
              Prueba modificando tus filtros o ingresando otro término de búsqueda.
            </p>
          </div>
        ) : (
          filteredMatches.map((match) => {
            const homeTeam = getTeam(match.homeTeamId);
            const awayTeam = getTeam(match.awayTeamId);
            const isPlayed = match.status === 'played';

            return (
              <div
                id={`match-card-${match.id}`}
                key={match.id}
                onClick={() => onSelectMatch(match)}
                className={`group bg-white rounded-2xl shadow-sm border border-slate-100/80 p-5 md:p-6 transition-all duration-300 cursor-pointer hover:shadow-xl hover:border-emerald-100 hover:scale-[1.005] relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 ${
                  isPlayed ? 'border-l-4 border-l-emerald-500' : 'border-l-4 border-l-amber-500'
                }`}
              >
                {/* Match Information Flag */}
                <div className="flex items-center gap-2 md:flex-col md:items-start md:gap-1 shrink-0 md:w-36">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-600">
                    Jornada {match.round}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{match.date}</span>
                  </div>
                  <div className="text-xs font-mono font-bold text-slate-600">
                    {match.time} HS
                  </div>
                </div>

                {/* Score / Teams Grid */}
                <div className="flex-1 flex items-center justify-between gap-4 max-w-lg mx-auto w-full">
                  {/* Home Team */}
                  <div className="flex-1 flex flex-col items-center sm:flex-row sm:justify-end gap-3 text-center sm:text-right">
                    <span className="text-sm md:text-base font-extrabold text-slate-800 order-2 sm:order-1">
                      {homeTeam.name}
                    </span>
                    <div className={`w-10 h-10 rounded-xl ${homeTeam.logoColor} flex items-center justify-center text-white text-lg font-bold shadow-md shadow-slate-100 shrink-0 order-1 sm:order-2`}>
                      {homeTeam.logoEmoji}
                    </div>
                  </div>

                  {/* Versus / Score Indicator */}
                  <div className="shrink-0 flex flex-col items-center px-4 py-2 bg-slate-50 rounded-2xl border border-slate-100 min-w-[70px] sm:min-w-[90px] justify-center">
                    {isPlayed ? (
                      <div className="flex items-center gap-1">
                        <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                          {match.homeScore}
                        </span>
                        <span className="text-slate-300 font-light">-</span>
                        <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                          {match.awayScore}
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs sm:text-sm font-black text-slate-400 tracking-wider">VS</span>
                    )}
                    <span className={`text-[9px] font-bold uppercase mt-0.5 tracking-wider ${
                      isPlayed ? 'text-emerald-600' : 'text-amber-600'
                    }`}>
                      {isPlayed ? 'Finalizado' : 'Por Jugar'}
                    </span>
                  </div>

                  {/* Away Team */}
                  <div className="flex-1 flex flex-col items-center sm:flex-row sm:justify-start gap-3 text-center sm:text-left">
                    <div className={`w-10 h-10 rounded-xl ${awayTeam.logoColor} flex items-center justify-center text-white text-lg font-bold shadow-md shadow-slate-100 shrink-0`}>
                      {awayTeam.logoEmoji}
                    </div>
                    <span className="text-sm md:text-base font-extrabold text-slate-800">
                      {awayTeam.name}
                    </span>
                  </div>
                </div>

                {/* Match Venue / Action Button */}
                <div className="flex flex-col sm:flex-row md:flex-col sm:items-center md:items-end justify-between md:justify-center gap-4 shrink-0 md:w-52 border-t md:border-t-0 border-slate-100 pt-3 md:pt-0">
                  <div className="space-y-1 text-left sm:text-left md:text-right">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium md:justify-end">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span className="truncate max-w-[200px]">{match.pitch}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-slate-400 md:justify-end">
                      <UserCheck className="w-3 h-3" />
                      <span>Árbitro: {match.referee}</span>
                    </div>
                  </div>

                  {isPlayed ? (
                    <span className="text-xs font-bold text-emerald-600 group-hover:text-emerald-500 flex items-center gap-1 group-hover:translate-x-1 transition-all">
                      Estadísticas
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-slate-400 group-hover:text-slate-500">
                      Ver Ficha
                    </span>
                  )}
                </div>
              </div>
            );
          }))}
      </div>
    </div>
  );
}
