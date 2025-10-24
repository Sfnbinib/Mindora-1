import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import {
  Bell,
  Volume2,
  Smartphone,
  Shield,
  Info,
  ChevronRight,
  Check,
  Zap,
} from "lucide-react";

interface SettingsScreenProps {
  selectedLanguage: string;
}

export function SettingsScreen({ selectedLanguage }: SettingsScreenProps) {
  const [notifications, setNotifications] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [dailyReminder, setDailyReminder] = useState(true);
  const [autoPlay, setAutoPlay] = useState(false);
  const [volume, setVolume] = useState([75]);
  const [sessionLength, setSessionLength] = useState([15]);

  const isEnglish = selectedLanguage === "english";
  const gradient = isEnglish
    ? "linear-gradient(135deg, #5E8AFF 0%, #8B5CF6 100%)"
    : "linear-gradient(135deg, #DE5042 0%, #F59E0B 100%)";
  const primaryColor = isEnglish ? "#5E8AFF" : "#DE5042";

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
          Settings
        </h1>
        <p className="text-[#AAAAAB]" style={{ fontSize: "1rem" }}>
          Customize your learning experience
        </p>
      </motion.div>

      {/* Notifications */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="glass rounded-3xl p-6 mb-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <Bell className="w-5 h-5" style={{ color: primaryColor }} />
          <h3
            className="text-[#222]"
            style={{ fontSize: "1.125rem", fontWeight: 600 }}
          >
            Notifications
          </h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-2">
            <div>
              <Label
                className="text-[#222]"
                style={{ fontSize: "1rem", fontWeight: 600 }}
              >
                Push Notifications
              </Label>
              <p className="text-[#AAAAAB]" style={{ fontSize: "0.875rem" }}>
                Get updates about your progress
              </p>
            </div>
            <Switch checked={notifications} onCheckedChange={setNotifications} />
          </div>

          <div className="flex items-center justify-between py-2 border-t border-black/5">
            <div>
              <Label
                className="text-[#222]"
                style={{ fontSize: "1rem", fontWeight: 600 }}
              >
                Daily Reminder
              </Label>
              <p className="text-[#AAAAAB]" style={{ fontSize: "0.875rem" }}>
                Remind me to practice daily
              </p>
            </div>
            <Switch checked={dailyReminder} onCheckedChange={setDailyReminder} />
          </div>
        </div>
      </motion.div>

      {/* Audio & Sound */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="glass rounded-3xl p-6 mb-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <Volume2 className="w-5 h-5" style={{ color: primaryColor }} />
          <h3
            className="text-[#222]"
            style={{ fontSize: "1.125rem", fontWeight: 600 }}
          >
            Audio & Sound
          </h3>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label
                className="text-[#222]"
                style={{ fontSize: "1rem", fontWeight: 600 }}
              >
                Sound Effects
              </Label>
              <p className="text-[#AAAAAB]" style={{ fontSize: "0.875rem" }}>
                Play sounds for correct/incorrect
              </p>
            </div>
            <Switch checked={soundEffects} onCheckedChange={setSoundEffects} />
          </div>

          <div className="flex items-center justify-between border-t border-black/5 pt-4">
            <div>
              <Label
                className="text-[#222]"
                style={{ fontSize: "1rem", fontWeight: 600 }}
              >
                Auto-play Audio
              </Label>
              <p className="text-[#AAAAAB]" style={{ fontSize: "0.875rem" }}>
                Automatically play pronunciation
              </p>
            </div>
            <Switch checked={autoPlay} onCheckedChange={setAutoPlay} />
          </div>

          <div className="border-t border-black/5 pt-4">
            <div className="flex items-center justify-between mb-3">
              <Label
                className="text-[#222]"
                style={{ fontSize: "1rem", fontWeight: 600 }}
              >
                Volume
              </Label>
              <span
                className="text-[#222]"
                style={{ fontSize: "0.875rem", fontWeight: 600 }}
              >
                {volume[0]}%
              </span>
            </div>
            <Slider
              value={volume}
              onValueChange={setVolume}
              max={100}
              step={1}
              className="w-full"
            />
          </div>
        </div>
      </motion.div>

      {/* Learning Preferences */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="glass rounded-3xl p-6 mb-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-5 h-5" style={{ color: primaryColor }} />
          <h3
            className="text-[#222]"
            style={{ fontSize: "1.125rem", fontWeight: 600 }}
          >
            Learning Preferences
          </h3>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <Label
                className="text-[#222]"
                style={{ fontSize: "1rem", fontWeight: 600 }}
              >
                Session Length
              </Label>
              <span
                className="text-[#222]"
                style={{ fontSize: "0.875rem", fontWeight: 600 }}
              >
                {sessionLength[0]} min
              </span>
            </div>
            <Slider
              value={sessionLength}
              onValueChange={setSessionLength}
              min={5}
              max={60}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between mt-2">
              <span className="text-[#AAAAAB]" style={{ fontSize: "0.75rem" }}>
                5 min
              </span>
              <span className="text-[#AAAAAB]" style={{ fontSize: "0.75rem" }}>
                60 min
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* App Info */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="glass rounded-3xl p-6 mb-6 space-y-3"
      >
        <div className="flex items-center gap-2 mb-2">
          <Info className="w-5 h-5" style={{ color: primaryColor }} />
          <h3
            className="text-[#222]"
            style={{ fontSize: "1.125rem", fontWeight: 600 }}
          >
            About
          </h3>
        </div>

        {[
          { label: "Version", value: "1.0.0" },
          { label: "Privacy Policy", value: "", hasArrow: true },
          { label: "Terms of Service", value: "", hasArrow: true },
          { label: "Help & Support", value: "", hasArrow: true },
        ].map((item, index) => (
          <motion.button
            key={item.label}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 + index * 0.05 }}
            className="w-full flex items-center justify-between py-3 text-left hover:bg-white/10 rounded-xl px-3 -mx-3 transition-colors"
          >
            <span className="text-[#222]" style={{ fontSize: "0.9375rem" }}>
              {item.label}
            </span>
            {item.value ? (
              <span className="text-[#AAAAAB]" style={{ fontSize: "0.9375rem" }}>
                {item.value}
              </span>
            ) : (
              item.hasArrow && <ChevronRight className="w-5 h-5 text-[#AAAAAB]" />
            )}
          </motion.button>
        ))}
      </motion.div>

      {/* Data & Storage */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="space-y-3"
      >
        <Button
          variant="outline"
          className="w-full py-6 rounded-2xl border-2"
          style={{
            borderColor: primaryColor,
            color: primaryColor,
            fontSize: "1rem",
            fontWeight: 600,
          }}
        >
          <Shield className="mr-2 w-5 h-5" />
          Clear Cache
        </Button>

        <Button
          variant="outline"
          className="w-full py-6 rounded-2xl border-2 border-red-500 text-red-500 hover:bg-red-500/10"
          style={{ fontSize: "1rem", fontWeight: 600 }}
        >
          Reset All Progress
        </Button>
      </motion.div>
    </motion.div>
  );
}
