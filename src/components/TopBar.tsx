import { motion } from "motion/react";
import { Flame, Clock, Menu, Target } from "lucide-react";
import { Button } from "./ui/button";

interface TopBarProps {
  onMenuClick: () => void;
  streak: number;
  dailyGoal: number;
  dailyProgress: number;
  studyTime: string;
}

export function TopBar({
  onMenuClick,
  streak,
  dailyGoal,
  dailyProgress,
  studyTime,
}: TopBarProps) {
  const goalPercentage = (dailyProgress / dailyGoal) * 100;

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="glass-strong px-6 py-4 flex items-center justify-between sticky top-0 z-50 border-b border-white/10"
    >
      {/* Left: Menu + Logo */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="rounded-xl hover:bg-white/20 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </Button>
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #5E8AFF 0%, #8B5CF6 100%)",
            }}
          >
            <span className="text-white" style={{ fontSize: "1rem", fontWeight: 700 }}>
              M
            </span>
          </div>
          <span
            className="text-[#222] hidden sm:block"
            style={{ fontSize: "1.125rem", fontWeight: 600 }}
          >
            Mindora
          </span>
        </div>
      </div>

      {/* Center: Daily Goal */}
      <motion.div
        className="glass rounded-full px-4 py-2 flex items-center gap-3"
        whileHover={{ scale: 1.05 }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center relative"
            style={{ background: "rgba(94, 138, 255, 0.2)" }}
          >
            {/* Progress ring */}
            <svg className="w-8 h-8 absolute" style={{ transform: "rotate(-90deg)" }}>
              <circle
                cx="16"
                cy="16"
                r="14"
                fill="none"
                stroke="rgba(94, 138, 255, 0.3)"
                strokeWidth="2"
              />
              <motion.circle
                cx="16"
                cy="16"
                r="14"
                fill="none"
                stroke="#5E8AFF"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ strokeDasharray: "0 100" }}
                animate={{
                  strokeDasharray: `${goalPercentage} 100`,
                }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </svg>
            <Target className="w-4 h-4 text-[#5E8AFF] relative z-10" />
          </div>
          <div className="hidden sm:block">
            <div
              className="text-[#222]"
              style={{ fontSize: "0.75rem", fontWeight: 600, lineHeight: 1 }}
            >
              {dailyProgress}/{dailyGoal}
            </div>
            <div
              className="text-[#AAAAAB]"
              style={{ fontSize: "0.625rem", lineHeight: 1 }}
            >
              Daily Goal
            </div>
          </div>
        </div>
      </motion.div>

      {/* Right: Streak + Timer */}
      <div className="flex items-center gap-3">
        <motion.div
          className="glass rounded-full px-3 py-2 flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
        >
          <Flame className="w-4 h-4 text-[#F59E0B]" />
          <span
            className="text-[#222]"
            style={{ fontSize: "0.875rem", fontWeight: 600 }}
          >
            {streak}
          </span>
        </motion.div>

        <motion.div
          className="glass rounded-full px-3 py-2 flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
        >
          <Clock className="w-4 h-4 text-[#5E8AFF]" />
          <span
            className="text-[#222]"
            style={{ fontSize: "0.875rem", fontWeight: 600 }}
          >
            {studyTime}
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}
