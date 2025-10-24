import { motion } from "motion/react";

interface ChineseKeyboardSetupProps {
  onContinue: () => void;
  onSkip: () => void;
}

export function ChineseKeyboardSetup({ onContinue, onSkip }: ChineseKeyboardSetupProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      className="min-h-screen px-6 py-8 overflow-y-auto"
    >
      <h1 className="text-2xl font-bold mb-2">Chinese Keyboard</h1>
      <p className="text-slate-500 mb-6">
        Enable a Chinese (Simplified) keyboard to practice typing pinyin and characters.
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-2xl p-5 bg-white/60 border border-white/70 backdrop-blur-xl">
          <h3 className="font-semibold mb-2">iOS (iPhone/iPad)</h3>
          <ol className="list-decimal pl-5 space-y-1 text-sm">
            <li>Settings → General → Keyboard → Keyboards → Add New Keyboard…</li>
            <li>Select "Chinese – Simplified (Pinyin)"</li>
            <li>Optionally enable Handwriting</li>
            <li>Switch via the 🌐 key</li>
          </ol>
        </div>

        <div className="rounded-2xl p-5 bg-white/60 border border-white/70 backdrop-blur-xl">
          <h3 className="font-semibold mb-2">Android</h3>
          <ol className="list-decimal pl-5 space-y-1 text-sm">
            <li>Settings → System → Languages & input → On-screen keyboard</li>
            <li>Add "Chinese (Simplified) – Pinyin" in Gboard/IME</li>
            <li>Enable handwriting if needed</li>
            <li>Switch via keyboard icon in nav bar</li>
          </ol>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <button 
          onClick={onContinue} 
          className="px-4 py-2 rounded-xl bg-slate-900 text-white"
        >
          Continue
        </button>
        <button 
          onClick={onSkip} 
          className="px-4 py-2 rounded-xl bg-white/70 border border-white/80"
        >
          I already have it
        </button>
      </div>
    </motion.div>
  );
}
