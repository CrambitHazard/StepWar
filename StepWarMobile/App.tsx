import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native';

// Import screens
import HomeScreen from './src/screens/HomeScreen';
import LeaguesScreen from './src/screens/LeaguesScreen';
import BattlesScreen from './src/screens/BattlesScreen';
import ChallengesScreen from './src/screens/ChallengesScreen';
import ProfileScreen from './src/screens/ProfileScreen';

// Import types and constants
import { User, Theme, Settings, League, Battle, Challenge } from './src/types';
import { mockUser, mockLeagues, mockBattles, mockChallenges } from './src/constants/app';
import { 
  getUser, 
  getTheme, 
  getSettings, 
  getLeagues, 
  getBattles, 
  getChallenges,
  storeUser, 
  storeTheme, 
  storeSettings,
  storeLeagues,
  storeBattles,
  storeChallenges
} from './src/utils/storage';

const Tab = createBottomTabNavigator();

export default function App() {
  const [user, setUser] = useState<User>(mockUser);
  const [theme, setTheme] = useState<Theme>('black-neon');
  const [settings, setSettings] = useState<Settings>({
    notificationsEnabled: true,
    autoSyncEnabled: true,
    privacyModeEnabled: false,
  });
  const [leagues, setLeagues] = useState<League[]>(mockLeagues);
  const [battles, setBattles] = useState<Battle[]>(mockBattles);
  const [challenges, setChallenges] = useState<Challenge[]>(mockChallenges);

  // Load data from storage on app start
  useEffect(() => {
    const loadData = async () => {
      try {
        const [loadedUser, loadedTheme, loadedSettings, loadedLeagues, loadedBattles, loadedChallenges] = await Promise.all([
          getUser(mockUser),
          getTheme('black-neon'),
          getSettings({
            notificationsEnabled: true,
            autoSyncEnabled: true,
            privacyModeEnabled: false,
          }),
          getLeagues(mockLeagues),
          getBattles(mockBattles),
          getChallenges(mockChallenges),
        ]);

        setUser(loadedUser);
        setTheme(loadedTheme);
        setSettings(loadedSettings);
        setLeagues(loadedLeagues);
        setBattles(loadedBattles);
        setChallenges(loadedChallenges);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []);

  // Save data to storage when it changes
  useEffect(() => {
    storeUser(user);
  }, [user]);

  useEffect(() => {
    storeTheme(theme);
  }, [theme]);

  useEffect(() => {
    storeSettings(settings);
  }, [settings]);

  useEffect(() => {
    storeLeagues(leagues);
  }, [leagues]);

  useEffect(() => {
    storeBattles(battles);
  }, [battles]);

  useEffect(() => {
    storeChallenges(challenges);
  }, [challenges]);

  // Handler functions
  const handleAddSteps = (steps: number) => {
    setUser(prev => ({
      ...prev,
      steps: prev.steps + steps,
      calories: prev.calories + Math.round(steps * 0.04),
      distance: prev.distance + (steps * 0.0008),
    }));
  };

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  const handleSettingsChange = (newSettings: Settings) => {
    setSettings(newSettings);
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: {
              backgroundColor: theme === 'black-neon' ? '#1a1a1a' : 
                            theme === 'glassmorphism' ? 'rgba(255, 255, 255, 0.1)' : '#ffffff',
              borderTopColor: theme === 'black-neon' ? '#333' : 
                             theme === 'glassmorphism' ? 'rgba(255, 255, 255, 0.2)' : '#e0e0e0',
            },
            tabBarActiveTintColor: theme === 'black-neon' ? '#00f5ff' : 
                                  theme === 'glassmorphism' ? '#8a2be2' : '#007bff',
            tabBarInactiveTintColor: theme === 'black-neon' ? '#666' : 
                                    theme === 'glassmorphism' ? 'rgba(255, 255, 255, 0.6)' : '#999',
            headerShown: false,
          }}
        >
          <Tab.Screen 
            name="Home" 
            children={() => (
              <HomeScreen 
                user={user} 
                theme={theme} 
                onAddSteps={handleAddSteps}
              />
            )}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Text style={{ color, fontSize: size }}>🏠</Text>
              ),
            }}
          />
          <Tab.Screen 
            name="Leagues" 
            children={() => (
              <LeaguesScreen 
                leagues={leagues} 
                user={user} 
                theme={theme}
              />
            )}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Text style={{ color, fontSize: size }}>🏆</Text>
              ),
            }}
          />
          <Tab.Screen 
            name="Battles" 
            children={() => (
              <BattlesScreen 
                battles={battles} 
                user={user} 
                theme={theme}
              />
            )}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Text style={{ color, fontSize: size }}>⚔️</Text>
              ),
            }}
          />
          <Tab.Screen 
            name="Challenges" 
            children={() => (
              <ChallengesScreen 
                challenges={challenges} 
                theme={theme}
              />
            )}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Text style={{ color, fontSize: size }}>🎯</Text>
              ),
            }}
          />
          <Tab.Screen 
            name="Profile" 
            children={() => (
              <ProfileScreen 
                user={user}
                theme={theme}
                settings={settings}
                onThemeChange={handleThemeChange}
                onSettingsChange={handleSettingsChange}
              />
            )}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Text style={{ color, fontSize: size }}>👤</Text>
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
