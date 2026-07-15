import { Trophy, Calendar, Flame, Users, Info } from 'lucide-react';
import { LEAGUE_STATS } from '../data';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  const tabs = [
    { id: 'matches', label: 'Partidos y Calendario', icon: Calendar },
    { id: 'standings', label: 'Tabla de Posiciones', icon: Trophy },
    { id: 'stats', label: 'Estadísticas y Líderes', icon: Flame },
    { id: 'info', label: 'Reglamento y Sedes', icon: Info },
  ];

  return (
    <header id="league-header" className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
      {/* Decorative soccer grid overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
      
      {/* Top Bar with brand and badges */}
      <div className="relative z-10 px-6 py-8 md:px-10 md:py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/30">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
              En Progreso • Sede Campestre
            </span>
            <span className="text-xs text-slate-400 font-mono">ID: Gold-2026</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white flex items-center gap-3">
            <Trophy className="w-8 h-8 md:w-10 md:h-10 text-amber-400 shrink-0" />
            LIGA DE ORO
          </h1>
          <p className="text-slate-300 text-sm md:text-base mt-2 max-w-2xl font-light">
            Plataforma oficial del campeonato de fútbol amateur más competitivo de la región. Consulta resultados, próximos encuentros y estadísticas en tiempo real.
          </p>
        </div>

        {/* Business summary card */}
        <div className="bg-slate-900/60 backdrop-blur-md p-4 rounded-2xl border border-white/5 flex flex-col justify-between shrink-0 md:w-80">
          <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-2">Próxima Fecha</div>
          <div className="text-sm font-bold text-slate-100 flex items-center gap-2 mb-1">
            <Calendar className="w-4 h-4 text-emerald-400" />
            {LEAGUE_STATS.nextMatchdayDate}
          </div>
          <p className="text-xs text-slate-400">Jornada 4 • Partidos decisivos por el liderato.</p>
          <div className="mt-3 pt-3 border-t border-white/5 flex justify-between text-xs text-emerald-300 font-semibold hover:text-emerald-200 cursor-pointer" onClick={() => setActiveTab('matches')}>
            <span>Ver programación completa</span>
            <span>→</span>
          </div>
        </div>
      </div>

      {/* Quick stats grid */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 border-t border-slate-800/80 bg-slate-950/40">
        <div className="px-6 py-4 border-r border-slate-800/80 text-center sm:text-left">
          <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Equipos Inscritos</div>
          <div className="text-2xl font-black text-white mt-1 flex items-center justify-center sm:justify-start gap-1.5">
            <Users className="w-5 h-5 text-emerald-500" />
            {LEAGUE_STATS.totalTeams}
          </div>
        </div>
        <div className="px-6 py-4 border-r border-slate-800/80 text-center sm:text-left">
          <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Partidos Disputados</div>
          <div className="text-2xl font-black text-white mt-1">
            {LEAGUE_STATS.matchesPlayed} <span className="text-slate-500 text-sm">/ {LEAGUE_STATS.totalMatches}</span>
          </div>
        </div>
        <div className="px-6 py-4 border-r border-slate-800/80 text-center sm:text-left col-span-1">
          <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Goles Marcados</div>
          <div className="text-2xl font-black text-emerald-400 mt-1">
            {LEAGUE_STATS.totalGoals} <span className="text-slate-500 text-xs font-normal">({LEAGUE_STATS.averageGoals} por juego)</span>
          </div>
        </div>
        <div className="px-6 py-4 text-center sm:text-left col-span-1">
          <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Fair Play</div>
          <div className="text-2xl font-black text-amber-500 mt-1 flex items-center justify-center sm:justify-start gap-1">
            🟨 {LEAGUE_STATS.yellowCards} <span className="text-slate-500 text-sm">/</span> 🟥 {LEAGUE_STATS.redCards}
          </div>
        </div>
      </div>

      {/* Tab controls */}
      <div className="relative z-10 bg-slate-950 px-4 md:px-8 border-t border-slate-800">
        <nav className="flex overflow-x-auto space-x-2 md:space-x-4 scrollbar-none py-3">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                id={`tab-${tab.id}`}
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
