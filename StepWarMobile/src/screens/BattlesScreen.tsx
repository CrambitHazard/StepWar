import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Battle, User } from '../types';
import { themes } from '../constants/theme';

interface BattlesScreenProps {
  battles: Battle[];
  user: User;
  theme: 'black-neon' | 'glassmorphism' | 'light';
}

const BattlesScreen: React.FC<BattlesScreenProps> = ({ battles, user, theme }) => {
  const themeConfig = themes[theme];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeConfig.background }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Text style={[styles.title, { color: themeConfig.text }]}>
          Battles
        </Text>
        
        <View style={styles.battlesContainer}>
          {battles.map((battle) => (
            <TouchableOpacity
              key={battle.id}
              style={[styles.battleCard, { backgroundColor: themeConfig.cardBg }]}
            >
              <View style={styles.battleHeader}>
                <View style={styles.opponentInfo}>
                  <Text style={styles.avatar}>{battle.opponent.avatar}</Text>
                  <Text style={[styles.opponentName, { color: themeConfig.text }]}>
                    {battle.opponent.name}
                  </Text>
                </View>
                <Text style={[styles.timeLeft, { color: themeConfig.accent }]}>
                  {battle.timeLeft}
                </Text>
              </View>
              
              <View style={styles.battleStats}>
                <View style={styles.stat}>
                  <Text style={[styles.statLabel, { color: themeConfig.text }]}>You</Text>
                  <Text style={[styles.statValue, { color: themeConfig.accent }]}>
                    {battle.mySteps.toLocaleString()}
                  </Text>
                </View>
                <View style={styles.stat}>
                  <Text style={[styles.statLabel, { color: themeConfig.text }]}>Opponent</Text>
                  <Text style={[styles.statValue, { color: themeConfig.text }]}>
                    {battle.opponentSteps.toLocaleString()}
                  </Text>
                </View>
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
  battlesContainer: {
    gap: 15,
  },
  battleCard: {
    padding: 20,
    borderRadius: 15,
  },
  battleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  opponentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    fontSize: 24,
  },
  opponentName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  timeLeft: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  battleStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stat: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    marginBottom: 5,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BattlesScreen; 