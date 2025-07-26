Perfect — here’s your **custom-tailored roadmap** in your style:
✅ Task checklist, 🎯 AI coding prompts (ready to copy into ChatGPT/Gemini/Cursor), and ⚠️ Pitfalls to avoid.

All based on **React Native + Expo** with **Google Fit**, **Firebase**, and **QR-based offline battles**. Completely free to build and share via GitHub.

---

# 🧠 Project: **StepWar — Offline Battle Arena**

**Goal**: Build a free, fun, side-loaded APK React Native app where friend groups can create offline step count battles with local leaderboards using Google Fit.

---

## ✅ Phase 0: Environment Setup (Day 0)

### 📋 Tasks

* [ ] Install Node.js + Expo CLI
* [ ] Initialize new React Native project with Expo
* [ ] Set up Firebase project (Auth + Firestore)
* [ ] Add React Navigation

### 🤖 AI Prompt

> “Create a basic React Native project using Expo with Firebase Auth and React Navigation tabs. Structure it with screens for Home, Battle, History, and Profile.”

### ⚠️ Pitfalls

* Don’t use bare React Native (just use Expo for speed).
* Avoid complicated Firebase SDKs — use only what’s needed: Auth, Firestore (if needed), no Storage.

---

## ✅ Phase 1: Step Tracking + Graph (Day 1–2)

### 📋 Tasks

* [ ] Integrate Google Fit API (Android only via `react-native-google-fit`)
* [ ] Pull daily step count
* [ ] Display step count + line graph for today
* [ ] Cap at 30k steps/day
* [ ] Detect abnormal spikes (>100 steps in 5 sec) and flag

### 🤖 AI Prompt

> “Use `react-native-google-fit` to fetch daily step count data and render it on a line graph using `react-native-chart-kit`. Add logic to flag unrealistic spikes.”

### ⚠️ Pitfalls

* Google Fit **does not work in Expo Go** — you need to `expo run:android` with dev build.
* Always check permissions for `ACTIVITY_RECOGNITION`.
* Step data is stored in *buckets* — handle aggregation correctly.

---

## ✅ Phase 2: Authentication + Profile (Day 3)

### 📋 Tasks

* [ ] Add Firebase Anonymous login (no email/password needed)
* [ ] Store user ID locally
* [ ] Optional: Avatar + nickname
* [ ] Profile screen with total battles + steps

### 🤖 AI Prompt

> “Set up Firebase Auth with anonymous login in React Native using Expo and show current UID. Add an optional nickname and avatar stored in local state.”

### ⚠️ Pitfalls

* Don’t overcomplicate profile — no password resets or Google login yet.
* Avatar = emoji or icon only. No image upload.

---

## ✅ Phase 3: QR Code Battle System (Day 4–5)

### 📋 Tasks

* [ ] “Create Battle” screen → generate unique ID + QR code
* [ ] “Join Battle” screen → scan QR → join that session
* [ ] Store battle ID + participant IDs locally
* [ ] Start timer → sync step count every 5 min
* [ ] Show real-time leaderboard (local only)

### 🤖 AI Prompt

> “Use `react-native-qrcode-svg` to generate QR codes and `expo-barcode-scanner` to scan them. When scanned, join a local battle session. Track each user’s steps locally and update a leaderboard view.”

### ⚠️ Pitfalls

* QR must encode a unique **battle ID** + user ID.
* Use local storage (e.g. `AsyncStorage`) — avoid backend sync in MVP.
* Don’t attempt real-time sync with Firebase yet.

---

## ✅ Phase 4: Local Leaderboard + Anti-Cheat Graph (Day 6–7)

### 📋 Tasks

* [ ] Battle screen shows all participants and step counts
* [ ] Highlight cheaters if spike detected
* [ ] Display mini graph per player
* [ ] Declare winner on battle end
* [ ] Store result in local history

### 🤖 AI Prompt

> “Create a React Native battle leaderboard showing all participants, their step counts, and a small line chart for each (using `react-native-svg`). Highlight users with step spikes and declare winner at the end.”

### ⚠️ Pitfalls

* Don’t use a complex database — store history in `AsyncStorage`.
* Step syncing should stop exactly on battle end.
* If app crashes mid-battle, save state every minute.

---

## ✅ Phase 5: History + APK Sharing (Day 8–9)

### 📋 Tasks

* [ ] Add “Battle History” screen
* [ ] View past winners, durations, and step stats
* [ ] Build APK using `eas build`
* [ ] Upload APK to GitHub Releases
* [ ] Generate QR code to share install link

### 🤖 AI Prompt

> “Create a history screen in React Native listing past battles from local storage. Include opponent names, winner, step stats, and timestamps. Build the APK and share via GitHub.”

### ⚠️ Pitfalls

* Don’t over-design history — show last 10 battles with step summaries.
* Test APK on at least 2 phones.
* Check permissions on every fresh install — especially for Fit API.

---

## ✅ Optional: Micro Enhancements (Phase 6+)

| Feature                 | Time | Notes                                       |
| ----------------------- | ---- | ------------------------------------------- |
| Team Mode (Red vs Blue) | 1d   | Combine steps of teams in battle            |
| RPG Avatars + Leveling  | 1–2d | XP = steps; unlock roles like “Step Wizard” |
| “Event Mode”            | 1d   | Raid bosses, weekend missions               |
| Daily Bonus Challenges  | 1d   | “500 steps in 30 min = +5XP”                |
| Real-Time Toasts        | 0.5d | “You overtook Aman!” during battle          |

---

## 💥 Final Deliverables

* ✅ GitHub repo with:

  * Source code
  * `README.md`
  * Screenshots
  * APK link
  * QR code to install

* ✅ MVP with:

  * Local battles via QR
  * Step tracking via Google Fit
  * Simple anti-cheat graphs
  * Local leaderboard + history
  * Firebase anon login

---

### ⚠️ Final Pitfalls to Avoid

1. **Avoid Google Fit on iOS** – won’t work. This MVP is Android-only.
2. **Don’t force global sync** – keep it all local.
3. **Avoid complex permissions on startup** – handle them lazily, step by step.
4. **Don’t add notifications yet** – too much boilerplate.
5. **Skip backend** – Firebase is optional, only used for auth.

---

### 🎯 Want me to do any of these next?

* Generate AI prompts for each screen component
* Write a `README.md` for GitHub
* Build a Notion board for sprint tracking
* Create a simple battle flow diagram
* Draft the APK launch message for your group

Let’s go from “fun idea” to **live app** your friends actually use.
