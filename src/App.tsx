import { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { LanguageSelector2Lang } from "./components/LanguageSelector2Lang";
import { ChineseKeyboardSetup } from "./components/ChineseKeyboardSetup";
import { TopBar } from "./components/TopBar";
import { Sidebar } from "./components/Sidebar";
import { HomeScreen } from "./components/HomeScreen";
import { StatsScreen } from "./components/StatsScreen";
import { ProfileScreen } from "./components/ProfileScreen";
import { ReviewScreen } from "./components/ReviewScreen";
import { SettingsScreen } from "./components/SettingsScreen";
import { LearningSession } from "./components/LearningSession";
import { ResultScreen } from "./components/ResultScreen";

type AppScreen = "welcome" | "language-select" | "keyboard-setup" | "main-app";
type MainScreen = "home" | "stats" | "profile" | "review" | "settings";

interface SessionResults {
  totalCorrect: number;
  totalQuestions: number;
  skills: { name: string; delta: number }[];
  newLevel: string;
  timeSpent: number;
}

export default function App() {
  const [appScreen, setAppScreen] = useState<AppScreen>("welcome");
  const [mainScreen, setMainScreen] = useState<MainScreen>("home");
  const [selectedLanguage, setSelectedLanguage] = useState<"english" | "chinese" | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLearningSession, setIsLearningSession] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [sessionResults, setSessionResults] = useState<SessionResults | null>(null);

  // User stats
  const [streak, setStreak] = useState(7);
  const [dailyGoal] = useState(5);
  const [dailyProgress, setDailyProgress] = useState(3);
  const [studyTime, setStudyTime] = useState("23m");

  const handleLanguageSelect = (lang: "english" | "chinese") => {
    setSelectedLanguage(lang);
    if (lang === "chinese") {
      setAppScreen("keyboard-setup");
    } else {
      setAppScreen("main-app");
    }
  };

  const handleStartMission = () => {
    setIsLearningSession(true);
  };

  const handleSessionComplete = (results: SessionResults) => {
    setSessionResults(results);
    setIsLearningSession(false);
    setShowResults(true);
    setDailyProgress((prev) => Math.min(prev + 1, dailyGoal));
  };

  const handleSessionExit = () => {
    setIsLearningSession(false);
  };

  const handleNextMission = () => {
    setShowResults(false);
    setMainScreen("home");
  };

  const handleReviewWeakSpots = () => {
    setShowResults(false);
    setMainScreen("review");
  };

  const handleReviewWeak = () => {
    setMainScreen("review");
  };

  const handleLanguageChange = (language: "english" | "chinese") => {
    setSelectedLanguage(language);
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[var(--bg-primary)]">
      <AnimatePresence mode="wait">
        {/* Welcome Screen */}
        {appScreen === "welcome" && (
          <WelcomeScreen
            key="welcome"
            onContinue={() => setAppScreen("language-select")}
          />
        )}

        {/* Language Selection */}
        {appScreen === "language-select" && (
          <LanguageSelector2Lang
            key="language-select"
            onSelect={handleLanguageSelect}
          />
        )}

        {/* Chinese Keyboard Setup */}
        {appScreen === "keyboard-setup" && (
          <ChineseKeyboardSetup
            key="keyboard-setup"
            onContinue={() => setAppScreen("main-app")}
            onSkip={() => setAppScreen("main-app")}
          />
        )}

        {/* Main App */}
        {appScreen === "main-app" && (
          <div key="main-app" className="min-h-screen flex flex-col">
            {/* Learning Session Overlay */}
            <AnimatePresence>
              {isLearningSession && (
                <div className="fixed inset-0 z-50 bg-[var(--bg-primary)]">
                  <LearningSession
                    selectedLanguage={selectedLanguage || "english"}
                    onComplete={handleSessionComplete}
                    onExit={handleSessionExit}
                  />
                </div>
              )}
            </AnimatePresence>

            {/* Result Screen Overlay */}
            <AnimatePresence>
              {showResults && sessionResults && (
                <div className="fixed inset-0 z-50 bg-[var(--bg-primary)]">
                  <ResultScreen
                    results={sessionResults}
                    onNextMission={handleNextMission}
                    onReviewWeakSpots={handleReviewWeakSpots}
                    selectedLanguage={selectedLanguage || "english"}
                  />
                </div>
              )}
            </AnimatePresence>

            {/* Sidebar */}
            <Sidebar
              isOpen={isSidebarOpen}
              onClose={() => setIsSidebarOpen(false)}
              currentScreen={mainScreen}
              onNavigate={(screen) => setMainScreen(screen as MainScreen)}
            />

            {/* Top Bar */}
            <TopBar
              onMenuClick={() => setIsSidebarOpen(true)}
              streak={streak}
              dailyGoal={dailyGoal}
              dailyProgress={dailyProgress}
              studyTime={studyTime}
            />

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto">
              <AnimatePresence mode="wait">
                {mainScreen === "home" && (
                  <HomeScreen
                    key="home"
                    onStartMission={handleStartMission}
                    onReviewWeak={handleReviewWeak}
                    selectedLanguage={selectedLanguage || "english"}
                  />
                )}

                {mainScreen === "stats" && (
                  <StatsScreen
                    key="stats"
                    selectedLanguage={selectedLanguage || "english"}
                  />
                )}

                {mainScreen === "profile" && (
                  <ProfileScreen
                    key="profile"
                    selectedLanguage={selectedLanguage || "english"}
                    onLanguageChange={handleLanguageChange}
                  />
                )}

                {mainScreen === "review" && (
                  <ReviewScreen
                    key="review"
                    selectedLanguage={selectedLanguage || "english"}
                  />
                )}

                {mainScreen === "settings" && (
                  <SettingsScreen key="settings" selectedLanguage={selectedLanguage || "english"} />
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}