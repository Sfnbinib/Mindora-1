import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import {
  RotateCcw,
  Check,
  X,
  Mic,
  Volume2,
  TrendingUp,
  Eye,
  Brain,
  Zap,
  Speaker,
} from "lucide-react";

interface ReviewScreenProps {
  selectedLanguage: string;
}

interface Flashcard {
  id: number;
  front: string;
  back: string;
  nextReview: Date;
  interval: number;
  ease: number;
}

const mockFlashcards: Flashcard[] = [
  { id: 1, front: "你好", back: "Hello", nextReview: new Date(), interval: 1, ease: 2.5 },
  { id: 2, front: "谢谢", back: "Thank you", nextReview: new Date(), interval: 1, ease: 2.5 },
  { id: 3, front: "再见", back: "Goodbye", nextReview: new Date(), interval: 2, ease: 2.3 },
  { id: 4, front: "对不起", back: "Sorry", nextReview: new Date(), interval: 3, ease: 2.7 },
  { id: 5, front: "请", back: "Please", nextReview: new Date(), interval: 1, ease: 2.5 },
  { id: 6, front: "是", back: "Yes", nextReview: new Date(), interval: 2, ease: 2.4 },
];

const toneExamples = [
  { id: 1, character: "妈", pinyin: "mā", tone: 1, meaning: "mother" },
  { id: 2, character: "麻", pinyin: "má", tone: 2, meaning: "hemp" },
  { id: 3, character: "马", pinyin: "mǎ", tone: 3, meaning: "horse" },
  { id: 4, character: "骂", pinyin: "mà", tone: 4, meaning: "scold" },
];

export function ReviewScreen({ selectedLanguage }: ReviewScreenProps) {
  const [activeTab, setActiveTab] = useState<"flashcards" | "tones" | "speaking">("flashcards");
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [selectedTone, setSelectedTone] = useState<number | null>(null);
  const [toneScore, setToneScore] = useState<number | null>(null);

  const isEnglish = selectedLanguage === "english";
  const isChinese = selectedLanguage === "chinese";
  const gradient = isEnglish
    ? "linear-gradient(135deg, #5E8AFF 0%, #8B5CF6 100%)"
    : "linear-gradient(135deg, #DE5042 0%, #F59E0B 100%)";
  const primaryColor = isEnglish ? "#5E8AFF" : "#DE5042";

  const currentCard = mockFlashcards[currentCardIndex];
  const cardsLeft = mockFlashcards.length - currentCardIndex;
  const progress = ((currentCardIndex + 1) / mockFlashcards.length) * 100;

  const handleCardResponse = (quality: "again" | "good" | "easy") => {
    setShowAnswer(false);
    if (currentCardIndex < mockFlashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      setCurrentCardIndex(0);
    }
  };

  const handleToneCheck = (toneIndex: number, correctTone: number) => {
    setSelectedTone(toneIndex);
    const score = toneIndex === correctTone ? 100 : Math.max(0, 100 - Math.abs(toneIndex - correctTone) * 25);
    setToneScore(score);
    setTimeout(() => {
      setSelectedTone(null);
      setToneScore(null);
    }, 2000);
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
        className="mb-6"
      >
        <h1
          className="text-[#222] mb-2"
          style={{ fontSize: "2rem", fontWeight: 600 }}
        >
          Review
        </h1>
        <p className="text-[#AAAAAB]" style={{ fontSize: "1rem" }}>
          Strengthen your knowledge with spaced repetition
        </p>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="glass rounded-2xl p-2 flex gap-2 mb-6"
      >
        {[
          { id: "flashcards" as const, label: "Flashcards", icon: RotateCcw },
          { id: "tones" as const, label: "Tones", icon: TrendingUp, showOnlyChinese: true },
          { id: "speaking" as const, label: "Speaking", icon: Mic },
        ].map((tab) => {
          if (tab.showOnlyChinese && !isChinese) return null;
          
          const isActive = activeTab === tab.id;
          return (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex-1 flex items-center justify-center gap-2 py-3 rounded-xl
                transition-all relative overflow-hidden
                ${isActive ? "text-white" : "text-[#222] hover:bg-white/20"}
              `}
              whileHover={{ scale: isActive ? 1 : 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isActive && (
                <motion.div
                  layoutId="activeReviewTab"
                  className="absolute inset-0"
                  style={{ background: gradient }}
                  transition={{ type: "spring", damping: 30, stiffness: 300 }}
                />
              )}
              <tab.icon className="w-4 h-4 relative z-10" />
              <span
                className="relative z-10"
                style={{ fontSize: "0.9375rem", fontWeight: isActive ? 600 : 500 }}
              >
                {tab.label}
              </span>
            </motion.button>
          );
        })}
      </motion.div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {/* Flashcards Tab */}
        {activeTab === "flashcards" && (
          <motion.div
            key="flashcards"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            {/* Progress */}
            <div className="glass rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[#AAAAAB]" style={{ fontSize: "0.875rem" }}>
                  Cards remaining
                </span>
                <span
                  className="text-[#222]"
                  style={{ fontSize: "0.875rem", fontWeight: 600 }}
                >
                  {cardsLeft} / {mockFlashcards.length}
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* Flashcard */}
            <motion.div
              key={currentCardIndex}
              initial={{ scale: 0.9, rotateY: 0 }}
              animate={{ scale: 1, rotateY: showAnswer ? 180 : 0 }}
              className="glass-strong rounded-3xl p-12 min-h-[320px] flex items-center justify-center cursor-pointer relative overflow-hidden"
              onClick={() => setShowAnswer(!showAnswer)}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div
                className="absolute inset-0 opacity-5"
                style={{ background: gradient }}
              />

              <div
                className="relative z-10 text-center"
                style={{ transform: showAnswer ? "rotateY(180deg)" : "rotateY(0)" }}
              >
                {!showAnswer ? (
                  <div>
                    <div className="mb-4">
                      <Brain className="w-8 h-8 mx-auto text-[#AAAAAB]" />
                    </div>
                    <p
                      className="text-[#222] mb-4"
                      style={{ fontSize: "3rem", fontWeight: 600 }}
                    >
                      {currentCard.front}
                    </p>
                    <p className="text-[#AAAAAB]" style={{ fontSize: "1rem" }}>
                      Tap to reveal answer
                    </p>
                  </div>
                ) : (
                  <div>
                    <div className="mb-4">
                      <Eye className="w-8 h-8 mx-auto text-[#AAAAAB]" />
                    </div>
                    <p
                      className="text-[#222] mb-4"
                      style={{ fontSize: "2.5rem", fontWeight: 600 }}
                    >
                      {currentCard.back}
                    </p>
                    <p className="text-[#AAAAAB]" style={{ fontSize: "1rem" }}>
                      How well did you know this?
                    </p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Response Buttons */}
            <AnimatePresence>
              {showAnswer && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  className="grid grid-cols-3 gap-3"
                >
                  <Button
                    onClick={() => handleCardResponse("again")}
                    variant="outline"
                    className="py-6 rounded-2xl border-2 border-red-500 text-red-500 hover:bg-red-500/10"
                    style={{ fontSize: "0.9375rem", fontWeight: 600 }}
                  >
                    <X className="mr-2 w-5 h-5" />
                    Again
                  </Button>
                  <Button
                    onClick={() => handleCardResponse("good")}
                    className="py-6 rounded-2xl text-white"
                    style={{
                      background: "linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)",
                      fontSize: "0.9375rem",
                      fontWeight: 600,
                    }}
                  >
                    Good
                  </Button>
                  <Button
                    onClick={() => handleCardResponse("easy")}
                    className="py-6 rounded-2xl text-white"
                    style={{
                      background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                      fontSize: "0.9375rem",
                      fontWeight: 600,
                    }}
                  >
                    <Check className="mr-2 w-5 h-5" />
                    Easy
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* SRS Info */}
            <div className="glass rounded-2xl p-4 flex items-start gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${primaryColor}20` }}
              >
                <Zap className="w-5 h-5" style={{ color: primaryColor }} />
              </div>
              <div>
                <h4
                  className="text-[#222] mb-1"
                  style={{ fontSize: "0.9375rem", fontWeight: 600 }}
                >
                  Spaced Repetition System
                </h4>
                <p
                  className="text-[#AAAAAB]"
                  style={{ fontSize: "0.875rem", lineHeight: 1.6 }}
                >
                  Cards are shown at optimal intervals to maximize retention. The better
                  you know a card, the longer before you'll see it again.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tones Tab (Chinese only) */}
        {activeTab === "tones" && isChinese && (
          <motion.div
            key="tones"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            <div className="glass-strong rounded-3xl p-6">
              <h3
                className="text-[#222] mb-4"
                style={{ fontSize: "1.25rem", fontWeight: 600 }}
              >
                Tone Practice
              </h3>
              <p className="text-[#AAAAAB] mb-6" style={{ fontSize: "0.9375rem" }}>
                Master the four tones of Mandarin Chinese
              </p>

              {/* Tone Examples Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {toneExamples.map((example, index) => {
                  const isSelected = selectedTone === example.tone;
                  const isCorrect = toneScore === 100 && isSelected;
                  const isWrong = toneScore !== null && toneScore < 100 && isSelected;

                  return (
                    <motion.button
                      key={example.id}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleToneCheck(example.tone, 1)}
                      className={`
                        glass-strong rounded-2xl p-6 text-center relative overflow-hidden
                        transition-all
                        ${isCorrect ? "ring-2 ring-green-500" : ""}
                        ${isWrong ? "ring-2 ring-red-500" : ""}
                        ${!isSelected ? "hover:shadow-lg" : ""}
                      `}
                      whileHover={{ scale: isSelected ? 1 : 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={toneScore !== null}
                    >
                      {isCorrect && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 0.1 }}
                          className="absolute inset-0 bg-green-500"
                        />
                      )}
                      {isWrong && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 0.1 }}
                          className="absolute inset-0 bg-red-500"
                        />
                      )}

                      <div className="relative z-10">
                        <motion.button
                          className="mb-3 mx-auto"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            // Play audio
                          }}
                        >
                          <Volume2 className="w-6 h-6" style={{ color: primaryColor }} />
                        </motion.button>

                        <p
                          className="text-[#222] mb-2"
                          style={{ fontSize: "3rem", fontWeight: 600 }}
                        >
                          {example.character}
                        </p>
                        <p
                          className="mb-1"
                          style={{ color: primaryColor, fontSize: "1rem", fontWeight: 600 }}
                        >
                          {example.pinyin}
                        </p>
                        <p className="text-[#AAAAAB]" style={{ fontSize: "0.875rem" }}>
                          {example.meaning}
                        </p>

                        <div className="mt-3 flex justify-center">
                          <div
                            className="px-3 py-1 rounded-full"
                            style={{
                              background: `${primaryColor}20`,
                              color: primaryColor,
                              fontSize: "0.75rem",
                              fontWeight: 600,
                            }}
                          >
                            Tone {example.tone}
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Tone Score */}
              <AnimatePresence>
                {toneScore !== null && (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="glass rounded-2xl p-4 text-center"
                    style={{
                      background: toneScore === 100 ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)",
                    }}
                  >
                    <p
                      style={{
                        color: toneScore === 100 ? "#10B981" : "#EF4444",
                        fontSize: "1.125rem",
                        fontWeight: 600,
                      }}
                    >
                      {toneScore === 100 ? "Perfect! 🎉" : "Try again!"}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Tone Guide */}
            <div className="glass rounded-2xl p-4 flex items-start gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${primaryColor}20` }}
              >
                <TrendingUp className="w-5 h-5" style={{ color: primaryColor }} />
              </div>
              <div>
                <h4
                  className="text-[#222] mb-2"
                  style={{ fontSize: "0.9375rem", fontWeight: 600 }}
                >
                  Tone Tips
                </h4>
                <ul
                  className="text-[#AAAAAB] space-y-1"
                  style={{ fontSize: "0.875rem", lineHeight: 1.6 }}
                >
                  <li>1st tone (ā): High and flat</li>
                  <li>2nd tone (á): Rising, like asking a question</li>
                  <li>3rd tone (ǎ): Falling then rising</li>
                  <li>4th tone (à): Sharp falling</li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}

        {/* Speaking Tab */}
        {activeTab === "speaking" && (
          <motion.div
            key="speaking"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            {/* Voice Practice Area */}
            <div className="glass-strong rounded-3xl p-8 text-center relative overflow-hidden min-h-[400px] flex flex-col items-center justify-center">
              <div
                className="absolute inset-0 opacity-5"
                style={{ background: gradient }}
              />

              <div className="relative z-10">
                <motion.div
                  className="mb-6 mx-auto w-32 h-32 rounded-full flex items-center justify-center relative"
                  style={{ background: isRecording ? gradient : `${primaryColor}20` }}
                  animate={
                    isRecording
                      ? {
                          scale: [1, 1.1, 1],
                          boxShadow: [
                            `0 0 0 0 ${primaryColor}40`,
                            `0 0 0 20px ${primaryColor}00`,
                            `0 0 0 0 ${primaryColor}40`,
                          ],
                        }
                      : {}
                  }
                  transition={{
                    duration: 1.5,
                    repeat: isRecording ? Infinity : 0,
                    ease: "easeInOut",
                  }}
                >
                  <Mic
                    className="w-16 h-16"
                    style={{ color: isRecording ? "white" : primaryColor }}
                  />
                </motion.div>

                <h3
                  className="text-[#222] mb-3"
                  style={{ fontSize: "1.5rem", fontWeight: 600 }}
                >
                  Practice Speaking
                </h3>

                <p className="text-[#AAAAAB] mb-6 max-w-sm mx-auto" style={{ fontSize: "1rem" }}>
                  {isRecording
                    ? "Listening... Speak clearly and naturally"
                    : "Tap the microphone to start recording"}
                </p>

                <Button
                  onClick={() => setIsRecording(!isRecording)}
                  className={`py-6 px-8 rounded-2xl text-white shadow-xl ${
                    isRecording ? "animate-pulse" : ""
                  }`}
                  style={{
                    background: gradient,
                    fontSize: "1.125rem",
                    fontWeight: 600,
                  }}
                >
                  {isRecording ? "Stop Recording" : "Start Recording"}
                </Button>
              </div>
            </div>

            {/* Practice Prompts */}
            <div className="space-y-3">
              <h4
                className="text-[#222]"
                style={{ fontSize: "1.125rem", fontWeight: 600 }}
              >
                Try these phrases
              </h4>

              {["Hello, how are you?", "What's your name?", "Nice to meet you"].map(
                (phrase, index) => (
                  <motion.button
                    key={phrase}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="w-full glass rounded-2xl p-4 flex items-center gap-4 text-left hover:shadow-lg transition-all"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: `${primaryColor}20` }}
                    >
                      <Speaker className="w-5 h-5" style={{ color: primaryColor }} />
                    </div>
                    <p
                      className="flex-1 text-[#222]"
                      style={{ fontSize: "1rem", fontWeight: 500 }}
                    >
                      {phrase}
                    </p>
                    <Volume2 className="w-5 h-5 text-[#AAAAAB]" />
                  </motion.button>
                )
              )}
            </div>

            {/* AI Feedback */}
            <div className="glass rounded-2xl p-4 flex items-start gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${primaryColor}20` }}
              >
                <Mic className="w-5 h-5" style={{ color: primaryColor }} />
              </div>
              <div>
                <h4
                  className="text-[#222] mb-1"
                  style={{ fontSize: "0.9375rem", fontWeight: 600 }}
                >
                  AI Voice Analysis
                </h4>
                <p
                  className="text-[#AAAAAB]"
                  style={{ fontSize: "0.875rem", lineHeight: 1.6 }}
                >
                  Our AI will analyze your pronunciation, intonation, and fluency in
                  real-time, providing instant feedback to help you improve.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
