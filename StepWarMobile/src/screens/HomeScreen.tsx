import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User } from '../types';
import { themes } from '../constants/theme';

interface HomeScreenProps {
  user: User;
  theme: 'black-neon' | 'glassmorphism' | 'light';
  onAddSteps?: (steps: number) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ user, theme, onAddSteps }) => {
  const themeConfig = themes[theme];

  const handleAddSteps = () => {
    onAddSteps?.(100);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeConfig.background }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.greeting, { color: themeConfig.text }]}>
            Good morning, {user.name}! 👋
          </Text>
          <Text style={[styles.subtitle, { color: themeConfig.text }]}>
            Ready to conquer today's challenges?
          </Text>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: themeConfig.cardBg }]}>
            <Text style={[styles.statValue, { color: themeConfig.accent }]}>
              {user.steps.toLocaleString()}
            </Text>
            <Text style={[styles.statLabel, { color: themeConfig.text }]}>
              Steps Today
            </Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: themeConfig.cardBg }]}>
            <Text style={[styles.statValue, { color: themeConfig.accent }]}>
              {user.calories}
            </Text>
            <Text style={[styles.statLabel, { color: themeConfig.text }]}>
              Calories Burned
            </Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: themeConfig.cardBg }]}>
            <Text style={[styles.statValue, { color: themeConfig.accent }]}>
              {user.distance}km
            </Text>
            <Text style={[styles.statLabel, { color: themeConfig.text }]}>
              Distance
            </Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsContainer}>
          <Text style={[styles.sectionTitle, { color: themeConfig.text }]}>
            Quick Actions
          </Text>
          
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: themeConfig.button }]}
            onPress={handleAddSteps}
          >
            <Text style={[styles.actionButtonText, { color: themeConfig.background }]}>
              + Add 100 Steps
            </Text>
          </TouchableOpacity>
        </View>

        {/* Today's Summary */}
        <View style={styles.summaryContainer}>
          <Text style={[styles.sectionTitle, { color: themeConfig.text }]}>
            Today's Summary
          </Text>
          
          <View style={[styles.summaryCard, { backgroundColor: themeConfig.cardBg }]}>
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: themeConfig.text }]}>
                Current Rank
              </Text>
              <Text style={[styles.summaryValue, { color: themeConfig.accent }]}>
                #{user.rank}
              </Text>
            </View>
            
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: themeConfig.text }]}>
                Goal Progress
              </Text>
              <Text style={[styles.summaryValue, { color: themeConfig.accent }]}>
                {Math.round((user.steps / 10000) * 100)}%
              </Text>
            </View>
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
  header: {
    marginBottom: 30,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statCard: {
    flex: 1,
    padding: 20,
    borderRadius: 15,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  actionsContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  actionButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  summaryContainer: {
    marginBottom: 30,
  },
  summaryCard: {
    padding: 20,
    borderRadius: 15,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 14,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen; 