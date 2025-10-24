import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Languages, Sparkles } from "lucide-react";

interface WelcomeScreenProps {
  onContinue: () => void;
}

export function WelcomeScreen({ onContinue }: WelcomeScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #5E8AFF 0%, #8B5CF6 100%)",
      }}
    >
      {/* Animated background elements */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)",
        }}
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-40 right-10 w-40 h-40 rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)",
        }}
        animate={{
          y: [0, 20, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Main content */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="relative z-10 flex flex-col items-center"
      >
        <motion.div
          className="mb-8 p-6 rounded-3xl glass-strong"
          animate={{
            boxShadow: [
              "0 0 30px rgba(255,255,255,0.3)",
              "0 0 50px rgba(255,255,255,0.5)",
              "0 0 30px rgba(255,255,255,0.3)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Languages className="w-16 h-16 text-white" strokeWidth={1.5} />
        </motion.div>

        <motion.h1
          className="text-white mb-3 tracking-tight"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{ fontSize: "3rem", fontWeight: 600 }}
        >
          Mindora
        </motion.h1>

        <motion.p
          className="text-white/90 text-center mb-12 max-w-sm px-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{ fontSize: "1.125rem", lineHeight: 1.6 }}
        >
          Master languages with intelligence and clarity. Your journey to fluency starts here.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col gap-4 w-full max-w-xs"
        >
          <Button
            onClick={onContinue}
            className="w-full py-7 rounded-2xl bg-white text-[#5E8AFF] hover:bg-white/90 transition-all duration-300 shadow-xl"
            style={{ fontSize: "1.125rem", fontWeight: 600 }}
          >
            Get Started
            <Sparkles className="ml-2 w-5 h-5" />
          </Button>

          <motion.div
            className="text-white/70 text-center"
            style={{ fontSize: "0.875rem" }}
          >
            Join thousands learning smarter every day
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
