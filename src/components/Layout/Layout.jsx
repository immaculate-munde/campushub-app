import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { useTheme } from '../../contexts/ThemeContext';
import { SearchBar } from '../Search/SearchBar';
import { motion } from 'framer-motion';

const Layout = ({ children }) => {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Navbar />
      <div className="container mx-auto px-4 py-4 flex-grow">
        <div className="mb-6">
          <SearchBar />
        </div>
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="pb-10"
        >
          {children}
        </motion.main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
