import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Label } from "./ui/label";
import {
  User,
  Target,
  Globe,
  Moon,
  Sun,
  Keyboard,
  Cloud,
  LogOut,
  ChevronRight,
  Check,
  Camera,
  BookOpen,
  MessageCircle,
  Scale,
} from "lucide-react";

interface ProfileScreenProps {
  selectedLanguage: "english" | "chinese";
  onLanguageChange: (language: "english" | "chinese") => void;
}

type LearningGoal = "exam" | "conversational" | "balanced";

const goals: { id: LearningGoal; label: string; icon: any; description: string }[] = [
  {
    id: "exam",
    label: "Exam Preparation",
    icon: BookOpen,
    description: "Focus on grammar and test strategies",
  },
  {
    id: "conversational",
    label: "Conversational",
    icon: MessageCircle,
    description: "Practice real-world speaking",
  },
  {
    id: "balanced",
    label: "Balanced",
    icon: Scale,
    description: "Mix of all skills equally",
  },
];

export function ProfileScreen({ selectedLanguage, onLanguageChange }: ProfileScreenProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<LearningGoal>("balanced");
  const [cloudSyncEnabled, setCloudSyncEnabled] = useState(true);
  const [showKeyboardGuide, setShowKeyboardGuide] = useState(false);

  const isEnglish = selectedLanguage === "english";
  const isChinese = selectedLanguage === "chinese";
  const gradient = isEnglish
    ? "linear-gradient(135deg, #5E8AFF 0%, #8B5CF6 100%)"
    : "linear-gradient(135deg, #DE5042 0%, #F59E0B 100%)";
  const primaryColor = isEnglish ? "#5E8AFF" : "#DE5042";

  const handleToggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen px-6 py-8 pb-24 overflow-y-auto"
    >
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8"
      >
        <h1
          className="text-[#222] mb-2"
          style={{ fontSize: "2rem", fontWeight: 600 }}
        >
          Profile
        </h1>
        <p className="text-[#AAAAAB]" style={{ fontSize: "1rem" }}>
          Customize your learning experience
        </p>
      </motion.div>

      {/* User Profile Card */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="glass-strong rounded-3xl p-6 mb-6 relative overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-5"
          style={{ background: gradient }}
        />

        <div className="relative z-10 flex items-center gap-4">
          <div className="relative">
            <Avatar className="w-24 h-24 border-4 border-white/50">
              <AvatarImage src="" />
              <AvatarFallback
                className="text-white"
                style={{
                  background: gradient,
                  fontSize: "2rem",
                  fontWeight: 600,
                }}
              >
                AJ
              </AvatarFallback>
            </Avatar>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute bottom-0 right-0 w-8 h-8 rounded-full flex items-center justify-center text-white shadow-lg"
              style={{ background: gradient }}
            >
              <Camera className="w-4 h-4" />
            </motion.button>
          </div>

          <div className="flex-1">
            <h2
              className="text-[#222] mb-1"
              style={{ fontSize: "1.5rem", fontWeight: 600 }}
            >
              Alex Johnson
            </h2>
            <p className="text-[#AAAAAB] mb-2" style={{ fontSize: "0.9375rem" }}>
              alex.johnson@email.com
            </p>
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-white"
              style={{ background: gradient, fontSize: "0.875rem", fontWeight: 600 }}
            >
              <User className="w-4 h-4" />
              Level 12 · B1.3
            </div>
          </div>
        </div>
      </motion.div>

      {/* Learning Goal */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-5 h-5" style={{ color: primaryColor }} />
          <h3
            className="text-[#222]"
            style={{ fontSize: "1.125rem", fontWeight: 600 }}
          >
            Learning Goal
          </h3>
        </div>

        <div className="space-y-3">
          {goals.map((goal, index) => {
            const isSelected = selectedGoal === goal.id;
            return (
              <motion.button
                key={goal.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                onClick={() => setSelectedGoal(goal.id)}
                className={`
                  w-full glass rounded-2xl p-4 flex items-center gap-4 text-left
                  transition-all duration-300 relative overflow-hidden
                  ${isSelected ? "ring-2 shadow-xl" : "hover:shadow-lg"}
                `}
                style={isSelected ? { ringColor: primaryColor } : {}}
              >
                {isSelected && (
                  <motion.div
                    layoutId="selectedGoal"
                    className="absolute inset-0 opacity-5"
                    style={{ background: gradient }}
                  />
                )}

                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center relative z-10"
                  style={{
                    background: isSelected ? gradient : `${primaryColor}20`,
                  }}
                >
                  <goal.icon
                    className="w-6 h-6"
                    style={{ color: isSelected ? "white" : primaryColor }}
                  />
                </div>

                <div className="flex-1 relative z-10">
                  <h4
                    className="text-[#222] mb-1"
                    style={{ fontSize: "1rem", fontWeight: 600 }}
                  >
                    {goal.label}
                  </h4>
                  <p className="text-[#AAAAAB]" style={{ fontSize: "0.875rem" }}>
                    {goal.description}
                  </p>
                </div>

                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-8 h-8 rounded-full flex items-center justify-center relative z-10"
                    style={{ background: gradient }}
                  >
                    <Check className="w-5 h-5 text-white" strokeWidth={3} />
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Settings */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="glass rounded-3xl p-6 mb-6 space-y-4"
      >
        <h3
          className="text-[#222] mb-2"
          style={{ fontSize: "1.125rem", fontWeight: 600 }}
        >
          Preferences
        </h3>

        {/* Language Toggle */}
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: `${primaryColor}20` }}
            >
              <Globe className="w-5 h-5" style={{ color: primaryColor }} />
            </div>
            <div>
              <Label
                className="text-[#222]"
                style={{ fontSize: "1rem", fontWeight: 600 }}
              >
                Learning Language
              </Label>
              <p className="text-[#AAAAAB]" style={{ fontSize: "0.875rem" }}>
                {isEnglish ? "English" : isChinese ? "中文 (Chinese)" : "Other"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <motion.button
              onClick={() => onLanguageChange("english")}
              className={`px-4 py-2 rounded-xl transition-all ${
                isEnglish ? "text-white" : "text-[#222] glass"
              }`}
              style={
                isEnglish
                  ? {
                      background: "linear-gradient(135deg, #5E8AFF 0%, #8B5CF6 100%)",
                      fontWeight: 600,
                    }
                  : { fontSize: "0.9375rem" }
              }
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              EN
            </motion.button>
            <motion.button
              onClick={() => onLanguageChange("chinese")}
              className={`px-4 py-2 rounded-xl transition-all ${
                isChinese ? "text-white" : "text-[#222] glass"
              }`}
              style={
                isChinese
                  ? {
                      background: "linear-gradient(135deg, #DE5042 0%, #F59E0B 100%)",
                      fontWeight: 600,
                    }
                  : { fontSize: "0.9375rem" }
              }
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              中文
            </motion.button>
          </div>
        </div>

        {/* Theme Toggle */}
        <div className="flex items-center justify-between py-3 border-t border-black/5">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: `${primaryColor}20` }}
            >
              {isDarkMode ? (
                <Moon className="w-5 h-5" style={{ color: primaryColor }} />
              ) : (
                <Sun className="w-5 h-5" style={{ color: primaryColor }} />
              )}
            </div>
            <div>
              <Label
                className="text-[#222]"
                style={{ fontSize: "1rem", fontWeight: 600 }}
              >
                Dark Mode
              </Label>
              <p className="text-[#AAAAAB]" style={{ fontSize: "0.875rem" }}>
                {isDarkMode ? "Enabled" : "Disabled"}
              </p>
            </div>
          </div>
          <Switch checked={isDarkMode} onCheckedChange={handleToggleTheme} />
        </div>

        {/* Cloud Sync */}
        <div className="flex items-center justify-between py-3 border-t border-black/5">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: `${primaryColor}20` }}
            >
              <Cloud className="w-5 h-5" style={{ color: primaryColor }} />
            </div>
            <div>
              <Label
                className="text-[#222]"
                style={{ fontSize: "1rem", fontWeight: 600 }}
              >
                Cloud Sync
              </Label>
              <p className="text-[#AAAAAB]" style={{ fontSize: "0.875rem" }}>
                Backup your progress
              </p>
            </div>
          </div>
          <Switch checked={cloudSyncEnabled} onCheckedChange={setCloudSyncEnabled} />
        </div>

        {/* Chinese Keyboard Guide */}
        {isChinese && (
          <motion.button
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="w-full flex items-center justify-between py-3 border-t border-black/5 text-left"
            onClick={() => setShowKeyboardGuide(!showKeyboardGuide)}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `${primaryColor}20` }}
              >
                <Keyboard className="w-5 h-5" style={{ color: primaryColor }} />
              </div>
              <div>
                <Label
                  className="text-[#222]"
                  style={{ fontSize: "1rem", fontWeight: 600 }}
                >
                  Chinese Keyboard Setup
                </Label>
                <p className="text-[#AAAAAB]" style={{ fontSize: "0.875rem" }}>
                  Learn to type in Chinese
                </p>
              </div>
            </div>
            <ChevronRight
              className="w-5 h-5 text-[#AAAAAB] transition-transform"
              style={{ transform: showKeyboardGuide ? "rotate(90deg)" : "rotate(0)" }}
            />
          </motion.button>
        )}

        {/* Keyboard Guide Content */}
        {isChinese && showKeyboardGuide && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="glass-strong rounded-2xl p-4 space-y-3"
          >
            <h4
              className="text-[#222]"
              style={{ fontSize: "0.9375rem", fontWeight: 600 }}
            >
              Setup Instructions
            </h4>
            <div className="space-y-2 text-[#AAAAAB]" style={{ fontSize: "0.875rem" }}>
              <p>1. Go to Settings → Keyboard → Add New Keyboard</p>
              <p>2. Select "Chinese - Simplified (Pinyin)"</p>
              <p>3. Enable handwriting recognition (optional)</p>
              <p>4. Practice typing with tone marks</p>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Logout Button */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Button
          variant="outline"
          className="w-full py-6 rounded-2xl border-2 border-red-500 text-red-500 hover:bg-red-500/10 hover:text-red-600"
          style={{ fontSize: "1rem", fontWeight: 600 }}
        >
          <LogOut className="mr-2 w-5 h-5" />
          Sign Out
        </Button>
      </motion.div>
    </motion.div>
  );
}
