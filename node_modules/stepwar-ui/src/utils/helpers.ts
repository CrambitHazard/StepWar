import { APP_CONFIG } from '../constants/app';
import type { StepData, WeeklySteps } from '../types';

/**
 * Format a number with commas for display
 */
export const formatNumber = (num: number): string => {
  return num.toLocaleString();
};

/**
 * Format a date for display
 */
export const formatDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString();
};

/**
 * Format time remaining for battles
 */
export const formatTimeRemaining = (endTime: Date): string => {
  const now = new Date();
  const diff = endTime.getTime() - now.getTime();
  
  if (diff <= 0) return 'Ended';
  
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  if (hours > 24) {
    const days = Math.floor(hours / 24);
    return `${days}d ${hours % 24}h`;
  } else if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else {
    return `${minutes}m`;
  }
};

/**
 * Calculate progress percentage
 */
export const calculateProgress = (current: number, target: number): number => {
  if (target === 0) return 0;
  return Math.min((current / target) * 100, 100);
};

/**
 * Calculate XP from steps
 */
export const calculateXP = (steps: number): number => {
  return Math.floor(steps * APP_CONFIG.xpPerStep);
};

/**
 * Calculate level from XP
 */
export const calculateLevel = (xp: number): number => {
  return Math.floor(xp / APP_CONFIG.levelXpMultiplier) + 1;
};

/**
 * Calculate XP needed for next level
 */
export const calculateXPForNextLevel = (currentLevel: number): number => {
  return currentLevel * APP_CONFIG.levelXpMultiplier;
};

/**
 * Calculate XP progress to next level
 */
export const calculateXPProgress = (xp: number, level: number): number => {
  const xpForNextLevel = calculateXPForNextLevel(level);
  const xpForCurrentLevel = calculateXPForNextLevel(level - 1);
  const xpInCurrentLevel = xp - xpForCurrentLevel;
  const xpNeededInCurrentLevel = xpForNextLevel - xpForCurrentLevel;
  
  return calculateProgress(xpInCurrentLevel, xpNeededInCurrentLevel);
};

/**
 * Validate step count for cheating detection
 */
export const validateStepCount = (steps: number, previousSteps: number): boolean => {
  const stepIncrease = steps - previousSteps;
  const timeDiff = 5; // 5 seconds
  const maxIncrease = APP_CONFIG.stepSpikeThreshold * timeDiff;
  
  return stepIncrease <= maxIncrease;
};

/**
 * Calculate calories from steps (rough estimate)
 */
export const calculateCalories = (steps: number): number => {
  // Rough estimate: 1 step = 0.04 calories
  return Math.floor(steps * 0.04);
};

/**
 * Calculate distance from steps (rough estimate)
 */
export const calculateDistance = (steps: number): number => {
  // Rough estimate: 1 step = 0.0008 km
  return Math.floor(steps * 0.0008 * 100) / 100;
};

/**
 * Get day of week from date
 */
export const getDayOfWeek = (date: Date): string => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return days[date.getDay()];
};

/**
 * Get current week's step data
 */
export const getCurrentWeekSteps = (): WeeklySteps => {
  const week: WeeklySteps = {};
  const today = new Date();
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - (6 - i));
    const dateKey = date.toISOString().split('T')[0];
    
    week[dateKey] = {
      date: dateKey,
      steps: 0,
      goal: APP_CONFIG.defaultGoal,
    };
  }
  
  return week;
};

/**
 * Generate a random ID
 */
export const generateId = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

/**
 * Debounce function for performance
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout>;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Throttle function for performance
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Check if device is mobile
 */
export const isMobile = (): boolean => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

/**
 * Get device pixel ratio for responsive design
 */
export const getDevicePixelRatio = (): number => {
  return window.devicePixelRatio || 1;
};

/**
 * Format file size
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate username format
 */
export const isValidUsername = (username: string): boolean => {
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return usernameRegex.test(username);
};

/**
 * Capitalize first letter
 */
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Truncate text with ellipsis
 */
export const truncate = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}; 