import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import {
  X,
  Pause,
  Volume2,
  Check,
  ChevronRight,
  Mic,
  BookOpen,
  Headphones,
  MessageSquare,
  Clock,
} from "lucide-react";

interface LearningSessionProps {
  selectedLanguage: "english" | "chinese";
  onComplete: (results: SessionResults) => void;
  onExit: () => void;
}

interface SessionResults {
  totalCorrect: number;
  totalQuestions: number;
  skills: { name: string; delta: number }[];
  newLevel: string;
  timeSpent: number;
}

type BlockType = "review" | "context" | "practice";

type Question =
  | { type: "fill-in"; prompt: string; blanks: number; answers: string[] }
  | { type: "speaking"; prompt: string; showTones?: boolean }
  | { type: "listening"; audioUrl: string; options: string[]; correct: number }
  | { type: "reading"; text: string; options: string[]; correct: number }
  | { type: "chat"; system: string; starter: string }
  | { type: "writing"; prompt: string; minWords?: number };

const blocks = [
  {
    id: "review" as BlockType,
    name: "Review",
    icon: BookOpen,
    color: "#5E8AFF",
    duration: 300, // 5 minutes in seconds
  },
  {
    id: "context" as BlockType,
    name: "Context",
    icon: Headphones,
    color: "#8B5CF6",
    duration: 300,
  },
  {
    id: "practice" as BlockType,
    name: "Practice",
    icon: MessageSquare,
    color: "#10B981",
    duration: 300,
  },
];

export function LearningSession({
  selectedLanguage,
  onComplete,
  onExit,
}: LearningSessionProps) {
  const [currentBlock, setCurrentBlock] = useState<BlockType>("review");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(300);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const isEnglish = selectedLanguage === "english";
  const gradient = isEnglish
    ? "linear-gradient(135deg, #5E8AFF 0%, #8B5CF6 100%)"
    : "linear-gradient(135deg, #DE5042 0%, #F59E0B 100%)";

  const currentBlockData = blocks.find((b) => b.id === currentBlock)!;
  const blockIndex = blocks.findIndex((b) => b.id === currentBlock);
  const totalProgress = ((blockIndex * 3 + currentQuestion + 1) / 9) * 100;

  // Mock questions for each block
  const questions: Record<BlockType, Question[]> = {
    review: [
      {
        type: "fill-in",
        prompt: "I ___ to school.",
        blanks: 1,
        answers: ["go"],
      },
      {
        type: "fill-in",
        prompt: "She ___ a book yesterday.",
        blanks: 1,
        answers: ["read"],
      },
      {
        type: "fill-in",
        prompt: "We ___ dinner at 7 PM.",
        blanks: 1,
        answers: ["have", "eat"],
      },
    ],
    context: [
      {
        type: "listening",
        audioUrl: "/audio/travel_01.mp3",
        options: ["ticket", "hotel", "airport"],
        correct: 2,
      },
      {
        type: "reading",
        text: "The store opens at 9 AM and closes at 6 PM.",
        options: ["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM"],
        correct: 1,
      },
      {
        type: "listening",
        audioUrl: "/audio/emotion_01.mp3",
        options: ["Excited", "Worried", "Happy", "Tired"],
        correct: 2,
      },
    ],
    practice: [
      {
        type: "speaking",
        prompt: isEnglish ? "Say: Hello, how are you?" : "Say: 我今天学习中文。",
        showTones: !isEnglish,
      },
      {
        type: "chat",
        system: "You are a friendly tutor.",
        starter: isEnglish ? "Order coffee politely." : "Ask for directions to the train station.",
      },
      {
        type: "writing",
        prompt: isEnglish ? "Write 3–4 sentences about your day." : "Write 3–4 sentences about your family.",
        minWords: 30,
      },
    ],
  };

  const currentQuestions = questions[currentBlock];
  const question = currentQuestions[currentQuestion];

  // Timer
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPaused]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAnswerSelect = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);
    if (index === question.correct) {
      setCorrectAnswers(correctAnswers + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < currentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      // Move to next block or complete
      const nextBlockIndex = blockIndex + 1;
      if (nextBlockIndex < blocks.length) {
        setCurrentBlock(blocks[nextBlockIndex].id);
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setShowResult(false);
        setTimeRemaining(300);
      } else {
        // Session complete
        onComplete({
          totalCorrect: correctAnswers,
          totalQuestions: 9,
          skills: [
            { name: "Reading", delta: 2 },
            { name: "Listening", delta: 3 },
            { name: "Speaking", delta: 1 },
          ],
          newLevel: "B1.4",
          timeSpent: 900 - timeRemaining,
        });
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col relative"
    >
      {/* Header */}
      <div className="glass-strong px-6 py-4 flex items-center gap-4 border-b border-white/10 sticky top-0 z-20">
        <button
          onClick={onExit}
          className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/50 transition-colors"
        >
          <X className="w-5 h-5 text-[#222]" />
        </button>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <currentBlockData.icon
              className="w-4 h-4"
              style={{ color: currentBlockData.color }}
            />
            <span
              className="text-[#222]"
              style={{ fontSize: "0.875rem", fontWeight: 600 }}
            >
              {currentBlockData.name}
            </span>
            <span className="text-[#AAAAAB]" style={{ fontSize: "0.875rem" }}>
              {currentQuestion + 1}/3
            </span>
          </div>
          <Progress value={totalProgress} className="h-2" />
        </div>

        <div className="flex items-center gap-2">
          <div
            className="glass rounded-full px-3 py-1.5 flex items-center gap-2"
          >
            <Clock className="w-4 h-4 text-[#5E8AFF]" />
            <span
              className="text-[#222]"
              style={{ fontSize: "0.875rem", fontWeight: 600 }}
            >
              {formatTime(timeRemaining)}
            </span>
          </div>

          <button
            onClick={() => setIsPaused(!isPaused)}
            className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/50 transition-colors"
          >
            <Pause className="w-4 h-4 text-[#222]" />
          </button>
        </div>
      </div>

      {/* Block Progress Indicators */}
      <div className="px-6 py-4 flex items-center gap-2">
        {blocks.map((block, index) => (
          <div key={block.id} className="flex-1 flex items-center gap-2">
            <div className="flex-1 flex items-center gap-2">
              <div
                className={`
                  w-8 h-8 rounded-xl flex items-center justify-center transition-all
                  ${
                    blockIndex > index
                      ? "bg-green-500"
                      : blockIndex === index
                      ? ""
                      : "bg-black/5"
                  }
                `}
                style={
                  blockIndex === index
                    ? { background: block.color }
                    : undefined
                }
              >
                {blockIndex > index ? (
                  <Check
                    className="w-4 h-4 text-white"
                    strokeWidth={3}
                  />
                ) : (
                  <block.icon
                    className="w-4 h-4"
                    style={{
                      color: blockIndex === index ? "white" : "#AAAAAB",
                    }}
                  />
                )}
              </div>
              <span
                className={
                  blockIndex >= index ? "text-[#222]" : "text-[#AAAAAB]"
                }
                style={{ fontSize: "0.75rem", fontWeight: 600 }}
              >
                {block.name}
              </span>
            </div>
            {index < blocks.length - 1 && (
              <ChevronRight className="w-4 h-4 text-[#AAAAAB]" />
            )}
          </div>
        ))}
      </div>

      {/* Question Content */}
      <div className="flex-1 px-6 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentBlock}-${currentQuestion}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col h-full"
          >
            {/* Question/Prompt */}
            <div className="mb-8">
              {question.type === "listening" && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mb-6 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto"
                  style={{ background: currentBlockData.color }}
                >
                  <Volume2 className="w-10 h-10 text-white" />
                </motion.button>
              )}

              {question.type === "fill-in" && (
                <div className="mb-6 mx-auto max-w-md">
                  <div className="glass-strong rounded-3xl p-6 text-center">
                    <p className="text-lg font-medium text-[#222]">
                      {question.prompt.split('___').map((part, index) => (
                        <span key={index}>
                          {part}
                          {index < question.blanks && (
                            <span className="inline-block w-16 h-8 mx-1 border-b-2 border-[#5E8AFF]"></span>
                          )}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              )}

              {question.type === "reading" && (
                <div className="mb-6 mx-auto max-w-md">
                  <div className="glass-strong rounded-3xl p-6">
                    <p className="text-lg font-medium text-[#222] leading-relaxed">
                      {question.text}
                    </p>
                  </div>
                </div>
              )}

              {question.type === "speaking" && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mb-6 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto"
                  style={{ background: currentBlockData.color }}
                >
                  <Mic className="w-10 h-10 text-white" />
                </motion.button>
              )}

              {question.type === "writing" && (
                <div className="mb-6 mx-auto max-w-md">
                  <div className="glass-strong rounded-3xl p-6">
                    <p className="text-lg font-medium text-[#222]">
                      {question.prompt}
                    </p>
                    {question.minWords && (
                      <p className="text-sm text-[#AAAAAB] mt-2">
                        Minimum {question.minWords} words
                      </p>
                    )}
                  </div>
                </div>
              )}

              {question.type === "chat" && (
                <div className="mb-6 mx-auto max-w-md">
                  <div className="glass-strong rounded-3xl p-6">
                    <p className="text-lg font-medium text-[#222]">
                      {question.starter}
                    </p>
                  </div>
                </div>
              )}

              <h2
                className="text-[#222] text-center"
                style={{ fontSize: "1.5rem", fontWeight: 600, lineHeight: 1.4 }}
              >
                {question.type === "fill-in" ? "Fill in the blank" :
                 question.type === "listening" ? "Listen and choose" :
                 question.type === "reading" ? "Read and answer" :
                 question.type === "speaking" ? "Speak the phrase" :
                 question.type === "writing" ? "Write your response" :
                 question.type === "chat" ? "Start a conversation" :
                 question.prompt}
              </h2>
            </div>

            {/* Options or AI Feedback */}
            {question.type === "fill-in" ? (
              <div className="space-y-3">
                <div className="glass-strong rounded-2xl p-4">
                  <input
                    type="text"
                    placeholder="Type your answer..."
                    className="w-full bg-transparent border-none outline-none text-lg font-medium text-[#222] placeholder-[#AAAAAB]"
                    onChange={(e) => {
                      const answer = e.target.value.toLowerCase().trim();
                      if (question.answers.includes(answer)) {
                        setSelectedAnswer(0);
                        setShowResult(true);
                        setCorrectAnswers(correctAnswers + 1);
                      }
                    }}
                  />
                </div>
              </div>
            ) : question.type === "writing" ? (
              <div className="space-y-3">
                <div className="glass-strong rounded-2xl p-4">
                  <textarea
                    placeholder="Write your response..."
                    className="w-full bg-transparent border-none outline-none text-lg font-medium text-[#222] placeholder-[#AAAAAB] min-h-32 resize-none"
                    onChange={(e) => {
                      const wordCount = e.target.value.split(/\s+/).filter(word => word.length > 0).length;
                      if (wordCount >= (question.minWords || 0)) {
                        setShowResult(true);
                      }
                    }}
                  />
                </div>
              </div>
            ) : question.type === "chat" ? (
              <div className="space-y-3">
                <div className="glass-strong rounded-2xl p-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-[#5E8AFF] flex items-center justify-center">
                      <MessageSquare className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-[#222] font-medium">AI Tutor</span>
                  </div>
                  <p className="text-[#AAAAAB] mb-4">
                    Start the conversation. The AI will respond and help you practice.
                  </p>
                  <Button
                    onClick={() => setShowResult(true)}
                    className="w-full py-3 rounded-xl text-white"
                    style={{ background: currentBlockData.color }}
                  >
                    Continue
                  </Button>
                </div>
              </div>
            ) : question.options ? (
              <div className="space-y-3">
                {question.options.map((option, index) => {
                  const isSelected = selectedAnswer === index;
                  const isCorrectAnswer = index === question.correct;
                  const shouldShowCorrect = showResult && isCorrectAnswer;
                  const shouldShowWrong =
                    showResult && isSelected && selectedAnswer !== question.correct;

                  return (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={showResult}
                      className={`
                        w-full glass-strong rounded-2xl p-5 text-left relative overflow-hidden
                        transition-all duration-300 flex items-center gap-4
                        ${
                          !showResult
                            ? "hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                            : ""
                        }
                        ${shouldShowCorrect ? "ring-2 ring-green-500" : ""}
                        ${shouldShowWrong ? "ring-2 ring-red-500" : ""}
                      `}
                    >
                      {shouldShowCorrect && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 0.1 }}
                          className="absolute inset-0 bg-green-500"
                        />
                      )}
                      {shouldShowWrong && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 0.1 }}
                          className="absolute inset-0 bg-red-500"
                        />
                      )}

                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{
                          background: shouldShowCorrect
                            ? "#10B981"
                            : shouldShowWrong
                            ? "#EF4444"
                            : isSelected && !showResult
                            ? currentBlockData.color
                            : `${currentBlockData.color}20`,
                        }}
                      >
                        <span
                          style={{
                            color:
                              shouldShowCorrect ||
                              shouldShowWrong ||
                              (isSelected && !showResult)
                                ? "white"
                                : currentBlockData.color,
                            fontSize: "1rem",
                            fontWeight: 600,
                          }}
                        >
                          {String.fromCharCode(65 + index)}
                        </span>
                      </div>

                      <span
                        className="flex-1 text-[#222]"
                        style={{ fontSize: "1.125rem", fontWeight: 500 }}
                      >
                        {option}
                      </span>

                      {shouldShowCorrect && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center"
                        >
                          <Check className="w-5 h-5 text-white" strokeWidth={3} />
                        </motion.div>
                      )}
                      {shouldShowWrong && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center"
                        >
                          <X className="w-5 h-5 text-white" strokeWidth={3} />
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            ) : question.type === "speaking" ? (
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="glass-strong rounded-3xl p-6"
              >
                <div className="text-center mb-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4"
                    style={{ background: currentBlockData.color }}
                  >
                    <Mic className="w-10 h-10 text-white" />
                  </motion.button>
                  <p className="text-[#AAAAAB] mb-4">
                    Tap the microphone and speak the phrase
                  </p>
                  {question.showTones && (
                    <div className="glass rounded-2xl p-4 mb-4">
                      <p className="text-sm text-[#AAAAAB] mb-2">Tone Analysis</p>
                      <div className="flex gap-2 justify-center">
                        {[1, 2, 3, 4].map(tone => (
                          <div key={tone} className="w-8 h-8 rounded-lg bg-white/50 border border-white/80 flex items-center justify-center">
                            <span className="text-xs font-medium">{tone}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <Button
                  onClick={() => setShowResult(true)}
                  className="w-full py-4 rounded-xl text-white"
                  style={{ background: currentBlockData.color }}
                >
                  Continue
                </Button>
              </motion.div>
            ) : (
              // AI Feedback for other types
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="glass-strong rounded-3xl p-6"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ background: currentBlockData.color }}
                  >
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4
                      className="text-[#222] mb-2"
                      style={{ fontSize: "1rem", fontWeight: 600 }}
                    >
                      AI Feedback
                    </h4>
                    <p
                      className="text-[#AAAAAB]"
                      style={{ fontSize: "0.9375rem", lineHeight: 1.6 }}
                    >
                      Great work! Your pronunciation is improving.
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => setShowResult(true)}
                  className="w-full py-4 rounded-xl text-white"
                  style={{ background: currentBlockData.color }}
                >
                  Continue
                </Button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Next Button */}
      <AnimatePresence>
        {showResult && (question.options || question.type === "fill-in" || question.type === "writing" || question.type === "chat" || question.type === "speaking") && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="px-6 py-6 glass-strong border-t border-white/10"
          >
            <Button
              onClick={handleNext}
              className="w-full py-6 rounded-2xl text-white shadow-xl"
              style={{
                background: gradient,
                fontSize: "1.125rem",
                fontWeight: 600,
              }}
            >
              Continue
              <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pause Overlay */}
      <AnimatePresence>
        {isPaused && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-strong rounded-3xl p-8 max-w-sm mx-6 text-center"
            >
              <h3
                className="text-[#222] mb-4"
                style={{ fontSize: "1.5rem", fontWeight: 600 }}
              >
                Session Paused
              </h3>
              <p className="text-[#AAAAAB] mb-6" style={{ fontSize: "1rem" }}>
                Take a break. Resume when you're ready!
              </p>
              <div className="space-y-3">
                <Button
                  onClick={() => setIsPaused(false)}
                  className="w-full py-4 rounded-xl text-white"
                  style={{ background: gradient }}
                >
                  Resume
                </Button>
                <Button
                  onClick={onExit}
                  variant="ghost"
                  className="w-full py-4 rounded-xl"
                >
                  Exit Session
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
