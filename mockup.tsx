"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Trophy, 
  Swords, 
  Target, 
  User, 
  Plus, 
  QrCode, 
  Search, 
  MapPin, 
  Users, 
  Crown, 
  Flame, 
  Zap,
  Calendar,
  Award,
  Settings,
  Palette,
  Moon,
  Sun,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Types
interface User {
  id: string;
  name: string;
  avatar: string;
  level: number;
  xp: number;
  totalSteps: number;
  todaySteps: number;
}

interface League {
  id: string;
  name: string;
  members: number;
  isPublic: boolean;
  leaderboard: { user: User; steps: number }[];
}

interface Battle {
  id: string;
  opponent: User;
  mySteps: number;
  opponentSteps: number;
  status: 'active' | 'won' | 'lost';
  timeLeft: string;
}

interface Challenge {
  id: string;
  title: string;
  type: 'steps' | 'calories' | 'distance' | 'time' | 'battles';
  target: number;
  current: number;
  deadline: string;
}

type Theme = 'black-neon' | 'glassmorphism' | 'light';

// Mock data
const mockUser: User = {
  id: '1',
  name: 'Alex Runner',
  avatar: '👤',
  level: 15,
  xp: 2450,
  totalSteps: 125000,
  todaySteps: 8547
};

const mockWeeklySteps = [
  { day: 'Mon', steps: 8200 },
  { day: 'Tue', steps: 9100 },
  { day: 'Wed', steps: 7800 },
  { day: 'Thu', steps: 10200 },
  { day: 'Fri', steps: 8900 },
  { day: 'Sat', steps: 12000 },
  { day: 'Sun', steps: 8547 }
];

const mockLeagues: League[] = [
  {
    id: '1',
    name: 'City Runners',
    members: 156,
    isPublic: true,
    leaderboard: [
      { user: { ...mockUser, name: 'Sarah Speed' }, steps: 15000 },
      { user: mockUser, steps: 8547 },
      { user: { ...mockUser, name: 'Mike Marathon' }, steps: 7200 }
    ]
  }
];

const mockBattles: Battle[] = [
  {
    id: '1',
    opponent: { ...mockUser, name: 'Jenny Fast' },
    mySteps: 8547,
    opponentSteps: 7200,
    status: 'active',
    timeLeft: '2h 15m'
  }
];

const mockChallenges: Challenge[] = [
  {
    id: '1',
    title: '10K Steps Daily',
    type: 'steps',
    target: 10000,
    current: 8547,
    deadline: '2024-01-31'
  },
  {
    id: '2',
    title: 'Win 5 Battles',
    type: 'battles',
    target: 5,
    current: 2,
    deadline: '2024-02-15'
  }
];

// Theme configurations
const themes = {
  'black-neon': {
    bg: 'bg-black',
    cardBg: 'bg-gray-900/80 backdrop-blur-sm border border-cyan-500/30 shadow-lg shadow-cyan-500/20',
    text: 'text-white',
    accent: 'text-cyan-400',
    button: 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white shadow-lg shadow-cyan-500/30',
    nav: 'bg-gray-900/90 backdrop-blur-md border-t border-cyan-500/30',
    glow: 'shadow-[0_0_20px_rgba(6,182,212,0.3)]'
  },
  'glassmorphism': {
    bg: 'bg-gradient-to-br from-purple-400/20 via-pink-400/20 to-red-400/20',
    cardBg: 'bg-white/10 backdrop-blur-md border border-white/20 shadow-xl',
    text: 'text-white',
    accent: 'text-purple-300',
    button: 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/30',
    nav: 'bg-white/10 backdrop-blur-md border-t border-white/20',
    glow: 'shadow-[0_0_30px_rgba(255,255,255,0.1)]'
  },
  'light': {
    bg: 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50',
    cardBg: 'bg-white/80 backdrop-blur-sm border border-gray-200 shadow-lg shadow-purple-500/10',
    text: 'text-gray-900',
    accent: 'text-purple-600',
    button: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg shadow-purple-500/30',
    nav: 'bg-white/90 backdrop-blur-md border-t border-gray-200',
    glow: 'shadow-[0_0_20px_rgba(147,51,234,0.2)]'
  }
};

// Animated Counter Component
const AnimatedCounter: React.FC<{ value: number; duration?: number }> = ({ value, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);

  useEffect(() => {
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(easeOut * value);
      
      if (currentCount !== countRef.current) {
        countRef.current = currentCount;
        setCount(currentCount);
      }
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    animate();
  }, [value, duration]);

  return <span>{count.toLocaleString()}</span>;
};

// Navigation Component
const BottomNav: React.FC<{ activeTab: string; onTabChange: (tab: string) => void; theme: Theme }> = ({ 
  activeTab, 
  onTabChange, 
  theme 
}) => {
  const themeConfig = themes[theme];
  
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'leagues', icon: Trophy, label: 'Leagues' },
    { id: 'battles', icon: Swords, label: 'Battles' },
    { id: 'challenges', icon: Target, label: 'Challenges' },
    { id: 'profile', icon: User, label: 'Profile' }
  ];

  return (
    <motion.nav 
      className={`fixed bottom-0 left-0 right-0 ${themeConfig.nav} p-4 z-50`}
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <motion.button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`relative flex flex-col items-center p-2 rounded-xl transition-all ${
                isActive ? themeConfig.accent : themeConfig.text + ' opacity-60'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className={`absolute inset-0 rounded-xl ${
                    theme === 'black-neon' ? 'bg-cyan-500/20' :
                    theme === 'glassmorphism' ? 'bg-white/20' :
                    'bg-purple-500/20'
                  }`}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <Icon size={24} className={`relative z-10 ${isActive && themeConfig.glow}`} />
              <span className="text-xs mt-1 relative z-10">{item.label}</span>
            </motion.button>
          );
        })}
      </div>
    </motion.nav>
  );
};

// Home Screen Component
const HomeScreen: React.FC<{ theme: Theme }> = ({ theme }) => {
  const themeConfig = themes[theme];
  
  return (
    <div className="space-y-6 pb-24">
      {/* Today's Steps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`${themeConfig.cardBg} rounded-3xl p-8 text-center ${themeConfig.glow}`}
      >
        <h2 className={`text-lg font-medium ${themeConfig.text} mb-4`}>Today's Steps</h2>
        <div className={`text-6xl font-bold ${themeConfig.accent} mb-2`}>
          <AnimatedCounter value={mockUser.todaySteps} />
        </div>
        <div className={`${themeConfig.text} opacity-70`}>
          Goal: 10,000 steps
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2 mt-4">
          <motion.div
            className={`h-2 rounded-full ${
              theme === 'black-neon' ? 'bg-gradient-to-r from-cyan-400 to-blue-500' :
              theme === 'glassmorphism' ? 'bg-gradient-to-r from-purple-400 to-pink-400' :
              'bg-gradient-to-r from-purple-500 to-pink-500'
            }`}
            initial={{ width: 0 }}
            animate={{ width: `${Math.min((mockUser.todaySteps / 10000) * 100, 100)}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </div>
      </motion.div>

      {/* Weekly Steps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className={`${themeConfig.cardBg} rounded-3xl p-6`}
      >
        <h3 className={`text-lg font-semibold ${themeConfig.text} mb-4`}>This Week</h3>
        <div className="flex justify-between items-end h-32">
          {mockWeeklySteps.map((day, index) => (
            <div key={day.day} className="flex flex-col items-center">
              <motion.div
                className={`w-8 rounded-t-lg ${
                  theme === 'black-neon' ? 'bg-gradient-to-t from-cyan-500 to-blue-400' :
                  theme === 'glassmorphism' ? 'bg-gradient-to-t from-purple-400 to-pink-400' :
                  'bg-gradient-to-t from-purple-500 to-pink-500'
                }`}
                initial={{ height: 0 }}
                animate={{ height: `${(day.steps / 12000) * 100}px` }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.8 }}
              />
              <span className={`text-xs ${themeConfig.text} opacity-70 mt-2`}>{day.day}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Personal Best */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className={`${themeConfig.cardBg} rounded-3xl p-6`}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className={`text-lg font-semibold ${themeConfig.text}`}>Personal Best</h3>
            <p className={`text-2xl font-bold ${themeConfig.accent}`}>15,247 steps</p>
            <p className={`text-sm ${themeConfig.text} opacity-70`}>December 15, 2023</p>
          </div>
          <Award className={`w-12 h-12 ${themeConfig.accent}`} />
        </div>
      </motion.div>

      {/* Quick Access */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-3 gap-4"
      >
        <div className={`${themeConfig.cardBg} rounded-2xl p-4 text-center`}>
          <Trophy className={`w-8 h-8 ${themeConfig.accent} mx-auto mb-2`} />
          <p className={`text-sm ${themeConfig.text}`}>Leagues</p>
          <p className={`text-xs ${themeConfig.text} opacity-70`}>3 active</p>
        </div>
        <div className={`${themeConfig.cardBg} rounded-2xl p-4 text-center`}>
          <Swords className={`w-8 h-8 ${themeConfig.accent} mx-auto mb-2`} />
          <p className={`text-sm ${themeConfig.text}`}>Battles</p>
          <p className={`text-xs ${themeConfig.text} opacity-70`}>2 ongoing</p>
        </div>
        <div className={`${themeConfig.cardBg} rounded-2xl p-4 text-center`}>
          <Target className={`w-8 h-8 ${themeConfig.accent} mx-auto mb-2`} />
          <p className={`text-sm ${themeConfig.text}`}>Challenges</p>
          <p className={`text-xs ${themeConfig.text} opacity-70`}>5 active</p>
        </div>
      </motion.div>
    </div>
  );
};

// Leagues Screen Component
const LeaguesScreen: React.FC<{ theme: Theme }> = ({ theme }) => {
  const themeConfig = themes[theme];
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);

  return (
    <div className="space-y-6 pb-24">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className={`text-2xl font-bold ${themeConfig.text}`}>Leagues</h1>
        <div className="flex gap-2">
          <Button 
            onClick={() => setShowJoinModal(true)}
            variant="outline" 
            size="sm"
            className={themeConfig.button}
          >
            <Search className="w-4 h-4 mr-2" />
            Join
          </Button>
          <Button 
            onClick={() => setShowCreateModal(true)}
            size="sm"
            className={themeConfig.button}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create
          </Button>
        </div>
      </div>

      {/* My Leagues */}
      <div className="space-y-4">
        {mockLeagues.map((league) => (
          <motion.div
            key={league.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`${themeConfig.cardBg} rounded-3xl p-6`}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className={`text-lg font-semibold ${themeConfig.text}`}>{league.name}</h3>
                <p className={`text-sm ${themeConfig.text} opacity-70`}>
                  {league.members} members • {league.isPublic ? 'Public' : 'Private'}
                </p>
              </div>
              <Crown className={`w-6 h-6 ${themeConfig.accent}`} />
            </div>
            
            <div className="space-y-3">
              <h4 className={`text-sm font-medium ${themeConfig.text}`}>Leaderboard</h4>
              {league.leaderboard.map((entry, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={`text-lg ${themeConfig.accent}`}>#{index + 1}</span>
                    <span className={`text-2xl`}>{entry.user.avatar}</span>
                    <span className={`${themeConfig.text}`}>{entry.user.name}</span>
                  </div>
                  <span className={`font-semibold ${themeConfig.accent}`}>
                    {entry.steps.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Create League Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowCreateModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`${themeConfig.cardBg} rounded-3xl p-6 w-full max-w-md`}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className={`text-xl font-bold ${themeConfig.text} mb-4`}>Create League</h2>
              <div className="space-y-4">
                <Input placeholder="League Name" className={themeConfig.text} />
                <div className="flex items-center justify-between">
                  <span className={themeConfig.text}>Public League</span>
                  <Switch />
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button className={`flex-1 ${themeConfig.button}`}>
                    Create
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Join League Modal */}
      <AnimatePresence>
        {showJoinModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowJoinModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`${themeConfig.cardBg} rounded-3xl p-6 w-full max-w-md`}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className={`text-xl font-bold ${themeConfig.text} mb-4`}>Join League</h2>
              <Tabs defaultValue="search" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="search">Search</TabsTrigger>
                  <TabsTrigger value="location">Location</TabsTrigger>
                  <TabsTrigger value="code">Code</TabsTrigger>
                </TabsList>
                <TabsContent value="search" className="space-y-4">
                  <Input placeholder="Search leagues..." />
                  <Button className={`w-full ${themeConfig.button}`}>Search</Button>
                </TabsContent>
                <TabsContent value="location" className="space-y-4">
                  <div className="flex items-center gap-2">
                    <MapPin className={`w-4 h-4 ${themeConfig.accent}`} />
                    <span className={themeConfig.text}>Find leagues near you</span>
                  </div>
                  <Button className={`w-full ${themeConfig.button}`}>Find Nearby</Button>
                </TabsContent>
                <TabsContent value="code" className="space-y-4">
                  <Input placeholder="Enter league code..." />
                  <Button className={`w-full ${themeConfig.button}`}>Join</Button>
                </TabsContent>
              </Tabs>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Battles Screen Component
const BattlesScreen: React.FC<{ theme: Theme }> = ({ theme }) => {
  const themeConfig = themes[theme];
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Fiery theme override for battles
  const battleTheme = {
    ...themeConfig,
    cardBg: theme === 'black-neon' 
      ? 'bg-gradient-to-br from-red-900/80 to-orange-900/80 backdrop-blur-sm border border-red-500/30 shadow-lg shadow-red-500/20'
      : theme === 'glassmorphism'
      ? 'bg-gradient-to-br from-red-500/20 to-orange-500/20 backdrop-blur-md border border-red-300/30 shadow-xl'
      : 'bg-gradient-to-br from-red-100 to-orange-100 backdrop-blur-sm border border-red-200 shadow-lg shadow-red-500/10',
    accent: theme === 'light' ? 'text-red-600' : 'text-red-400',
    glow: 'shadow-[0_0_20px_rgba(239,68,68,0.3)]'
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Header with fiery styling */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Flame className={`w-8 h-8 ${battleTheme.accent}`} />
          <h1 className={`text-2xl font-bold ${themeConfig.text}`}>Battles</h1>
        </div>
        <div className="flex gap-2">
          <Button 
            size="sm"
            className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white"
          >
            <QrCode className="w-4 h-4 mr-2" />
            Scan QR
          </Button>
          <Button 
            onClick={() => setShowCreateModal(true)}
            size="sm"
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create
          </Button>
        </div>
      </div>

      {/* Active Battles */}
      <div className="space-y-4">
        {mockBattles.map((battle) => (
          <motion.div
            key={battle.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`${battleTheme.cardBg} rounded-3xl p-6 ${battleTheme.glow}`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">👤</span>
                <div>
                  <h3 className={`font-semibold ${themeConfig.text}`}>{battle.opponent.name}</h3>
                  <p className={`text-sm ${themeConfig.text} opacity-70`}>1v1 Battle</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm ${battleTheme.accent} font-medium`}>Time Left</p>
                <p className={`text-lg font-bold ${battleTheme.accent}`}>{battle.timeLeft}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className={themeConfig.text}>You</span>
                <span className={`font-bold ${battleTheme.accent}`}>
                  {battle.mySteps.toLocaleString()} steps
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className={themeConfig.text}>{battle.opponent.name}</span>
                <span className={`font-bold ${themeConfig.text} opacity-70`}>
                  {battle.opponentSteps.toLocaleString()} steps
                </span>
              </div>
              
              {/* Battle progress bar */}
              <div className="relative h-3 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-red-500 to-orange-500"
                  initial={{ width: 0 }}
                  animate={{ 
                    width: `${(battle.mySteps / (battle.mySteps + battle.opponentSteps)) * 100}%` 
                  }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </div>
              
              <div className="flex items-center justify-center gap-2">
                {battle.mySteps > battle.opponentSteps ? (
                  <>
                    <Zap className={`w-4 h-4 ${battleTheme.accent}`} />
                    <span className={`text-sm font-medium ${battleTheme.accent}`}>
                      You're winning!
                    </span>
                  </>
                ) : (
                  <span className={`text-sm ${themeConfig.text} opacity-70`}>
                    Keep pushing!
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Create Battle Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowCreateModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`${battleTheme.cardBg} rounded-3xl p-6 w-full max-w-md`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-2 mb-4">
                <Flame className={`w-6 h-6 ${battleTheme.accent}`} />
                <h2 className={`text-xl font-bold ${themeConfig.text}`}>Create Battle</h2>
              </div>
              <div className="space-y-4">
                <Input placeholder="Challenge a friend..." className={themeConfig.text} />
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline">24 Hours</Button>
                  <Button variant="outline">7 Days</Button>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button className="flex-1 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white">
                    Challenge!
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Challenges Screen Component
const ChallengesScreen: React.FC<{ theme: Theme }> = ({ theme }) => {
  const themeConfig = themes[theme];

  return (
    <div className="space-y-6 pb-24">
      <div className="flex justify-between items-center">
        <h1 className={`text-2xl font-bold ${themeConfig.text}`}>Challenges</h1>
        <Button size="sm" className={themeConfig.button}>
          <Plus className="w-4 h-4 mr-2" />
          Create
        </Button>
      </div>

      <div className="space-y-4">
        {mockChallenges.map((challenge) => (
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${themeConfig.cardBg} rounded-3xl p-6`}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className={`text-lg font-semibold ${themeConfig.text}`}>{challenge.title}</h3>
                <p className={`text-sm ${themeConfig.text} opacity-70`}>
                  Due: {new Date(challenge.deadline).toLocaleDateString()}
                </p>
              </div>
              <Badge variant="outline" className={themeConfig.accent}>
                {challenge.type}
              </Badge>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className={`text-sm ${themeConfig.text}`}>Progress</span>
                <span className={`text-sm ${themeConfig.accent}`}>
                  {challenge.current} / {challenge.target}
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <motion.div
                  className={`h-2 rounded-full ${
                    theme === 'black-neon' ? 'bg-gradient-to-r from-cyan-400 to-blue-500' :
                    theme === 'glassmorphism' ? 'bg-gradient-to-r from-purple-400 to-pink-400' :
                    'bg-gradient-to-r from-purple-500 to-pink-500'
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${(challenge.current / challenge.target) * 100}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Profile Screen Component
const ProfileScreen: React.FC<{ theme: Theme; onThemeChange: (theme: Theme) => void }> = ({ 
  theme, 
  onThemeChange 
}) => {
  const themeConfig = themes[theme];

  return (
    <div className="space-y-6 pb-24">
      <h1 className={`text-2xl font-bold ${themeConfig.text}`}>Profile</h1>

      {/* User Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`${themeConfig.cardBg} rounded-3xl p-6 text-center`}
      >
        <div className="text-6xl mb-4">{mockUser.avatar}</div>
        <h2 className={`text-xl font-bold ${themeConfig.text}`}>{mockUser.name}</h2>
        <p className={`${themeConfig.accent} font-medium`}>Level {mockUser.level}</p>
        
        <div className="mt-4 space-y-2">
          <div className="flex justify-between">
            <span className={`text-sm ${themeConfig.text}`}>XP Progress</span>
            <span className={`text-sm ${themeConfig.accent}`}>
              {mockUser.xp} / {(mockUser.level + 1) * 1000}
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <motion.div
              className={`h-2 rounded-full ${
                theme === 'black-neon' ? 'bg-gradient-to-r from-cyan-400 to-blue-500' :
                theme === 'glassmorphism' ? 'bg-gradient-to-r from-purple-400 to-pink-400' :
                'bg-gradient-to-r from-purple-500 to-pink-500'
              }`}
              initial={{ width: 0 }}
              animate={{ width: `${(mockUser.xp / ((mockUser.level + 1) * 1000)) * 100}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className={`${themeConfig.cardBg} rounded-3xl p-6`}
      >
        <h3 className={`text-lg font-semibold ${themeConfig.text} mb-4`}>Statistics</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className={`text-2xl font-bold ${themeConfig.accent}`}>
              {mockUser.totalSteps.toLocaleString()}
            </p>
            <p className={`text-sm ${themeConfig.text} opacity-70`}>Total Steps</p>
          </div>
          <div className="text-center">
            <p className={`text-2xl font-bold ${themeConfig.accent}`}>47</p>
            <p className={`text-sm ${themeConfig.text} opacity-70`}>Days Active</p>
          </div>
        </div>
      </motion.div>

      {/* Theme Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className={`${themeConfig.cardBg} rounded-3xl p-6`}
      >
        <div className="flex items-center gap-2 mb-4">
          <Palette className={`w-5 h-5 ${themeConfig.accent}`} />
          <h3 className={`text-lg font-semibold ${themeConfig.text}`}>Theme</h3>
        </div>
        
        <div className="space-y-3">
          <div 
            className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
              theme === 'black-neon' ? 'bg-cyan-500/20 border border-cyan-500/30' : 'hover:bg-white/10'
            }`}
            onClick={() => onThemeChange('black-neon')}
          >
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-lg shadow-cyan-500/30" />
              <div>
                <p className={`font-medium ${themeConfig.text}`}>Black Neon</p>
                <p className={`text-xs ${themeConfig.text} opacity-70`}>Dark with neon highlights</p>
              </div>
            </div>
            {theme === 'black-neon' && <Sparkles className={`w-5 h-5 ${themeConfig.accent}`} />}
          </div>

          <div 
            className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
              theme === 'glassmorphism' ? 'bg-purple-500/20 border border-purple-500/30' : 'hover:bg-white/10'
            }`}
            onClick={() => onThemeChange('glassmorphism')}
          >
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full backdrop-blur-sm" />
              <div>
                <p className={`font-medium ${themeConfig.text}`}>Glassmorphism</p>
                <p className={`text-xs ${themeConfig.text} opacity-70`}>Frosted glass effect</p>
              </div>
            </div>
            {theme === 'glassmorphism' && <Sparkles className={`w-5 h-5 ${themeConfig.accent}`} />}
          </div>

          <div 
            className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
              theme === 'light' ? 'bg-purple-500/20 border border-purple-500/30' : 'hover:bg-white/10'
            }`}
            onClick={() => onThemeChange('light')}
          >
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
              <div>
                <p className={`font-medium ${themeConfig.text}`}>Light Mode</p>
                <p className={`text-xs ${themeConfig.text} opacity-70`}>Bright with aurora colors</p>
              </div>
            </div>
            {theme === 'light' && <Sparkles className={`w-5 h-5 ${themeConfig.accent}`} />}
          </div>
        </div>
      </motion.div>

      {/* Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className={`${themeConfig.cardBg} rounded-3xl p-6`}
      >
        <div className="flex items-center gap-2 mb-4">
          <Settings className={`w-5 h-5 ${themeConfig.accent}`} />
          <h3 className={`text-lg font-semibold ${themeConfig.text}`}>Settings</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className={themeConfig.text}>Notifications</span>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <span className={themeConfig.text}>Auto-sync</span>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <span className={themeConfig.text}>Privacy Mode</span>
            <Switch />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Main App Component
const PedometerApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [theme, setTheme] = useState<Theme>('black-neon');
  
  const themeConfig = themes[theme];

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen theme={theme} />;
      case 'leagues':
        return <LeaguesScreen theme={theme} />;
      case 'battles':
        return <BattlesScreen theme={theme} />;
      case 'challenges':
        return <ChallengesScreen theme={theme} />;
      case 'profile':
        return <ProfileScreen theme={theme} onThemeChange={setTheme} />;
      default:
        return <HomeScreen theme={theme} />;
    }
  };

  return (
    <div className={`min-h-screen ${themeConfig.bg} transition-all duration-500`}>
      <div className="max-w-md mx-auto relative">
        {/* Status Bar */}
        <div className={`flex justify-between items-center p-4 ${themeConfig.text}`}>
          <span className="text-sm font-medium">9:41</span>
          <div className="flex items-center gap-1">
            <div className="w-4 h-2 border border-current rounded-sm">
              <div className="w-3/4 h-full bg-current rounded-sm" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderScreen()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Navigation */}
        <BottomNav 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
          theme={theme}
        />
      </div>
    </div>
  );
};

export default function Demo() {
  return <PedometerApp />;
}
