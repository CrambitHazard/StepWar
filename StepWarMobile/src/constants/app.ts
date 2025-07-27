import { User, League, Battle, Challenge } from '../types';

// Mock data for development
export const mockUser: User = {
  id: '1',
  name: 'Alex Runner',
  avatar: '🏃‍♂️',
  steps: 12450,
  calories: 320,
  distance: 8.2,
  rank: 3,
};

export const mockLeagues: League[] = [
  {
    id: '1',
    name: 'Morning Warriors',
    members: 24,
    isPublic: true,
    joinCode: 'MW2024',
    leaderboard: [
      { user: { id: '2', name: 'Sarah Swift', avatar: '🏃‍♀️', steps: 15600, calories: 400, distance: 10.5, rank: 1 }, steps: 15600 },
      { user: { id: '3', name: 'Mike Fast', avatar: '⚡', steps: 14200, calories: 365, distance: 9.8, rank: 2 }, steps: 14200 },
      { user: mockUser, steps: 12450 },
    ],
  },
  {
    id: '2',
    name: 'Night Owls',
    members: 18,
    isPublic: false,
    joinCode: 'NO2024',
    leaderboard: [
      { user: mockUser, steps: 12450 },
      { user: { id: '4', name: 'Emma Night', avatar: '🦉', steps: 11800, calories: 300, distance: 7.9, rank: 2 }, steps: 11800 },
    ],
  },
];

export const mockBattles: Battle[] = [
  {
    id: '1',
    opponent: { id: '5', name: 'John Fighter', avatar: '🥊', steps: 8900, calories: 230, distance: 6.1, rank: 4 },
    mySteps: 12450,
    opponentSteps: 8900,
    timeLeft: '2h 15m',
    status: 'active',
  },
  {
    id: '2',
    opponent: { id: '6', name: 'Lisa Speed', avatar: '💨', steps: 13200, calories: 340, distance: 9.0, rank: 5 },
    mySteps: 12450,
    opponentSteps: 13200,
    timeLeft: '5h 30m',
    status: 'active',
  },
];

export const mockChallenges: Challenge[] = [
  {
    id: '1',
    title: '10K Steps Challenge',
    type: 'steps',
    target: 10000,
    current: 12450,
    deadline: '2024-12-31',
    status: 'active',
  },
  {
    id: '2',
    title: '5K Distance Goal',
    type: 'distance',
    target: 5000,
    current: 8200,
    deadline: '2024-12-25',
    status: 'active',
  },
  {
    id: '3',
    title: 'Daily Battle Master',
    type: 'battles',
    target: 5,
    current: 2,
    deadline: '2024-12-20',
    status: 'active',
  },
];

// App constants
export const APP_NAME = 'StepWar';
export const STORAGE_KEYS = {
  USER: 'stepwar_user',
  THEME: 'stepwar_theme',
  SETTINGS: 'stepwar_settings',
  LEAGUES: 'stepwar_leagues',
  BATTLES: 'stepwar_battles',
  CHALLENGES: 'stepwar_challenges',
}; 