import { motion, AnimatePresence } from "motion/react";
import {
  Home,
  BarChart3,
  User,
  BookMarked,
  Settings,
  X,
  LogOut,
} from "lucide-react";
import { Button } from "./ui/button";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentScreen: string;
  onNavigate: (screen: string) => void;
}

const menuItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "stats", label: "Stats", icon: BarChart3 },
  { id: "profile", label: "Profile", icon: User },
  { id: "review", label: "Review", icon: BookMarked },
  { id: "settings", label: "Settings", icon: Settings },
];

export function Sidebar({
  isOpen,
  onClose,
  currentScreen,
  onNavigate,
}: SidebarProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed left-0 top-0 bottom-0 w-80 glass-strong z-50 flex flex-col border-r border-white/10"
          >
            {/* Header */}
            <div className="p-6 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #5E8AFF 0%, #8B5CF6 100%)",
                  }}
                >
                  <span
                    className="text-white"
                    style={{ fontSize: "1.25rem", fontWeight: 700 }}
                  >
                    M
                  </span>
                </div>
                <div>
                  <h2
                    className="text-[#222]"
                    style={{ fontSize: "1.125rem", fontWeight: 600 }}
                  >
                    Mindora
                  </h2>
                  <p
                    className="text-[#AAAAAB]"
                    style={{ fontSize: "0.75rem" }}
                  >
                    Learn smarter, faster
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="rounded-xl hover:bg-white/20"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* User Profile */}
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)",
                  }}
                >
                  <span
                    className="text-white"
                    style={{ fontSize: "1.5rem", fontWeight: 600 }}
                  >
                    A
                  </span>
                </div>
                <div className="flex-1">
                  <h3
                    className="text-[#222]"
                    style={{ fontSize: "1rem", fontWeight: 600 }}
                  >
                    Alex Johnson
                  </h3>
                  <p
                    className="text-[#AAAAAB] mb-1"
                    style={{ fontSize: "0.875rem" }}
                  >
                    Level 12 · B1.3
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          background:
                            "linear-gradient(90deg, #5E8AFF 0%, #8B5CF6 100%)",
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: "65%" }}
                        transition={{ duration: 1, delay: 0.3 }}
                      />
                    </div>
                    <span
                      className="text-[#AAAAAB]"
                      style={{ fontSize: "0.75rem", fontWeight: 600 }}
                    >
                      65%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <nav className="flex-1 p-4 space-y-1">
              {menuItems.map((item, index) => {
                const isActive = currentScreen === item.id;
                return (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => {
                      onNavigate(item.id);
                      onClose();
                    }}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3 rounded-xl
                      transition-all duration-200 relative overflow-hidden
                      ${
                        isActive
                          ? "text-white"
                          : "text-[#222] hover:bg-white/20"
                      }
                    `}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeMenuItem"
                        className="absolute inset-0 rounded-xl"
                        style={{
                          background:
                            "linear-gradient(135deg, #5E8AFF 0%, #8B5CF6 100%)",
                        }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                      />
                    )}
                    <item.icon
                      className="w-5 h-5 relative z-10"
                      strokeWidth={isActive ? 2.5 : 2}
                    />
                    <span
                      className="relative z-10"
                      style={{
                        fontSize: "1rem",
                        fontWeight: isActive ? 600 : 500,
                      }}
                    >
                      {item.label}
                    </span>
                  </motion.button>
                );
              })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-white/10">
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 rounded-xl hover:bg-red-500/10 text-red-500 hover:text-red-600"
              >
                <LogOut className="w-5 h-5" />
                <span style={{ fontSize: "1rem", fontWeight: 500 }}>
                  Sign Out
                </span>
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
