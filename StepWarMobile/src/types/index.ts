export interface User {
  id: string;
  name: string;
  avatar: string;
  steps: number;
  calories: number;
  distance: number;
  rank: number;
}

export interface League {
  id: string;
  name: string;
  members: number;
  isPublic: boolean;
  joinCode: string;
  leaderboard: {
    user: User;
    steps: number;
  }[];
}

export interface Battle {
  id: string;
  opponent: User;
  mySteps: number;
  opponentSteps: number;
  timeLeft: string;
  status: 'active' | 'completed' | 'pending';
}

export interface Challenge {
  id: string;
  title: string;
  type: 'steps' | 'calories' | 'distance' | 'time' | 'battles';
  target: number;
  current: number;
  deadline: string;
  status: 'active' | 'completed' | 'failed';
}

export interface Settings {
  notificationsEnabled: boolean;
  autoSyncEnabled: boolean;
  privacyModeEnabled: boolean;
}

export type Theme = 'black-neon' | 'glassmorphism' | 'light';

export interface ThemeConfig {
  background: string;
  cardBg: string;
  text: string;
  accent: string;
  button: string;
  nav: string;
  glow: string;
} 