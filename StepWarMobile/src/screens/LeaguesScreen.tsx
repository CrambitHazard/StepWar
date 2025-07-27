import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { League, User } from '../types';
import { themes } from '../constants/theme';

interface LeaguesScreenProps {
  leagues: League[];
  user: User;
  theme: 'black-neon' | 'glassmorphism' | 'light';
}

const LeaguesScreen: React.FC<LeaguesScreenProps> = ({ leagues, user, theme }) => {
  const themeConfig = themes[theme];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeConfig.background }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Text style={[styles.title, { color: themeConfig.text }]}>
          Leagues
        </Text>
        
        <View style={styles.leaguesContainer}>
          {leagues.map((league) => (
            <TouchableOpacity
              key={league.id}
              style={[styles.leagueCard, { backgroundColor: themeConfig.cardBg }]}
            >
              <View style={styles.leagueHeader}>
                <Text style={[styles.leagueName, { color: themeConfig.text }]}>
                  {league.name}
                </Text>
                <Text style={[styles.leagueMembers, { color: themeConfig.accent }]}>
                  {league.members} members
                </Text>
              </View>
              
              <View style={styles.leagueInfo}>
                <Text style={[styles.leagueType, { color: themeConfig.text }]}>
                  {league.isPublic ? 'Public' : 'Private'}
                </Text>
                <Text style={[styles.leagueCode, { color: themeConfig.accent }]}>
                  Code: {league.joinCode}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
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
  leaguesContainer: {
    gap: 15,
  },
  leagueCard: {
    padding: 20,
    borderRadius: 15,
  },
  leagueHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  leagueName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  leagueMembers: {
    fontSize: 14,
  },
  leagueInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leagueType: {
    fontSize: 12,
    opacity: 0.8,
  },
  leagueCode: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default LeaguesScreen; 