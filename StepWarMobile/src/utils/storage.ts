import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, Theme, Settings, League, Battle, Challenge } from '../types';
import { STORAGE_KEYS } from '../constants/app';

// Generic storage functions
export const storeData = async (key: string, value: any): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.error('Error storing data:', error);
  }
};

export const getData = async <T>(key: string, defaultValue: T): Promise<T> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : defaultValue;
  } catch (error) {
    console.error('Error retrieving data:', error);
    return defaultValue;
  }
};

// Specific storage functions
export const storeUser = async (user: User): Promise<void> => {
  await storeData(STORAGE_KEYS.USER, user);
};

export const getUser = async (defaultUser: User): Promise<User> => {
  return await getData(STORAGE_KEYS.USER, defaultUser);
};

export const storeTheme = async (theme: Theme): Promise<void> => {
  await storeData(STORAGE_KEYS.THEME, theme);
};

export const getTheme = async (defaultTheme: Theme = 'black-neon'): Promise<Theme> => {
  return await getData(STORAGE_KEYS.THEME, defaultTheme);
};

export const storeSettings = async (settings: Settings): Promise<void> => {
  await storeData(STORAGE_KEYS.SETTINGS, settings);
};

export const getSettings = async (defaultSettings: Settings): Promise<Settings> => {
  return await getData(STORAGE_KEYS.SETTINGS, defaultSettings);
};

export const storeLeagues = async (leagues: League[]): Promise<void> => {
  await storeData(STORAGE_KEYS.LEAGUES, leagues);
};

export const getLeagues = async (defaultLeagues: League[]): Promise<League[]> => {
  return await getData(STORAGE_KEYS.LEAGUES, defaultLeagues);
};

export const storeBattles = async (battles: Battle[]): Promise<void> => {
  await storeData(STORAGE_KEYS.BATTLES, battles);
};

export const getBattles = async (defaultBattles: Battle[]): Promise<Battle[]> => {
  return await getData(STORAGE_KEYS.BATTLES, defaultBattles);
};

export const storeChallenges = async (challenges: Challenge[]): Promise<void> => {
  await storeData(STORAGE_KEYS.CHALLENGES, challenges);
};

export const getChallenges = async (defaultChallenges: Challenge[]): Promise<Challenge[]> => {
  return await getData(STORAGE_KEYS.CHALLENGES, defaultChallenges);
};

// Clear all data
export const clearAllData = async (): Promise<void> => {
  try {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.USER,
      STORAGE_KEYS.THEME,
      STORAGE_KEYS.SETTINGS,
      STORAGE_KEYS.LEAGUES,
      STORAGE_KEYS.BATTLES,
      STORAGE_KEYS.CHALLENGES,
    ]);
  } catch (error) {
    console.error('Error clearing data:', error);
  }
}; 