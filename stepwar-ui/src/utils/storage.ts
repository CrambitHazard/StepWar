import { STORAGE_KEYS } from '../constants/app';
import type { User, UserSettings, Theme } from '../types';

/**
 * Generic storage functions
 */
export const storage = {
  /**
   * Set item in localStorage
   */
  set: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  },

  /**
   * Get item from localStorage
   */
  get: <T>(key: string, defaultValue?: T): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue || null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return defaultValue || null;
    }
  },

  /**
   * Remove item from localStorage
   */
  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  },

  /**
   * Clear all localStorage
   */
  clear: (): void => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  },
};

/**
 * User-specific storage functions
 */
export const userStorage = {
  /**
   * Save user data
   */
  saveUser: (user: User): void => {
    storage.set(STORAGE_KEYS.user, user);
  },

  /**
   * Get user data
   */
  getUser: (): User | null => {
    return storage.get<User>(STORAGE_KEYS.user);
  },

  /**
   * Remove user data
   */
  removeUser: (): void => {
    storage.remove(STORAGE_KEYS.user);
  },

  /**
   * Update user data
   */
  updateUser: (updates: Partial<User>): void => {
    const currentUser = userStorage.getUser();
    if (currentUser) {
      userStorage.saveUser({ ...currentUser, ...updates });
    }
  },
};

/**
 * Settings-specific storage functions
 */
export const settingsStorage = {
  /**
   * Save user settings
   */
  saveSettings: (settings: UserSettings): void => {
    storage.set(STORAGE_KEYS.settings, settings);
  },

  /**
   * Get user settings
   */
  getSettings: (): UserSettings | null => {
    return storage.get<UserSettings>(STORAGE_KEYS.settings);
  },

  /**
   * Update settings
   */
  updateSettings: (updates: Partial<UserSettings>): void => {
    const currentSettings = settingsStorage.getSettings();
    if (currentSettings) {
      settingsStorage.saveSettings({ ...currentSettings, ...updates });
    }
  },
};

/**
 * Theme-specific storage functions
 */
export const themeStorage = {
  /**
   * Save theme preference
   */
  saveTheme: (theme: Theme): void => {
    storage.set(STORAGE_KEYS.theme, theme);
  },

  /**
   * Get theme preference
   */
  getTheme: (): Theme => {
    return storage.get<Theme>(STORAGE_KEYS.theme, 'black-neon') || 'black-neon';
  },
};

/**
 * Battle-specific storage functions
 */
export const battleStorage = {
  /**
   * Save battles
   */
  saveBattles: (battles: any[]): void => {
    storage.set(STORAGE_KEYS.battles, battles);
  },

  /**
   * Get battles
   */
  getBattles: (): any[] => {
    return storage.get<any[]>(STORAGE_KEYS.battles, []) || [];
  },

  /**
   * Add battle
   */
  addBattle: (battle: any): void => {
    const battles = battleStorage.getBattles();
    battles.push(battle);
    battleStorage.saveBattles(battles);
  },

  /**
   * Update battle
   */
  updateBattle: (battleId: string, updates: any): void => {
    const battles = battleStorage.getBattles();
    const index = battles.findIndex(b => b.id === battleId);
    if (index !== -1) {
      battles[index] = { ...battles[index], ...updates };
      battleStorage.saveBattles(battles);
    }
  },

  /**
   * Remove battle
   */
  removeBattle: (battleId: string): void => {
    const battles = battleStorage.getBattles();
    const filtered = battles.filter(b => b.id !== battleId);
    battleStorage.saveBattles(filtered);
  },
};

/**
 * League-specific storage functions
 */
export const leagueStorage = {
  /**
   * Save leagues
   */
  saveLeagues: (leagues: any[]): void => {
    storage.set(STORAGE_KEYS.leagues, leagues);
  },

  /**
   * Get leagues
   */
  getLeagues: (): any[] => {
    return storage.get<any[]>(STORAGE_KEYS.leagues, []) || [];
  },

  /**
   * Add league
   */
  addLeague: (league: any): void => {
    const leagues = leagueStorage.getLeagues();
    leagues.push(league);
    leagueStorage.saveLeagues(leagues);
  },

  /**
   * Update league
   */
  updateLeague: (leagueId: string, updates: any): void => {
    const leagues = leagueStorage.getLeagues();
    const index = leagues.findIndex(l => l.id === leagueId);
    if (index !== -1) {
      leagues[index] = { ...leagues[index], ...updates };
      leagueStorage.saveLeagues(leagues);
    }
  },

  /**
   * Remove league
   */
  removeLeague: (leagueId: string): void => {
    const leagues = leagueStorage.getLeagues();
    const filtered = leagues.filter(l => l.id !== leagueId);
    leagueStorage.saveLeagues(filtered);
  },
};

/**
 * Challenge-specific storage functions
 */
export const challengeStorage = {
  /**
   * Save challenges
   */
  saveChallenges: (challenges: any[]): void => {
    storage.set(STORAGE_KEYS.challenges, challenges);
  },

  /**
   * Get challenges
   */
  getChallenges: (): any[] => {
    return storage.get<any[]>(STORAGE_KEYS.challenges, []) || [];
  },

  /**
   * Add challenge
   */
  addChallenge: (challenge: any): void => {
    const challenges = challengeStorage.getChallenges();
    challenges.push(challenge);
    challengeStorage.saveChallenges(challenges);
  },

  /**
   * Update challenge
   */
  updateChallenge: (challengeId: string, updates: any): void => {
    const challenges = challengeStorage.getChallenges();
    const index = challenges.findIndex(c => c.id === challengeId);
    if (index !== -1) {
      challenges[index] = { ...challenges[index], ...updates };
      challengeStorage.saveChallenges(challenges);
    }
  },

  /**
   * Remove challenge
   */
  removeChallenge: (challengeId: string): void => {
    const challenges = challengeStorage.getChallenges();
    const filtered = challenges.filter(c => c.id !== challengeId);
    challengeStorage.saveChallenges(filtered);
  },
};

/**
 * Step-specific storage functions
 */
export const stepStorage = {
  /**
   * Save step data
   */
  saveSteps: (steps: any): void => {
    storage.set(STORAGE_KEYS.steps, steps);
  },

  /**
   * Get step data
   */
  getSteps: (): any => {
    return storage.get(STORAGE_KEYS.steps, {});
  },

  /**
   * Update step data for a specific date
   */
  updateSteps: (date: string, stepData: any): void => {
    const steps = stepStorage.getSteps();
    steps[date] = { ...steps[date], ...stepData };
    stepStorage.saveSteps(steps);
  },

  /**
   * Get steps for a specific date
   */
  getStepsForDate: (date: string): any => {
    const steps = stepStorage.getSteps();
    return steps[date] || { steps: 0, goal: 10000 };
  },
};

/**
 * Clear all app data
 */
export const clearAllData = (): void => {
  Object.values(STORAGE_KEYS).forEach(key => {
    storage.remove(key);
  });
};

/**
 * Export all data for backup
 */
export const exportData = (): string => {
  const data: Record<string, any> = {};
  
  Object.entries(STORAGE_KEYS).forEach(([key, storageKey]) => {
    data[key] = storage.get(storageKey);
  });
  
  return JSON.stringify(data, null, 2);
};

/**
 * Import data from backup
 */
export const importData = (jsonData: string): boolean => {
  try {
    const data = JSON.parse(jsonData);
    
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        storage.set(STORAGE_KEYS[key as keyof typeof STORAGE_KEYS], value);
      }
    });
    
    return true;
  } catch (error) {
    console.error('Error importing data:', error);
    return false;
  }
}; 