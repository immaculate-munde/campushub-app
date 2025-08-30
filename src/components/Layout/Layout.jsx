import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { useTheme } from '../../contexts/ThemeContext';
import { SearchBar } from '../Search/SearchBar';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const { theme } = useTheme();
  const location = useLocation();

  // Pages where we hide Navbar, Search, and Footer
  const hideLayout = ["/", "/login", "/signup"].includes(location.pathname);

  return (
    <div
      className={`min-h-screen flex flex-col ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {!hideLayout && <Navbar />}

      <div className={`container mx-auto px-4 py-4 flex-grow ${hideLayout ? "flex items-center justify-center" : ""}`}>
        {!hideLayout && (
          <div className="mb-6">
            <SearchBar />
          </div>
        )}

        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="pb-10 w-full"
        >
          {children}
        </motion.main>
      </div>

      {!hideLayout && <Footer />}
    </div>
  );
};

export default Layout;
