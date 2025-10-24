import { motion } from "motion/react";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import {
  TrendingUp,
  Calendar,
  Clock,
  Award,
  Target,
  Flame,
  BarChart3,
} from "lucide-react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  AreaChart,
} from "recharts";

interface StatsScreenProps {
  selectedLanguage: string;
}

const skillData = [
  { skill: "Reading", value: 85 },
  { skill: "Writing", value: 72 },
  { skill: "Listening", value: 78 },
  { skill: "Speaking", value: 65 },
  { skill: "Grammar", value: 88 },
  { skill: "Vocabulary", value: 80 },
];

const dailyData = [
  { day: "Mon", minutes: 25, delta: 2 },
  { day: "Tue", minutes: 30, delta: 3 },
  { day: "Wed", minutes: 20, delta: 1 },
  { day: "Thu", minutes: 35, delta: 4 },
  { day: "Fri", minutes: 28, delta: 2 },
  { day: "Sat", minutes: 15, delta: 1 },
  { day: "Sun", minutes: 22, delta: 2 },
];

const weeklyData = [
  { week: "W1", level: 10.2 },
  { week: "W2", level: 10.5 },
  { week: "W3", level: 10.9 },
  { week: "W4", level: 11.3 },
  { week: "W5", level: 11.8 },
  { week: "W6", level: 12.1 },
];

const retentionData = [
  { day: 1, retention: 100 },
  { day: 2, retention: 85 },
  { day: 3, retention: 75 },
  { day: 7, retention: 60 },
  { day: 14, retention: 50 },
  { day: 30, retention: 40 },
];

export function StatsScreen({ selectedLanguage }: StatsScreenProps) {
  const isEnglish = selectedLanguage === "english";
  const gradient = isEnglish
    ? "linear-gradient(135deg, #5E8AFF 0%, #8B5CF6 100%)"
    : "linear-gradient(135deg, #DE5042 0%, #F59E0B 100%)";
  const primaryColor = isEnglish ? "#5E8AFF" : "#DE5042";

  const cefrLevel = "B1";
  const cefrProgress = 30; // Progress toward B2
  const totalStudyTime = 1847; // minutes

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="px-6 py-8 pb-24 overflow-y-auto space-y-6"
    >
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h1
          className="text-[#222] mb-2"
          style={{ fontSize: "2rem", fontWeight: 600 }}
        >
          Your Progress
        </h1>
        <p className="text-[#AAAAAB]" style={{ fontSize: "1rem" }}>
          Track your language learning journey
        </p>
      </motion.div>

      {/* CEFR/HSK Level Progress */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="glass-strong rounded-3xl p-6 relative overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-5"
          style={{ background: gradient }}
        />

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2
                className="text-[#222] mb-1"
                style={{ fontSize: "1.5rem", fontWeight: 600 }}
              >
                CEFR Level
              </h2>
              <p className="text-[#AAAAAB]" style={{ fontSize: "0.9375rem" }}>
                Common European Framework
              </p>
            </div>
            <Badge
              className="text-white border-0"
              style={{
                background: gradient,
                fontSize: "1.125rem",
                fontWeight: 700,
                padding: "0.75rem 1.5rem",
              }}
            >
              {cefrLevel}
            </Badge>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[#AAAAAB]" style={{ fontSize: "0.875rem" }}>
                Progress to B2
              </span>
              <span
                className="text-[#222]"
                style={{ fontSize: "0.875rem", fontWeight: 600 }}
              >
                {cefrProgress}%
              </span>
            </div>
            <Progress value={cefrProgress} className="h-3" />
          </div>

          {/* Level Scale */}
          <div className="grid grid-cols-6 gap-2">
            {["A1", "A2", "B1", "B2", "C1", "C2"].map((level, index) => (
              <div
                key={level}
                className={`
                  text-center py-2 rounded-xl transition-all
                  ${
                    level === cefrLevel
                      ? "text-white"
                      : "text-[#AAAAAB] bg-black/5"
                  }
                `}
                style={
                  level === cefrLevel
                    ? { background: gradient, fontSize: "0.875rem", fontWeight: 600 }
                    : { fontSize: "0.875rem" }
                }
              >
                {level}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 gap-3">
        {[
          {
            icon: Clock,
            label: "Study Time",
            value: `${Math.floor(totalStudyTime / 60)}h ${totalStudyTime % 60}m`,
            color: "#5E8AFF",
          },
          {
            icon: Flame,
            label: "Streak",
            value: "7 days",
            color: "#F59E0B",
          },
          {
            icon: Award,
            label: "Level",
            value: "12",
            color: "#8B5CF6",
          },
          {
            icon: Target,
            label: "Accuracy",
            value: "94%",
            color: "#10B981",
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 + index * 0.05 }}
            className="glass rounded-2xl p-5"
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
              style={{ background: `${stat.color}20` }}
            >
              <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
            </div>
            <p className="text-[#AAAAAB] mb-1" style={{ fontSize: "0.875rem" }}>
              {stat.label}
            </p>
            <p
              className="text-[#222]"
              style={{ fontSize: "1.5rem", fontWeight: 700 }}
            >
              {stat.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Skill Radar */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="glass rounded-3xl p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3
            className="text-[#222]"
            style={{ fontSize: "1.25rem", fontWeight: 600 }}
          >
            Skill Breakdown
          </h3>
          <BarChart3 className="w-5 h-5 text-[#AAAAAB]" />
        </div>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={skillData}>
              <PolarGrid stroke="rgba(0, 0, 0, 0.1)" />
              <PolarAngleAxis
                dataKey="skill"
                tick={{ fill: "#AAAAAB", fontSize: 13, fontWeight: 500 }}
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

        <div className="grid grid-cols-2 gap-3 mt-4">
          {skillData.slice(0, 4).map((skill) => (
            <div key={skill.skill} className="flex items-center justify-between">
              <span className="text-[#AAAAAB]" style={{ fontSize: "0.875rem" }}>
                {skill.skill}
              </span>
              <span
                className="text-[#222]"
                style={{ fontSize: "0.875rem", fontWeight: 600 }}
              >
                {skill.value}%
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Daily Activity */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="glass rounded-3xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3
            className="text-[#222]"
            style={{ fontSize: "1.25rem", fontWeight: 600 }}
          >
            Daily Activity
          </h3>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#AAAAAB]" />
            <span className="text-[#AAAAAB]" style={{ fontSize: "0.875rem" }}>
              This Week
            </span>
          </div>
        </div>

        <div className="flex items-end justify-between gap-2 mb-6 h-32">
          {dailyData.map((day, index) => {
            const maxMinutes = Math.max(...dailyData.map((d) => d.minutes));
            const heightPercent = (day.minutes / maxMinutes) * 100;

            return (
              <div
                key={day.day}
                className="flex-1 flex flex-col items-center gap-2"
              >
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${heightPercent}%` }}
                  transition={{ delay: 0.6 + index * 0.05, duration: 0.5 }}
                  className="w-full rounded-lg relative"
                  style={{
                    background: gradient,
                    minHeight: "0.5rem",
                  }}
                >
                  <span
                    className="absolute -top-6 left-1/2 -translate-x-1/2 text-[#222]"
                    style={{ fontSize: "0.75rem", fontWeight: 600 }}
                  >
                    {day.minutes}
                  </span>
                </motion.div>
                <span
                  className="text-[#AAAAAB]"
                  style={{ fontSize: "0.75rem", fontWeight: 600 }}
                >
                  {day.day}
                </span>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-black/5">
          <div>
            <p className="text-[#AAAAAB] mb-1" style={{ fontSize: "0.875rem" }}>
              Avg. per day
            </p>
            <p
              className="text-[#222]"
              style={{ fontSize: "1.25rem", fontWeight: 600 }}
            >
              25 min
            </p>
          </div>
          <div>
            <p className="text-[#AAAAAB] mb-1" style={{ fontSize: "0.875rem" }}>
              Best day
            </p>
            <p
              className="text-[#222]"
              style={{ fontSize: "1.25rem", fontWeight: 600 }}
            >
              35 min
            </p>
          </div>
        </div>
      </motion.div>

      {/* Weekly Progress Graph */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="glass rounded-3xl p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3
            className="text-[#222]"
            style={{ fontSize: "1.25rem", fontWeight: 600 }}
          >
            Level Progress
          </h3>
          <div className="flex items-center gap-2 text-[#10B981]">
            <TrendingUp className="w-4 h-4" />
            <span style={{ fontSize: "0.875rem", fontWeight: 600 }}>
              +1.9 levels
            </span>
          </div>
        </div>

        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={weeklyData}>
              <defs>
                <linearGradient id="levelGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={primaryColor} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={primaryColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="week"
                tick={{ fill: "#AAAAAB", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#AAAAAB", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                domain={[10, 13]}
              />
              <Tooltip
                contentStyle={{
                  background: "rgba(255, 255, 255, 0.9)",
                  border: "none",
                  borderRadius: "12px",
                  padding: "8px 12px",
                }}
              />
              <Area
                type="monotone"
                dataKey="level"
                stroke={primaryColor}
                strokeWidth={3}
                fill="url(#levelGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Retention Curve */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="glass rounded-3xl p-6"
      >
        <h3
          className="text-[#222] mb-4"
          style={{ fontSize: "1.25rem", fontWeight: 600 }}
        >
          Knowledge Retention
        </h3>

        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={retentionData}>
              <XAxis
                dataKey="day"
                tick={{ fill: "#AAAAAB", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                label={{
                  value: "Days",
                  position: "insideBottom",
                  offset: -5,
                  fill: "#AAAAAB",
                  fontSize: 12,
                }}
              />
              <YAxis
                tick={{ fill: "#AAAAAB", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                domain={[0, 100]}
                label={{
                  value: "Retention %",
                  angle: -90,
                  position: "insideLeft",
                  fill: "#AAAAAB",
                  fontSize: 12,
                }}
              />
              <Tooltip
                contentStyle={{
                  background: "rgba(255, 255, 255, 0.9)",
                  border: "none",
                  borderRadius: "12px",
                  padding: "8px 12px",
                }}
              />
              <Line
                type="monotone"
                dataKey="retention"
                stroke="#EF4444"
                strokeWidth={3}
                dot={{ fill: "#EF4444", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 glass-strong rounded-2xl p-4">
          <p className="text-[#AAAAAB]" style={{ fontSize: "0.875rem", lineHeight: 1.6 }}>
            Your retention curve shows that reviewing content after 7 days helps
            maintain 60% retention. Keep up with spaced repetition!
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
