import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Theme, Settings } from '../types';
import { themes } from '../constants/theme';

interface ProfileScreenProps {
  user: User;
  theme: Theme;
  settings: Settings;
  onThemeChange: (theme: Theme) => void;
  onSettingsChange: (settings: Settings) => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ 
  user, 
  theme, 
  settings, 
  onThemeChange, 
  onSettingsChange 
}) => {
  const themeConfig = themes[theme];

  const handleSettingChange = (key: keyof Settings, value: boolean) => {
    onSettingsChange({
      ...settings,
      [key]: value,
    });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeConfig.background }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Text style={[styles.title, { color: themeConfig.text }]}>
          Profile
        </Text>
        
        {/* User Info */}
        <View style={[styles.userCard, { backgroundColor: themeConfig.cardBg }]}>
          <Text style={styles.avatar}>{user.avatar}</Text>
          <Text style={[styles.userName, { color: themeConfig.text }]}>
            {user.name}
          </Text>
          <Text style={[styles.userStats, { color: themeConfig.accent }]}>
            {user.steps.toLocaleString()} steps today
          </Text>
        </View>

        {/* Theme Selection */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeConfig.text }]}>
            Theme
          </Text>
          <View style={styles.themeOptions}>
            {(['black-neon', 'glassmorphism', 'light'] as Theme[]).map((themeOption) => (
              <TouchableOpacity
                key={themeOption}
                style={[
                  styles.themeOption,
                  { backgroundColor: themeConfig.cardBg },
                  theme === themeOption && { borderColor: themeConfig.accent, borderWidth: 2 }
                ]}
                onPress={() => onThemeChange(themeOption)}
              >
                <Text style={[styles.themeText, { color: themeConfig.text }]}>
                  {themeOption.charAt(0).toUpperCase() + themeOption.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeConfig.text }]}>
            Settings
          </Text>
          
          <View style={[styles.settingItem, { backgroundColor: themeConfig.cardBg }]}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingLabel, { color: themeConfig.text }]}>
                Notifications
              </Text>
              <Text style={[styles.settingDescription, { color: themeConfig.text }]}>
                Get notified about battles and challenges
              </Text>
            </View>
            <Switch
              value={settings.notificationsEnabled}
              onValueChange={(value) => handleSettingChange('notificationsEnabled', value)}
              trackColor={{ false: '#767577', true: themeConfig.accent }}
              thumbColor={settings.notificationsEnabled ? '#f4f3f4' : '#f4f3f4'}
            />
          </View>

          <View style={[styles.settingItem, { backgroundColor: themeConfig.cardBg }]}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingLabel, { color: themeConfig.text }]}>
                Auto Sync
              </Text>
              <Text style={[styles.settingDescription, { color: themeConfig.text }]}>
                Automatically sync with Google Fit
              </Text>
            </View>
            <Switch
              value={settings.autoSyncEnabled}
              onValueChange={(value) => handleSettingChange('autoSyncEnabled', value)}
              trackColor={{ false: '#767577', true: themeConfig.accent }}
              thumbColor={settings.autoSyncEnabled ? '#f4f3f4' : '#f4f3f4'}
            />
          </View>

          <View style={[styles.settingItem, { backgroundColor: themeConfig.cardBg }]}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingLabel, { color: themeConfig.text }]}>
                Privacy Mode
              </Text>
              <Text style={[styles.settingDescription, { color: themeConfig.text }]}>
                Hide your stats from other players
              </Text>
            </View>
            <Switch
              value={settings.privacyModeEnabled}
              onValueChange={(value) => handleSettingChange('privacyModeEnabled', value)}
              trackColor={{ false: '#767577', true: themeConfig.accent }}
              thumbColor={settings.privacyModeEnabled ? '#f4f3f4' : '#f4f3f4'}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  userCard: {
    padding: 30,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    fontSize: 48,
    marginBottom: 15,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  userStats: {
    fontSize: 16,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  themeOptions: {
    flexDirection: 'row',
    gap: 10,
  },
  themeOption: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  themeText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderRadius: 15,
    marginBottom: 10,
  },
  settingInfo: {
    flex: 1,
    marginRight: 15,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 12,
    opacity: 0.8,
  },
});

export default ProfileScreen; 