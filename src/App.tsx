/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Header from './components/Header';
import StandingsTable from './components/StandingsTable';
import MatchList from './components/MatchList';
import MatchDetail from './components/MatchDetail';
import LeagueStats from './components/LeagueStats';
import LeagueInfo from './components/LeagueInfo';
import { Match } from './types';
import { ShieldCheck, ArrowRight, HelpCircle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('matches');
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [selectedTeamId, setSelectedTeamId] = useState<string | undefined>(undefined);

  // Handle selecting a team from the standings table
  const handleSelectTeam = (teamId: string) => {
    setSelectedTeamId(teamId);
    setSelectedMatch(null); // Close any active match center
    setActiveTab('matches'); // Switch to matches view
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 font-sans antialiased pb-20">
      {/* Top micro-notification bar */}
      <div className="bg-slate-900 text-white/90 text-center py-2 px-4 text-xs font-medium border-b border-white/5 flex items-center justify-center gap-2">
        <ShieldCheck className="w-4 h-4 text-emerald-400" />
        <span>Inscripciones abiertas para la nueva temporada. ¡Cupos limitados!</span>
        <button 
          onClick={() => {
            setActiveTab('info');
            setSelectedMatch(null);
          }}
          className="text-emerald-400 font-bold hover:underline ml-1 inline-flex items-center gap-0.5"
        >
          Ver costos e inscribirse <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* Main Container */}
      <main className="w-full max-w-6xl mx-auto px-4 md:px-6 pt-6 md:pt-10 space-y-8">
        {/* Header Navigation Section */}
        <Header 
          activeTab={selectedMatch ? 'matches' : activeTab} 
          setActiveTab={(tab) => {
            setActiveTab(tab);
            setSelectedMatch(null); // Clear selected match detail when changing main tab
          }} 
        />

        {/* Dynamic Screen Mounting */}
        <div className="transition-all duration-300">
          {selectedMatch ? (
            <MatchDetail 
              match={selectedMatch} 
              onBack={() => setSelectedMatch(null)} 
            />
          ) : (
            <>
              {activeTab === 'matches' && (
                <MatchList 
                  onSelectMatch={(match) => setSelectedMatch(match)}
                  selectedTeamId={selectedTeamId}
                  setSelectedTeamId={setSelectedTeamId}
                />
              )}

              {activeTab === 'standings' && (
                <StandingsTable 
                  onSelectTeam={handleSelectTeam} 
                />
              )}

              {activeTab === 'stats' && (
                <LeagueStats />
              )}

              {activeTab === 'info' && (
                <LeagueInfo />
              )}
            </>
          )}
        </div>
      </main>

      {/* Footer Design */}
      <footer className="w-full max-w-6xl mx-auto px-4 md:px-6 mt-16 pt-8 border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="font-black text-slate-600 tracking-wider">LIGA DE ORO © 2026</span>
          <span>•</span>
          <span>Plataforma oficial para la gestión de campeonatos.</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="#league-header" className="hover:text-slate-600 transition">Inicio</a>
          <span>|</span>
          <button onClick={() => { setActiveTab('info'); setSelectedMatch(null); }} className="hover:text-slate-600 transition">Reglamento</button>
          <span>|</span>
          <a href="mailto:soporte@ligadeorofutbol.com" className="hover:text-slate-600 transition">Soporte Técnico</a>
        </div>
      </footer>
    </div>
  );
}
