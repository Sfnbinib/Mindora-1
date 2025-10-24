# Changelog - Mindora Language Learning App

## [1.0.0] - 2025-01-27

### Added
- **LanguageSelector2Lang.tsx** - Новый селектор языков только для English и 中文
- **ChineseKeyboardSetup.tsx** - Экран установки китайской клавиатуры с инструкциями для iOS и Android
- **Обновленный роутинг** - Добавлен экран keyboard-setup для китайского языка
- **Mission of the Day** - Обновлен HomeScreen с CEFR/HSK бейджами и кнопками
- **Новые типы уроков** - Поддержка fill-in, voice (tones), listening/reading, AI chat, writing
- **Glass UI** - Обновлен дизайн с glassmorphism эффектами

### Changed
- **App.tsx** - Обновлен роутинг для поддержки keyboard-setup экрана
- **HomeScreen.tsx** - Добавлены CEFR/HSK бейджи и кнопка "Review weak spots"
- **LearningSession.tsx** - Расширена поддержка новых типов вопросов
- **ProfileScreen.tsx** - Обновлены типы для поддержки только English/中文

### Features
- **2 языка**: English (CEFR A1-C2) и 中文 (HSK 1-9)
- **Китайская клавиатура**: Гайд по установке IME для iOS и Android
- **Типы уроков**:
  - Fill-in: Ввод слова/иероглифа
  - Speaking: Голос с тональным анализом для китайского
  - Listening: Аудио + выбор ответа
  - Reading: Текст + выбор ответа
  - AI Chat: Диалог с ИИ-тьютором
  - Writing: Написание текста с подсчетом слов
- **Mission of the Day**: Прогресс-кольцо, бейджи уровня, кнопки действий
- **Glass UI**: Современный дизайн с прозрачными элементами

### Technical
- React + TypeScript + Tailwind CSS
- Framer Motion для анимаций
- Lucide React для иконок
- Поддержка только 2 языков (упрощенная архитектура)
- Типизированные интерфейсы для всех компонентов

### Files Added
- `src/components/LanguageSelector2Lang.tsx`
- `src/components/ChineseKeyboardSetup.tsx`

### Files Modified
- `src/App.tsx` - роутинг и типы
- `src/components/HomeScreen.tsx` - Mission of the Day
- `src/components/LearningSession.tsx` - новые типы уроков
- `src/components/ProfileScreen.tsx` - типы и Keyboard Setup

### Next Steps
- Добавить реальную интеграцию с аудио API
- Реализовать тональный анализ для китайского
- Добавить AI чат интеграцию
- Создать систему прогресса и достижений
