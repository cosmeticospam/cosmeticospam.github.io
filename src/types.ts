export type PlayerPosition = 'POR' | 'DEF' | 'MED' | 'DEL'; // Portero, Defensa, Mediocampista, Delantero

export interface Player {
  id: string;
  name: string;
  number: number;
  position: PlayerPosition;
  goals?: number;
  assists?: number;
}

export interface Team {
  id: string;
  name: string;
  shortName: string;
  logoColor: string; // Tailwind bg color class for dynamic crest representation
  logoEmoji: string; // Emoji representing team identity
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
}

export interface MatchStats {
  possession: [number, number]; // [Home, Away] in %
  shots: [number, number];
  shotsOnTarget: [number, number];
  fouls: [number, number];
  corners: [number, number];
  yellowCards: [number, number];
  redCards: [number, number];
}

export interface MatchLineup {
  home: {
    starting: Player[];
    subs: Player[];
    formation: string; // e.g. "4-4-2"
  };
  away: {
    starting: Player[];
    subs: Player[];
    formation: string;
  };
}

export interface MatchEvent {
  id: string;
  minute: number;
  type: 'goal' | 'yellow_card' | 'red_card' | 'substitution';
  team: 'home' | 'away';
  player: string;
  detail: string; // Player out (for sub), assist (for goal), etc.
}

export interface Match {
  id: string;
  homeTeamId: string;
  awayTeamId: string;
  homeScore?: number; // undefined if not played
  awayScore?: number; // undefined if not played
  status: 'played' | 'scheduled';
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  pitch: string; // Cancha e.g. "Cancha 1 - Sede Norte"
  referee: string;
  stats?: MatchStats;
  lineups?: MatchLineup;
  events?: MatchEvent[];
  round: number; // Jornada/Fecha
}

export interface TopScorer {
  name: string;
  teamName: string;
  goals: number;
}

export interface TopAssist {
  name: string;
  teamName: string;
  assists: number;
}
