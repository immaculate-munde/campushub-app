import React from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { SunIcon, MoonIcon } from "lucide-react";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className={`p-2 rounded-full shadow-md transition-colors duration-300
        ${theme === "dark"
          ? "bg-gray-800 text-yellow-400 hover:bg-gray-700"
          : "bg-gray-200 text-blue-600 hover:bg-gray-300"}
      `}
    >
      {theme === "dark" ? (
        <SunIcon className="h-5 w-5" />
      ) : (
        <MoonIcon className="h-5 w-5" />
      )}
    </motion.button>
  );
}
