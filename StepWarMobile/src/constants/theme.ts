import { Theme, ThemeConfig } from '../types';

export const themes: Record<Theme, ThemeConfig> = {
  'black-neon': {
    background: '#000000',
    cardBg: '#1a1a1a',
    text: '#ffffff',
    accent: '#00f5ff',
    button: '#00f5ff',
    nav: '#1a1a1a',
    glow: '#00f5ff',
  },
  'glassmorphism': {
    background: '#1a1a1a',
    cardBg: 'rgba(255, 255, 255, 0.1)',
    text: '#ffffff',
    accent: '#8a2be2',
    button: '#8a2be2',
    nav: 'rgba(255, 255, 255, 0.1)',
    glow: '#8a2be2',
  },
  'light': {
    background: '#ffffff',
    cardBg: '#f8f9fa',
    text: '#000000',
    accent: '#007bff',
    button: '#007bff',
    nav: '#ffffff',
    glow: '#007bff',
  },
}; 