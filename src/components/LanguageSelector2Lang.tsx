import { motion } from "motion/react";

type Lang = "english" | "chinese";

interface LanguageSelector2LangProps {
  onSelect: (lang: Lang) => void;
}

export function LanguageSelector2Lang({ onSelect }: LanguageSelector2LangProps) {
  const items = [
    { 
      id: "english" as const, 
      title: "English", 
      sub: "CEFR (A1–C2)", 
      flag: "🇬🇧", 
      color: "#5E8AFF" 
    },
    { 
      id: "chinese" as const, 
      title: "Chinese", 
      sub: "HSK (1–9)", 
      flag: "🇨🇳", 
      color: "#DE5042" 
    },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="min-h-screen px-6 py-8"
    >
      <h1 className="text-2xl font-bold mb-2">Choose your language</h1>
      <p className="text-slate-500 mb-6">Mindora supports English and Chinese.</p>
      
      <div className="grid sm:grid-cols-2 gap-4">
        {items.map(it => (
          <motion.button 
            key={it.id} 
            whileHover={{ scale: 1.01 }} 
            whileTap={{ scale: 0.99 }}
            onClick={() => onSelect(it.id)}
            className="rounded-2xl p-5 text-left relative overflow-hidden bg-white/60 border border-white/70 backdrop-blur-xl"
          >
            <div 
              className="absolute inset-0 opacity-20" 
              style={{ background: `linear-gradient(135deg, ${it.color}, transparent)` }}
            />
            <div className="relative flex items-center gap-4">
              <div 
                className="w-12 h-12 grid place-items-center text-2xl rounded-2xl" 
                style={{ background: `${it.color}22`, color: it.color }}
              >
                {it.flag}
              </div>
              <div>
                <div className="font-semibold">{it.title}</div>
                <div className="text-sm text-slate-500">{it.sub}</div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
