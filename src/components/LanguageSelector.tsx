import { motion } from "motion/react";
import { Check } from "lucide-react";

interface Language {
  id: string;
  name: string;
  nativeName: string;
  flag: string;
  gradient: string;
  color: string;
}

interface LanguageSelectorProps {
  onSelect: (languageId: string) => void;
}

const languages: Language[] = [
  {
    id: "english",
    name: "English",
    nativeName: "English",
    flag: "🇬🇧",
    gradient: "linear-gradient(135deg, #5E8AFF 0%, #8B5CF6 100%)",
    color: "#5E8AFF",
  },
  {
    id: "chinese",
    name: "Chinese",
    nativeName: "中文",
    flag: "🇨🇳",
    gradient: "linear-gradient(135deg, #DE5042 0%, #F59E0B 100%)",
    color: "#DE5042",
  },
  {
    id: "spanish",
    name: "Spanish",
    nativeName: "Español",
    flag: "🇪🇸",
    gradient: "linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)",
    color: "#F59E0B",
  },
  {
    id: "french",
    name: "French",
    nativeName: "Français",
    flag: "🇫🇷",
    gradient: "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)",
    color: "#3B82F6",
  },
  {
    id: "japanese",
    name: "Japanese",
    nativeName: "日本語",
    flag: "🇯🇵",
    gradient: "linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)",
    color: "#EC4899",
  },
  {
    id: "german",
    name: "German",
    nativeName: "Deutsch",
    flag: "🇩🇪",
    gradient: "linear-gradient(135deg, #64748B 0%, #475569 100%)",
    color: "#64748B",
  },
];

export function LanguageSelector({ onSelect }: LanguageSelectorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen flex flex-col px-6 py-12 relative overflow-hidden"
    >
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <h1 className="text-[#222] mb-2" style={{ fontSize: "2rem", fontWeight: 600 }}>
          Choose your language
        </h1>
        <p className="text-[#AAAAAB]" style={{ fontSize: "1rem" }}>
          Select the language you want to learn
        </p>
      </motion.div>

      {/* Language Grid */}
      <div className="grid grid-cols-1 gap-4 max-w-2xl mx-auto w-full">
        {languages.map((language, index) => (
          <motion.button
            key={language.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(language.id)}
            className="glass rounded-3xl p-6 flex items-center gap-5 text-left hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
          >
            {/* Gradient overlay on hover */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
              style={{ background: language.gradient }}
            />

            {/* Flag */}
            <div
              className="text-5xl flex items-center justify-center w-16 h-16 rounded-2xl glass-strong"
              style={{ fontSize: "2rem" }}
            >
              {language.flag}
            </div>

            {/* Language info */}
            <div className="flex-1">
              <h3
                className="text-[#222] mb-1"
                style={{ fontSize: "1.25rem", fontWeight: 600 }}
              >
                {language.name}
              </h3>
              <p className="text-[#AAAAAB]" style={{ fontSize: "0.9375rem" }}>
                {language.nativeName}
              </p>
            </div>

            {/* Arrow indicator */}
            <motion.div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: language.gradient }}
              whileHover={{ x: 5 }}
            >
              <Check className="w-5 h-5 text-white" strokeWidth={3} />
            </motion.div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
