import { motion } from "motion/react";
import { Button } from "./ui/button";
import {
  TrendingUp,
  Award,
  Target,
  ArrowRight,
  BookMarked,
  Sparkles,
} from "lucide-react";

interface SessionResults {
  totalCorrect: number;
  totalQuestions: number;
  skills: { name: string; delta: number }[];
  newLevel: string;
  timeSpent: number;
}

interface ResultScreenProps {
  results: SessionResults;
  onNextMission: () => void;
  onReviewWeakSpots: () => void;
  selectedLanguage: string;
}

export function ResultScreen({
  results,
  onNextMission,
  onReviewWeakSpots,
  selectedLanguage,
}: ResultScreenProps) {
  const isEnglish = selectedLanguage === "english";
  const gradient = isEnglish
    ? "linear-gradient(135deg, #5E8AFF 0%, #8B5CF6 100%)"
    : "linear-gradient(135deg, #DE5042 0%, #F59E0B 100%)";
  const primaryColor = isEnglish ? "#5E8AFF" : "#DE5042";

  const accuracy = (results.totalCorrect / results.totalQuestions) * 100;
  const oldLevel = "B1.3";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen px-6 py-12 flex flex-col items-center justify-center overflow-y-auto"
    >
      {/* Success Animation */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          damping: 15,
          stiffness: 200,
          delay: 0.2,
        }}
        className="mb-8"
      >
        <div
          className="w-32 h-32 rounded-full flex items-center justify-center relative"
          style={{ background: gradient }}
        >
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ background: gradient }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <Award className="w-16 h-16 text-white relative z-10" strokeWidth={1.5} />
        </div>
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-[#222] mb-2"
        style={{ fontSize: "2rem", fontWeight: 600 }}
      >
        Mission Complete!
      </motion.h1>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-[#AAAAAB] mb-8 text-center"
        style={{ fontSize: "1rem" }}
      >
        Great work! You're making real progress.
      </motion.p>

      {/* Level Growth Animation */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="glass-strong rounded-3xl p-6 mb-6 w-full max-w-md"
      >
        <div className="flex items-center justify-center gap-4 mb-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8 }}
            className="glass rounded-2xl px-6 py-4"
          >
            <span
              className="text-[#AAAAAB] block mb-1"
              style={{ fontSize: "0.75rem" }}
            >
              Previous
            </span>
            <span
              className="text-[#222]"
              style={{ fontSize: "1.5rem", fontWeight: 700 }}
            >
              {oldLevel}
            </span>
          </motion.div>

          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 1, type: "spring" }}
          >
            <ArrowRight
              className="w-8 h-8"
              style={{ color: primaryColor }}
              strokeWidth={2.5}
            />
          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.2 }}
            className="rounded-2xl px-6 py-4 relative overflow-hidden"
            style={{ background: gradient }}
          >
            <motion.div
              className="absolute inset-0"
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                background:
                  "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)",
                backgroundSize: "200% 200%",
              }}
            />
            <span
              className="text-white/70 block mb-1 relative z-10"
              style={{ fontSize: "0.75rem" }}
            >
              Current
            </span>
            <div className="flex items-center gap-2 relative z-10">
              <span
                className="text-white"
                style={{ fontSize: "1.5rem", fontWeight: 700 }}
              >
                {results.newLevel}
              </span>
              <Sparkles className="w-5 h-5 text-white" />
            </div>
          </motion.div>
        </div>

        <div className="flex items-center justify-center gap-2 text-[#10B981]">
          <TrendingUp className="w-5 h-5" />
          <span style={{ fontSize: "1rem", fontWeight: 600 }}>
            Level increased!
          </span>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="w-full max-w-md space-y-3 mb-6"
      >
        {/* Accuracy */}
        <div className="glass rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: `${primaryColor}20` }}
            >
              <Target className="w-6 h-6" style={{ color: primaryColor }} />
            </div>
            <div>
              <p
                className="text-[#222]"
                style={{ fontSize: "1rem", fontWeight: 600 }}
              >
                Accuracy
              </p>
              <p className="text-[#AAAAAB]" style={{ fontSize: "0.875rem" }}>
                {results.totalCorrect} of {results.totalQuestions} correct
              </p>
            </div>
          </div>
          <span
            className="text-[#222]"
            style={{ fontSize: "1.5rem", fontWeight: 700 }}
          >
            {Math.round(accuracy)}%
          </span>
        </div>

        {/* Time Spent */}
        <div className="glass rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(139, 92, 246, 0.2)" }}
            >
              <Award className="w-6 h-6 text-[#8B5CF6]" />
            </div>
            <div>
              <p
                className="text-[#222]"
                style={{ fontSize: "1rem", fontWeight: 600 }}
              >
                Time Spent
              </p>
              <p className="text-[#AAAAAB]" style={{ fontSize: "0.875rem" }}>
                Total study time
              </p>
            </div>
          </div>
          <span
            className="text-[#222]"
            style={{ fontSize: "1.5rem", fontWeight: 700 }}
          >
            {Math.floor(results.timeSpent / 60)}m
          </span>
        </div>
      </motion.div>

      {/* Skill Deltas */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="w-full max-w-md glass-strong rounded-3xl p-6 mb-8"
      >
        <h3
          className="text-[#222] mb-4"
          style={{ fontSize: "1.125rem", fontWeight: 600 }}
        >
          Skill Improvements
        </h3>
        <div className="space-y-3">
          {results.skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.8 + index * 0.1 }}
              className="flex items-center justify-between"
            >
              <span className="text-[#222]" style={{ fontSize: "0.9375rem" }}>
                {skill.name}
              </span>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#10B981]" />
                <span
                  className="text-[#10B981]"
                  style={{ fontSize: "1rem", fontWeight: 600 }}
                >
                  +{skill.delta}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* AI Feedback */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2 }}
        className="w-full max-w-md glass rounded-2xl p-5 mb-8 flex items-start gap-3"
      >
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: gradient }}
        >
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <h4
            className="text-[#222] mb-1"
            style={{ fontSize: "0.9375rem", fontWeight: 600 }}
          >
            AI Insight
          </h4>
          <p
            className="text-[#AAAAAB]"
            style={{ fontSize: "0.875rem", lineHeight: 1.6 }}
          >
            Your listening comprehension improved significantly! Keep practicing
            daily conversations to maintain this momentum.
          </p>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="w-full max-w-md space-y-3"
      >
        <Button
          onClick={onNextMission}
          className="w-full py-6 rounded-2xl text-white shadow-xl"
          style={{
            background: gradient,
            fontSize: "1.125rem",
            fontWeight: 600,
          }}
        >
          Next Mission
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>

        <Button
          onClick={onReviewWeakSpots}
          variant="outline"
          className="w-full py-6 rounded-2xl border-2"
          style={{
            borderColor: primaryColor,
            color: primaryColor,
            fontSize: "1rem",
            fontWeight: 600,
          }}
        >
          <BookMarked className="mr-2 w-5 h-5" />
          Review Weak Spots
        </Button>
      </motion.div>
    </motion.div>
  );
}
