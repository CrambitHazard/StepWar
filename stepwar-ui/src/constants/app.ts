// App configuration
export const APP_CONFIG = {
  name: 'StepWar',
  version: '1.0.0',
  description: 'Offline Battle Arena for Step Count Battles',
  maxStepsPerDay: 30000,
  defaultGoal: 10000,
  stepSpikeThreshold: 100, // steps in 5 seconds
  syncInterval: 5 * 60 * 1000, // 5 minutes
  battleDurationOptions: [1, 24, 168], // 1 hour, 24 hours, 7 days
  maxLeagueMembers: 100,
  maxBattlesPerUser: 10,
  maxChallengesPerUser: 20,
  xpPerStep: 0.1,
  levelXpMultiplier: 1000,
} as const;

// Navigation configuration
export const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: 'Home' },
  { id: 'leagues', label: 'Leagues', icon: 'Trophy' },
  { id: 'battles', label: 'Battles', icon: 'Swords' },
  { id: 'challenges', label: 'Challenges', icon: 'Target' },
  { id: 'profile', label: 'Profile', icon: 'User' },
] as const;

// Challenge types
export const CHALLENGE_TYPES = [
  { value: 'steps', label: 'Steps', icon: 'Footprints' },
  { value: 'calories', label: 'Calories', icon: 'Flame' },
  { value: 'distance', label: 'Distance', icon: 'MapPin' },
  { value: 'time', label: 'Time', icon: 'Clock' },
  { value: 'battles', label: 'Battles', icon: 'Swords' },
] as const;

// Battle types
export const BATTLE_TYPES = [
  { value: '1v1', label: '1 vs 1', icon: 'Users' },
  { value: 'team', label: 'Team Battle', icon: 'Users' },
] as const;

// Theme options
export const THEME_OPTIONS = [
  {
    value: 'black-neon',
    label: 'Black Neon',
    description: 'Dark with neon highlights',
    preview: 'bg-gradient-to-r from-cyan-400 to-blue-500',
  },
  {
    value: 'glassmorphism',
    label: 'Glassmorphism',
    description: 'Frosted glass effect',
    preview: 'bg-gradient-to-r from-purple-400 to-pink-400',
  },
  {
    value: 'light',
    label: 'Light Mode',
    description: 'Bright with aurora colors',
    preview: 'bg-gradient-to-r from-purple-500 to-pink-500',
  },
] as const;

// Default user settings
export const DEFAULT_SETTINGS = {
  notifications: true,
  autoSync: true,
  privacyMode: false,
  theme: 'black-neon' as const,
  language: 'en',
  units: 'metric' as const,
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  user: 'stepwar_user',
  settings: 'stepwar_settings',
  theme: 'stepwar_theme',
  battles: 'stepwar_battles',
  leagues: 'stepwar_leagues',
  challenges: 'stepwar_challenges',
  steps: 'stepwar_steps',
} as const;

// API endpoints (for future use)
export const API_ENDPOINTS = {
  auth: '/api/auth',
  user: '/api/user',
  battles: '/api/battles',
  leagues: '/api/leagues',
  challenges: '/api/challenges',
  steps: '/api/steps',
} as const;

// Error messages
export const ERROR_MESSAGES = {
  network: 'Network error. Please check your connection.',
  auth: 'Authentication failed. Please try again.',
  permission: 'Permission denied. Please check your settings.',
  notFound: 'Resource not found.',
  server: 'Server error. Please try again later.',
  unknown: 'An unknown error occurred.',
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  battleCreated: 'Battle created successfully!',
  battleJoined: 'Battle joined successfully!',
  leagueCreated: 'League created successfully!',
  leagueJoined: 'League joined successfully!',
  challengeCreated: 'Challenge created successfully!',
  settingsSaved: 'Settings saved successfully!',
} as const; 