# 📁 Mindora Project Structure

## 🎯 Overview
Complete language learning app with 2-language support (English/中文) and modern glassmorphism UI.

## 📂 Directory Structure

```
Mindora Language Learning App/
├── 📄 README.md                    # Project documentation
├── 📄 CHANGELOG.md                 # Version history
├── 📄 PROJECT_STRUCTURE.md         # This file
├── 📄 .gitignore                   # Git ignore rules
├── 📄 package.json                 # Dependencies & scripts
├── 📄 vite.config.ts               # Vite configuration
├── 📄 index.html                   # Entry HTML
│
├── 📁 src/                         # Source code
│   ├── 📄 main.tsx                 # React entry point
│   ├── 📄 App.tsx                  # Main app component
│   ├── 📄 index.css                # Global styles
│   │
│   ├── 📁 components/              # React components
│   │   ├── 🆕 LanguageSelector2Lang.tsx    # 2-language selector
│   │   ├── 🆕 ChineseKeyboardSetup.tsx     # Keyboard setup guide
│   │   ├── ✏️ HomeScreen.tsx              # Mission of the Day
│   │   ├── ✏️ LearningSession.tsx         # 6 lesson types
│   │   ├── ✏️ ProfileScreen.tsx           # User profile
│   │   ├── 📄 App.tsx                     # Main routing
│   │   │
│   │   ├── 📁 ui/                  # Reusable UI components
│   │   │   ├── button.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── progress.tsx
│   │   │   └── ... (40+ components)
│   │   │
│   │   └── 📁 figma/               # Figma integration
│   │       └── ImageWithFallback.tsx
│   │
│   ├── 📁 styles/                  # Styling
│   │   └── globals.css
│   │
│   └── 📁 guidelines/              # Documentation
│       └── Guidelines.md
```

## 🆕 New Components

### LanguageSelector2Lang.tsx
- **Purpose**: 2-language selector (English/中文 only)
- **Features**: CEFR/HSK badges, glassmorphism design
- **Props**: `onSelect: (lang: "english" | "chinese") => void`

### ChineseKeyboardSetup.tsx
- **Purpose**: Chinese keyboard installation guide
- **Features**: iOS/Android instructions, step-by-step guide
- **Props**: `onContinue`, `onSkip` callbacks

## ✏️ Updated Components

### App.tsx
- **New routing**: Added `keyboard-setup` screen
- **Language logic**: Chinese → keyboard setup, English → main app
- **Type safety**: Strict typing for language selection

### HomeScreen.tsx
- **Mission of the Day**: Progress ring, CEFR/HSK badges
- **Action buttons**: Start/Continue, Review weak spots
- **Language-specific**: Different labels for EN/中文

### LearningSession.tsx
- **6 lesson types**: fill-in, speaking, listening, reading, chat, writing
- **Chinese tones**: Special tone analysis for 中文
- **AI integration**: Chat and writing feedback

### ProfileScreen.tsx
- **Keyboard setup**: Link to Chinese keyboard guide
- **Language switching**: EN/中文 toggle
- **Type safety**: Updated interfaces

## 🎨 Design System

### Colors
- **English**: #5E8AFF (blue gradient)
- **Chinese**: #DE5042 (red gradient)
- **Glass**: rgba(255,255,255,0.6) with backdrop-blur

### Typography
- **Headers**: 2rem, font-weight: 600
- **Body**: 1rem, font-weight: 500
- **Captions**: 0.875rem, font-weight: 400

### Animations
- **Framer Motion**: Smooth transitions
- **Hover effects**: Scale and color changes
- **Loading states**: Opacity and transform animations

## 🚀 Git History

```
6b0d28b Update README.md with project structure and add .gitignore
046d242 Add changelog documenting 2-language support implementation
36f8c38 Initial commit: Mindora Language Learning App with 2-language support
```

## 📱 Mobile Support

### iOS Chinese Keyboard
1. Settings → General → Keyboard → Keyboards
2. Add New Keyboard → Chinese – Simplified (Pinyin)
3. Enable handwriting (optional)
4. Switch via 🌐 key

### Android Chinese Keyboard
1. Settings → System → Languages & input
2. On-screen keyboard → Add Chinese (Simplified) – Pinyin
3. Enable handwriting (optional)
4. Switch via keyboard icon

## 🔧 Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📊 File Statistics

- **Total files**: 73
- **Components**: 15
- **UI components**: 40+
- **Languages supported**: 2 (English, 中文)
- **Lesson types**: 6
- **Git commits**: 3

## 🎯 Next Steps

1. **Audio integration**: Real audio API for listening exercises
2. **Tone analysis**: Chinese tone recognition
3. **AI chat**: OpenAI integration for conversations
4. **Progress tracking**: User progress persistence
5. **Offline support**: PWA capabilities
6. **Testing**: Unit and integration tests
