import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Challenge } from '../types';
import { themes } from '../constants/theme';

interface ChallengesScreenProps {
  challenges: Challenge[];
  theme: 'black-neon' | 'glassmorphism' | 'light';
}

const ChallengesScreen: React.FC<ChallengesScreenProps> = ({ challenges, theme }) => {
  const themeConfig = themes[theme];

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeConfig.background }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Text style={[styles.title, { color: themeConfig.text }]}>
          Challenges
        </Text>
        
        <View style={styles.challengesContainer}>
          {challenges.map((challenge) => (
            <TouchableOpacity
              key={challenge.id}
              style={[styles.challengeCard, { backgroundColor: themeConfig.cardBg }]}
            >
              <View style={styles.challengeHeader}>
                <Text style={[styles.challengeTitle, { color: themeConfig.text }]}>
                  {challenge.title}
                </Text>
                <Text style={[styles.challengeType, { color: themeConfig.accent }]}>
                  {challenge.type}
                </Text>
              </View>
              
              <View style={styles.progressContainer}>
                <View style={styles.progressInfo}>
                  <Text style={[styles.progressText, { color: themeConfig.text }]}>
                    {challenge.current} / {challenge.target}
                  </Text>
                  <Text style={[styles.progressPercentage, { color: themeConfig.accent }]}>
                    {getProgressPercentage(challenge.current, challenge.target).toFixed(0)}%
                  </Text>
                </View>
                
                <View style={[styles.progressBar, { backgroundColor: themeConfig.text + '20' }]}>
                  <View 
                    style={[
                      styles.progressFill, 
                      { 
                        backgroundColor: themeConfig.accent,
                        width: `${getProgressPercentage(challenge.current, challenge.target)}%`
                      }
                    ]} 
                  />
                </View>
              </View>
              
              <Text style={[styles.deadline, { color: themeConfig.text }]}>
                Due: {new Date(challenge.deadline).toLocaleDateString()}
              </Text>
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
  challengesContainer: {
    gap: 15,
  },
  challengeCard: {
    padding: 20,
    borderRadius: 15,
  },
  challengeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  challengeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  challengeType: {
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  progressContainer: {
    marginBottom: 10,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressText: {
    fontSize: 14,
  },
  progressPercentage: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  deadline: {
    fontSize: 12,
    opacity: 0.8,
  },
});

export default ChallengesScreen; 