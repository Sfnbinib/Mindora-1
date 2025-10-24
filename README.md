
# Mindora Language Learning App

AI-powered language learning platform supporting English and Chinese with modern glassmorphism UI.

## 🚀 Features

- **2 Languages**: English (CEFR A1-C2) and 中文 (HSK 1-9)
- **Chinese Keyboard Setup**: Guide for iOS and Android IME installation
- **6 Lesson Types**: Fill-in, Speaking (tones), Listening, Reading, AI Chat, Writing
- **Mission of the Day**: Progress tracking with CEFR/HSK badges
- **Glass UI**: Modern glassmorphism design
- **Responsive**: Mobile-first design

## 📁 Project Structure

```
src/
├── components/
│   ├── LanguageSelector2Lang.tsx    # 2-language selector (EN/中文)
│   ├── ChineseKeyboardSetup.tsx    # Chinese keyboard setup guide
│   ├── HomeScreen.tsx               # Mission of the Day with progress
│   ├── LearningSession.tsx          # 6 types of lessons
│   ├── ProfileScreen.tsx            # User profile with keyboard setup
│   ├── App.tsx                      # Main routing logic
│   └── ui/                          # Reusable UI components
├── styles/
│   └── globals.css                  # Global styles
└── main.tsx                         # App entry point
```

## 🎯 Lesson Types

1. **Fill-in**: Complete sentences with missing words
2. **Speaking**: Voice practice with tone analysis (Chinese)
3. **Listening**: Audio comprehension exercises
4. **Reading**: Text comprehension with questions
5. **AI Chat**: Conversational practice with AI tutor
6. **Writing**: Text composition with word count

## 🛠️ Tech Stack

- **React 18** + **TypeScript**
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Lucide React** for icons
- **Vite** for build tooling

## 🚀 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

## 🎨 Design System

- **Colors**: English (#5E8AFF), Chinese (#DE5042)
- **Glassmorphism**: Transparent elements with backdrop blur
- **Animations**: Smooth transitions with Framer Motion
- **Typography**: Modern, readable fonts
- **Responsive**: Mobile-first approach

## 📱 Mobile Support

- **iOS**: Chinese keyboard setup instructions
- **Android**: Gboard/IME configuration guide
- **Touch-friendly**: Optimized for mobile interactions
- **PWA Ready**: Can be installed as app

## 🔧 Development

- **TypeScript**: Full type safety
- **ESLint**: Code quality
- **Prettier**: Code formatting
- **Git**: Version control with feature branches

## 📝 Changelog

See [CHANGELOG.md](./CHANGELOG.md) for detailed changes.

## 🎯 Roadmap

- [ ] Real audio API integration
- [ ] Tone analysis for Chinese
- [ ] AI chat integration
- [ ] Progress tracking system
- [ ] Achievement system
- [ ] Offline support

## 📄 License

This project is part of the Mindora Language Learning Platform.
  