import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Play,
  TrendingUp,
  BookOpen,
  MessageSquare,
  Headphones,
  Calendar,
} from "lucide-react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

interface HomeScreenProps {
  onStartMission: () => void;
  onReviewWeak?: () => void;
  selectedLanguage: "english" | "chinese";
}

const skillData = [
  { skill: "Reading", value: 85 },
  { skill: "Writing", value: 72 },
  { skill: "Listening", value: 78 },
  { skill: "Speaking", value: 65 },
  { skill: "Grammar", value: 88 },
  { skill: "Vocabulary", value: 80 },
];

const weeklyData = [
  { day: "Mon", minutes: 25, completed: true },
  { day: "Tue", minutes: 30, completed: true },
  { day: "Wed", minutes: 20, completed: true },
  { day: "Thu", minutes: 35, completed: true },
  { day: "Fri", minutes: 28, completed: true },
  { day: "Sat", minutes: 15, completed: true },
  { day: "Sun", minutes: 0, completed: false },
];

export function HomeScreen({ onStartMission, onReviewWeak, selectedLanguage }: HomeScreenProps) {
  const isEnglish = selectedLanguage === "english";
  const gradient = isEnglish
    ? "linear-gradient(135deg, #5E8AFF 0%, #8B5CF6 100%)"
    : "linear-gradient(135deg, #DE5042 0%, #F59E0B 100%)";
  const primaryColor = isEnglish ? "#5E8AFF" : "#DE5042";

  const missionProgress = 65; // 0-100%
  const levelLabel = isEnglish ? "CEFR: B1 · 63%" : "HSK: 3 · 63%";
  const goal = "5 min/day";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="px-6 py-8 pb-24 overflow-y-auto space-y-6"
    >
      {/* Mission of the Day Card */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="glass-strong rounded-3xl p-6 relative overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-5"
          style={{ background: gradient }}
        />

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2
                className="text-[#222] mb-1"
                style={{ fontSize: "1.5rem", fontWeight: 600 }}
              >
                Mission of the Day
              </h2>
              <p className="text-[#AAAAAB]" style={{ fontSize: "0.9375rem" }}>
                Complete today's learning mission
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge
                className="text-white border-0"
                style={{
                  background: gradient,
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  padding: "0.5rem 1rem",
                }}
              >
                {levelLabel}
              </Badge>
              <Badge
                className="bg-white/70 border border-white/80 text-slate-700"
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  padding: "0.5rem 1rem",
                }}
              >
                Goal: {goal}
              </Badge>
            </div>
          </div>

          {/* Progress Ring */}
          <div className="flex items-center gap-6 mb-6">
            <div className="relative w-32 h-32 flex-shrink-0">
              <svg className="w-32 h-32" style={{ transform: "rotate(-90deg)" }}>
                {/* Background circle */}
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  fill="none"
                  stroke="rgba(0, 0, 0, 0.05)"
                  strokeWidth="8"
                />
                {/* Progress circle */}
                <motion.circle
                  cx="64"
                  cy="64"
                  r="56"
                  fill="none"
                  stroke="url(#progressGradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: "0 352" }}
                  animate={{
                    strokeDasharray: `${(missionProgress / 100) * 352} 352`,
                  }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
                <defs>
                  <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={isEnglish ? "#5E8AFF" : "#DE5042"} />
                    <stop offset="100%" stopColor={isEnglish ? "#8B5CF6" : "#F59E0B"} />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span
                  className="text-[#222]"
                  style={{ fontSize: "2rem", fontWeight: 700, lineHeight: 1 }}
                >
                  {missionProgress}%
                </span>
                <span
                  className="text-[#AAAAAB]"
                  style={{ fontSize: "0.75rem" }}
                >
                  Complete
                </span>
              </div>
            </div>

            <div className="flex-1 space-y-3">
              {[
                { icon: BookOpen, label: "Review", status: "Done", color: "#10B981" },
                { icon: Headphones, label: "Context", status: "Done", color: "#10B981" },
                { icon: MessageSquare, label: isEnglish ? "Speaking" : "Speaking (tones)", status: "Next", color: primaryColor },
              ].map((phase, index) => (
                <motion.div
                  key={phase.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `${phase.color}20` }}
                  >
                    <phase.icon
                      className="w-5 h-5"
                      style={{ color: phase.color }}
                    />
                  </div>
                  <div className="flex-1">
                    <p
                      className="text-[#222]"
                      style={{ fontSize: "0.9375rem", fontWeight: 600 }}
                    >
                      {phase.label}
                    </p>
                  </div>
                  <span
                    style={{
                      color: phase.color,
                      fontSize: "0.875rem",
                      fontWeight: 600,
                    }}
                  >
                    {phase.status}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={onStartMission}
              className="flex-1 py-6 rounded-2xl text-white shadow-xl group"
              style={{
                background: gradient,
                fontSize: "1.125rem",
                fontWeight: 600,
              }}
            >
              <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
              Start / Continue
            </Button>
            {onReviewWeak && (
              <Button
                onClick={onReviewWeak}
                className="px-4 py-2 rounded-xl bg-white/70 border border-white/80 text-slate-700"
                style={{
                  fontSize: "1rem",
                  fontWeight: 600,
                }}
              >
                Review weak spots
              </Button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Skill Radar */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="glass rounded-3xl p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3
            className="text-[#222]"
            style={{ fontSize: "1.25rem", fontWeight: 600 }}
          >
            Skill Overview
          </h3>
          <TrendingUp className="w-5 h-5 text-[#10B981]" />
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={skillData}>
              <PolarGrid stroke="rgba(0, 0, 0, 0.1)" />
              <PolarAngleAxis
                dataKey="skill"
                tick={{ fill: "#AAAAAB", fontSize: 12 }}
              />
              <Radar
                name="Skills"
                dataKey="value"
                stroke={primaryColor}
                fill={primaryColor}
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Weekly Summary */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="glass rounded-3xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3
            className="text-[#222]"
            style={{ fontSize: "1.25rem", fontWeight: 600 }}
          >
            This Week
          </h3>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#AAAAAB]" />
            <span className="text-[#AAAAAB]" style={{ fontSize: "0.875rem" }}>
              Oct 20 - 26
            </span>
          </div>
        </div>

        <div className="flex items-end justify-between gap-2 mb-4">
          {weeklyData.map((day, index) => {
            const maxMinutes = Math.max(...weeklyData.map((d) => d.minutes));
            const heightPercent = day.minutes > 0 ? (day.minutes / maxMinutes) * 100 : 10;

            return (
              <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${heightPercent}%` }}
                  transition={{ delay: 0.5 + index * 0.05, duration: 0.5 }}
                  className="w-full rounded-lg relative"
                  style={{
                    background: day.completed
                      ? gradient
                      : "rgba(0, 0, 0, 0.05)",
                    minHeight: "1rem",
                  }}
                >
                  {day.minutes > 0 && (
                    <span
                      className="absolute -top-6 left-1/2 -translate-x-1/2 text-[#222]"
                      style={{ fontSize: "0.75rem", fontWeight: 600 }}
                    >
                      {day.minutes}
                    </span>
                  )}
                </motion.div>
                <span
                  className={day.completed ? "text-[#222]" : "text-[#AAAAAB]"}
                  style={{ fontSize: "0.75rem", fontWeight: 600 }}
                >
                  {day.day}
                </span>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-black/5">
          <div>
            <p className="text-[#AAAAAB]" style={{ fontSize: "0.875rem" }}>
              Total time
            </p>
            <p
              className="text-[#222]"
              style={{ fontSize: "1.5rem", fontWeight: 600 }}
            >
              153 min
            </p>
          </div>
          <div className="text-right">
            <p className="text-[#AAAAAB]" style={{ fontSize: "0.875rem" }}>
              Streak
            </p>
            <p
              className="text-[#222]"
              style={{ fontSize: "1.5rem", fontWeight: 600 }}
            >
              6 days
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
