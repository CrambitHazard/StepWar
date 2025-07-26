# 🧠 StepWar - Phase 0: Environment Setup Plan

## 📋 Project Overview
**Goal**: Build a React Native + Expo app for offline step count battles using Google Fit
**Timeline**: Day 0 (Environment Setup)
**Tech Stack**: React Native, Expo, Firebase Auth, React Navigation

---

## ✅ Phase 0 Tasks Checklist

### 1. Development Environment Setup
- [ ] Install Node.js (v18+ recommended)
- [ ] Install Expo CLI globally: `npm install -g @expo/cli`
- [ ] Install Android Studio (for Android development)
- [ ] Set up Android SDK and emulator
- [ ] Install Git and configure repository

### 2. Project Initialization
- [ ] Create new Expo project: `npx create-expo-app StepWar`
- [ ] Navigate to project directory
- [ ] Install core dependencies
- [ ] Configure app.json/app.config.js for Android focus
- [ ] Set up TypeScript (optional but recommended)

### 3. Firebase Project Setup
- [ ] Create Firebase project in console
- [ ] Enable Authentication (Anonymous auth only)
- [ ] Enable Firestore (for future use)
- [ ] Download google-services.json
- [ ] Configure Firebase in app

### 4. Navigation Structure
- [ ] Install React Navigation dependencies
- [ ] Set up tab navigation with 4 screens:
  - Home (Dashboard)
  - Battle (Create/Join battles)
  - History (Past battles)
  - Profile (User info)
- [ ] Create basic screen components
- [ ] Configure navigation types

### 5. Project Structure Setup
- [ ] Create organized folder structure:
  ```
  src/
  ├── components/
  ├── screens/
  ├── services/
  ├── utils/
  ├── types/
  └── constants/
  ```
- [ ] Set up basic component templates
- [ ] Configure ESLint and Prettier
- [ ] Add .gitignore for React Native

---

## 🛠️ Technical Implementation Steps

### Step 1: Environment Verification
```bash
# Verify installations
node --version
npm --version
expo --version
```

### Step 2: Project Creation
```bash
# Create project
npx create-expo-app StepWar --template blank-typescript

# Navigate to project
cd StepWar

# Install core dependencies
npm install @react-navigation/native @react-navigation/bottom-tabs
npm install react-native-screens react-native-safe-area-context
npm install firebase
npm install @react-native-async-storage/async-storage
```

### Step 3: Firebase Configuration
```bash
# Install Firebase
npm install firebase

# Add to app.json
{
  "expo": {
    "android": {
      "package": "com.stepwar.app",
      "googleServicesFile": "./google-services.json"
    }
  }
}
```

### Step 4: Navigation Setup
```typescript
// App.tsx structure
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Battle" component={BattleScreen} />
        <Tab.Screen name="History" component={HistoryScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
```

---

## 📁 Required File Structure

```
StepWar/
├── app.json
├── package.json
├── tsconfig.json
├── .gitignore
├── src/
│   ├── components/
│   │   ├── StepCounter.tsx
│   │   ├── BattleCard.tsx
│   │   └── Leaderboard.tsx
│   ├── screens/
│   │   ├── HomeScreen.tsx
│   │   ├── BattleScreen.tsx
│   │   ├── HistoryScreen.tsx
│   │   └── ProfileScreen.tsx
│   ├── services/
│   │   ├── firebase.ts
│   │   ├── googleFit.ts
│   │   └── storage.ts
│   ├── utils/
│   │   ├── constants.ts
│   │   └── helpers.ts
│   ├── types/
│   │   └── index.ts
│   └── constants/
│       ├── colors.ts
│       └── theme.ts
├── assets/
│   └── icons/
└── docs/
    └── README.md
```

---

## ⚠️ Critical Pitfalls to Avoid

### 1. Development Environment
- ❌ Don't use bare React Native (use Expo for speed)
- ❌ Don't install unnecessary Firebase services (only Auth + Firestore)
- ❌ Don't set up iOS development yet (Android-only MVP)

### 2. Firebase Setup
- ❌ Don't enable Google Sign-In (use Anonymous auth only)
- ❌ Don't set up Firebase Storage (not needed for MVP)
- ❌ Don't configure complex security rules yet

### 3. Navigation
- ❌ Don't use stack navigation for main flow (tabs are sufficient)
- ❌ Don't add complex navigation state management
- ❌ Don't implement deep linking yet

### 4. Project Structure
- ❌ Don't over-engineer the folder structure
- ❌ Don't add complex state management (use local state)
- ❌ Don't set up complex testing framework yet

---

## 🎯 Success Criteria

### ✅ Phase 0 Complete When:
- [ ] App runs on Android emulator/device
- [ ] Tab navigation works between 4 screens
- [ ] Firebase project is connected
- [ ] Anonymous authentication works
- [ ] Basic screen components are created
- [ ] Project structure is organized
- [ ] No TypeScript/ESLint errors

### 📱 Expected App Behavior:
- App launches to Home tab
- User can navigate between tabs
- Profile tab shows Firebase UID
- No crashes or errors in console
- Ready for Phase 1 (Google Fit integration)

---

## 🚀 Next Steps After Phase 0

1. **Phase 1**: Google Fit integration and step tracking
2. **Phase 2**: Enhanced authentication and user profiles
3. **Phase 3**: QR code battle system
4. **Phase 4**: Local leaderboards and anti-cheat
5. **Phase 5**: History and APK distribution

---

## 📝 Notes for Implementation

- Keep it simple - this is foundation work
- Focus on Android development only
- Use Expo managed workflow for easier development
- Test on physical Android device when possible
- Document any environment-specific issues
- Commit code frequently with clear messages

**Estimated Time**: 4-6 hours for complete setup
**Priority**: High (blocking all other phases)
