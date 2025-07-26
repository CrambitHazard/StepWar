// User-related types
export interface User {
  id: string;
  name: string;
  avatar: string;
  level: number;
  xp: number;
  totalSteps: number;
  todaySteps: number;
  email?: string;
  createdAt: Date;
  lastActive: Date;
}

// League-related types
export interface League {
  id: string;
  name: string;
  description?: string;
  members: number;
  isPublic: boolean;
  createdAt: Date;
  leaderboard: LeagueEntry[];
  maxMembers?: number;
  location?: string;
}

export interface LeagueEntry {
  user: User;
  steps: number;
  rank: number;
  joinedAt: Date;
}

// Battle-related types
export interface Battle {
  id: string;
  title?: string;
  opponent: User;
  mySteps: number;
  opponentSteps: number;
  status: 'active' | 'won' | 'lost' | 'pending';
  timeLeft: string;
  startTime: Date;
  endTime: Date;
  duration: number; // in hours
  type: '1v1' | 'team';
}

// Challenge-related types
export interface Challenge {
  id: string;
  title: string;
  description?: string;
  type: 'steps' | 'calories' | 'distance' | 'time' | 'battles';
  target: number;
  current: number;
  deadline: Date;
  isCompleted: boolean;
  reward?: {
    xp: number;
    title?: string;
    badge?: string;
  };
}

// Theme types
export type Theme = 'black-neon' | 'glassmorphism' | 'light';

// Navigation types
export type TabId = 'home' | 'leagues' | 'battles' | 'challenges' | 'profile';

// Step tracking types
export interface StepData {
  date: string;
  steps: number;
  goal: number;
  calories?: number;
  distance?: number;
}

export interface WeeklySteps {
  [key: string]: StepData;
}

// Firebase types
export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

// App state types
export interface AppState {
  user: User | null;
  theme: Theme;
  activeTab: TabId;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Form types
export interface CreateLeagueForm {
  name: string;
  description?: string;
  isPublic: boolean;
  maxMembers?: number;
}

export interface CreateBattleForm {
  opponentId: string;
  duration: number;
  title?: string;
}

export interface CreateChallengeForm {
  title: string;
  description?: string;
  type: Challenge['type'];
  target: number;
  deadline: Date;
}

// Settings types
export interface UserSettings {
  notifications: boolean;
  autoSync: boolean;
  privacyMode: boolean;
  theme: Theme;
  language: string;
  units: 'metric' | 'imperial';
} 