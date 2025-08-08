import React, { useState } from 'react';
import { SearchIcon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { motion } from 'framer-motion';
export const SearchBar = () => {
  const {
    theme
  } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  return <motion.div initial={{
    opacity: 0,
    y: -10
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    delay: 0.2
  }} className={`relative ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
      <div className={`flex items-center rounded-lg overflow-hidden shadow-sm ${isFocused ? theme === 'dark' ? 'ring-2 ring-blue-400' : 'ring-2 ring-blue-500' : ''} ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="pl-4">
          <SearchIcon className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
        </div>
        <input type="text" placeholder="Search notes, resources, and more..." className={`w-full py-3 px-4 outline-none ${theme === 'dark' ? 'bg-gray-800 placeholder-gray-500' : 'bg-white placeholder-gray-400'}`} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} />
      </div>
    </motion.div>;
};