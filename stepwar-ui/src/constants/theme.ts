import type { Theme } from '../types';

export const themes = {
  'black-neon': {
    bg: 'bg-black',
    cardBg: 'bg-gray-900/80 backdrop-blur-sm border border-cyan-500/30 shadow-lg shadow-cyan-500/20',
    text: 'text-white',
    accent: 'text-cyan-400',
    button: 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white shadow-lg shadow-cyan-500/30',
    nav: 'bg-gray-900/90 backdrop-blur-md border-t border-cyan-500/30',
    glow: 'shadow-[0_0_20px_rgba(6,182,212,0.3)]',
    input: 'bg-gray-800/50 border border-cyan-500/30 text-white placeholder-gray-400',
    modal: 'bg-gray-900/95 backdrop-blur-md border border-cyan-500/30',
    progress: 'bg-gradient-to-r from-cyan-400 to-blue-500',
    chart: {
      bar: 'bg-gradient-to-t from-cyan-500 to-blue-400',
      line: 'stroke-cyan-400',
      area: 'fill-cyan-400/20'
    }
  },
  'glassmorphism': {
    bg: 'bg-gradient-to-br from-purple-400/20 via-pink-400/20 to-red-400/20',
    cardBg: 'bg-white/10 backdrop-blur-md border border-white/20 shadow-xl',
    text: 'text-white',
    accent: 'text-purple-300',
    button: 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/30',
    nav: 'bg-white/10 backdrop-blur-md border-t border-white/20',
    glow: 'shadow-[0_0_30px_rgba(255,255,255,0.1)]',
    input: 'bg-white/10 border border-white/20 text-white placeholder-white/60',
    modal: 'bg-white/10 backdrop-blur-md border border-white/20',
    progress: 'bg-gradient-to-r from-purple-400 to-pink-400',
    chart: {
      bar: 'bg-gradient-to-t from-purple-400 to-pink-400',
      line: 'stroke-purple-400',
      area: 'fill-purple-400/20'
    }
  },
  'light': {
    bg: 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50',
    cardBg: 'bg-white/80 backdrop-blur-sm border border-gray-200 shadow-lg shadow-purple-500/10',
    text: 'text-gray-900',
    accent: 'text-purple-600',
    button: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg shadow-purple-500/30',
    nav: 'bg-white/90 backdrop-blur-md border-t border-gray-200',
    glow: 'shadow-[0_0_20px_rgba(147,51,234,0.2)]',
    input: 'bg-white/80 border border-gray-200 text-gray-900 placeholder-gray-500',
    modal: 'bg-white/95 backdrop-blur-sm border border-gray-200',
    progress: 'bg-gradient-to-r from-purple-500 to-pink-500',
    chart: {
      bar: 'bg-gradient-to-t from-purple-500 to-pink-500',
      line: 'stroke-purple-500',
      area: 'fill-purple-500/20'
    }
  }
} as const;

export const battleThemes = {
  'black-neon': {
    cardBg: 'bg-gradient-to-br from-red-900/80 to-orange-900/80 backdrop-blur-sm border border-red-500/30 shadow-lg shadow-red-500/20',
    accent: 'text-red-400',
    glow: 'shadow-[0_0_20px_rgba(239,68,68,0.3)]',
    progress: 'bg-gradient-to-r from-red-500 to-orange-500'
  },
  'glassmorphism': {
    cardBg: 'bg-gradient-to-br from-red-500/20 to-orange-500/20 backdrop-blur-md border border-red-300/30 shadow-xl',
    accent: 'text-red-400',
    glow: 'shadow-[0_0_20px_rgba(239,68,68,0.3)]',
    progress: 'bg-gradient-to-r from-red-500 to-orange-500'
  },
  'light': {
    cardBg: 'bg-gradient-to-br from-red-100 to-orange-100 backdrop-blur-sm border border-red-200 shadow-lg shadow-red-500/10',
    accent: 'text-red-600',
    glow: 'shadow-[0_0_20px_rgba(239,68,68,0.2)]',
    progress: 'bg-gradient-to-r from-red-500 to-orange-500'
  }
} as const;

export const getThemeConfig = (theme: Theme) => themes[theme];
export const getBattleThemeConfig = (theme: Theme) => battleThemes[theme]; 