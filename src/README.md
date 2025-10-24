# Mindora - Next-Generation Language Learning App

A futuristic, glassmorphic language learning application built with React, TypeScript, and Tailwind CSS.

## 🎨 Design System

### Style & Atmosphere
- **Visual Language**: Futuristic, minimalistic with Apple-level clarity and Duolingo-like friendliness
- **Mood**: Calm, intelligent, inspiring focus and daily consistency
- **Materials**: Glassmorphism with backdrop blur, soft gradients, rounded corners
- **Typography**: SF Pro / Inter with clean, readable hierarchy

### Color Palette

#### English Mode
- Primary: `#5E8AFF` (Blue-Violet)
- Gradient: `linear-gradient(135deg, #5E8AFF 0%, #8B5CF6 100%)`

#### Chinese Mode
- Primary: `#DE5042` (Red-Gold)
- Gradient: `linear-gradient(135deg, #DE5042 0%, #F59E0B 100%)`

#### Global Colors
- Background: `#F4F6FA`
- Text Primary: `#222222`
- Text Secondary: `#AAAAAB`
- Dark Mode Background: `#0B0E14`
- Dark Mode Accent: Glowing blue `#5E8AFF`

## 📱 App Structure

### Core Screens

1. **Welcome Screen**
   - Hero introduction with animated gradients
   - Floating background elements
   - Call-to-action button

2. **Language Selector**
   - 6 language options (English, Chinese, Spanish, French, Japanese, German)
   - Interactive cards with hover effects
   - Flag icons and native names

3. **Main App** (with persistent Top Bar & Sidebar)
   
   **Top Bar Components:**
   - Logo (left)
   - Daily goal progress ring (center)
   - Streak counter 🔥 and timer ⏱ (right)
   
   **Sidebar Navigation:**
   - Home
   - Stats
   - Profile
   - Review
   - Settings

### Feature Screens

#### Home Screen
- **Mission of the Day Card**: Circular progress ring (0-100%), CEFR/HSK badge
- **Skill Radar**: Interactive radar chart showing 6 skill areas
- **Weekly Summary**: Bar chart with daily activity
- **Quick Stats**: Level, points, accuracy
- Start Mission button

#### Learning Session (3 Blocks × 5 min)
1. **Review Block**: SRS flashcard system
2. **Context Block**: Listening/reading comprehension
3. **Practice Block**: Speaking/writing with AI feedback

**Features:**
- Real-time progress tracker
- Timer with pause functionality
- Block indicators with completion status
- Exit confirmation

#### Result Screen
- **Animated Level Growth**: B1 → B1.3 progression
- **Skill Deltas**: +2 Reading, +3 Listening, etc.
- **AI Feedback**: Personalized insights
- **Actions**: Next Mission / Review Weak Spots

#### Stats Screen
- **CEFR/HSK Progress**: Level bar with completion percentage
- **Skill Breakdown**: Radar chart for 6 skills
- **Daily Activity**: 7-day bar chart
- **Weekly Progress**: Line chart showing level progression
- **Retention Curve**: Knowledge retention over time
- **Total Study Time**: Cumulative time tracking

#### Profile Screen
- **User Avatar**: Editable profile picture
- **Learning Goal Selection**: Exam / Conversational / Balanced
- **Language Toggle**: EN ↔ 中文 switcher
- **Theme Switch**: Light / Dark mode
- **Chinese Keyboard Guide**: Expandable setup instructions
- **Cloud Sync**: Toggle backup functionality
- **Sign Out**: Logout button

#### Review Screen
Three tabs with smooth transitions:

1. **Flashcards**
   - SRS algorithm with flip cards
   - Response buttons: Again / Good / Easy
   - Progress tracking

2. **Tones** (Chinese only)
   - 4 tone examples with audio
   - Interactive tone practice
   - Real-time accuracy feedback

3. **Speaking**
   - Voice recording with microphone
   - AI pronunciation analysis
   - Practice phrase suggestions

#### Settings Screen
- **Notifications**: Push notifications, daily reminders
- **Audio & Sound**: Volume control, sound effects, auto-play
- **Learning Preferences**: Session length slider
- **About**: Version, privacy policy, help & support
- **Data Management**: Clear cache, reset progress

## 🎯 Design Principles

### One-Screen Sections
Each content area fits within a single screen height - no long scrolling required

### Smooth Transitions
- Screen-to-screen transitions using Motion (Framer Motion)
- Sidebar slide-in/out animation
- Progress ring animations
- Radar chart smooth rendering

### Micro-Animations
- Progress rings with easing
- Button hover/tap effects
- Card scaling on interaction
- Fade-in/out transitions
- Layout shift animations

### Visual Consistency
- Glass material with `backdrop-filter: blur(20px)`
- Soft shadows: `0 8px 32px rgba(0, 0, 0, 0.1)`
- Rounded corners: `1rem` (16px) default
- Consistent spacing scale: 4px, 8px, 12px, 16px, 24px, 32px

### Responsive Design
- Mobile-first approach (375px - 428px)
- Tablet optimization (768px - 1024px)
- Flexible grid layouts
- Touch-friendly tap targets (minimum 44px)

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Motion (Framer Motion)
- **Charts**: Recharts
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React

## 📦 Component Structure

```
/components
├── WelcomeScreen.tsx         # Onboarding
├── LanguageSelector.tsx      # Language selection
├── TopBar.tsx                # Persistent header
├── Sidebar.tsx               # Navigation drawer
├── HomeScreen.tsx            # Main dashboard
├── LearningSession.tsx       # 3-block learning flow
├── ResultScreen.tsx          # Post-session results
├── StatsScreen.tsx           # Analytics & progress
├── ProfileScreen.tsx         # User settings
├── ReviewScreen.tsx          # SRS flashcards & practice
├── SettingsScreen.tsx        # App preferences
└── ui/                       # Shadcn components
```

## 🎨 Key Features

### Glassmorphism
Custom CSS classes in `globals.css`:
- `.glass`: Standard glass effect
- `.glass-strong`: Enhanced opacity for cards

### Language-Specific Theming
Colors automatically adapt based on selected language:
- English: Blue-violet gradient
- Chinese: Red-gold gradient
- Other languages: Custom gradients

### Spaced Repetition System (SRS)
Flashcards appear at optimal intervals based on:
- User response (Again/Good/Easy)
- Previous interval
- Ease factor

### AI Integration Points
- Speaking pronunciation analysis
- Writing feedback and suggestions
- Personalized learning insights
- Adaptive difficulty

## 🚀 Getting Started

The app is fully interactive and ready for mobile/tablet deployment. All screens demonstrate:
- Smooth navigation flows
- Responsive layouts
- Touch interactions
- Progress persistence
- Theme switching
- Multi-language support

## 📱 Mobile Integration Ready

The design follows mobile-first principles and is optimized for:
- iOS (iPhone 12 Pro and above)
- Android (modern devices)
- Tablets (iPad, Android tablets)

All touch targets meet accessibility standards and the glassmorphic UI performs well on modern mobile browsers.
