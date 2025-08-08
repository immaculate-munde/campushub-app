import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../../contexts/ThemeContext';
import { MenuIcon, XIcon, BookIcon } from 'lucide-react';
import { motion } from 'framer-motion';
export const Navbar = () => {
  const {
    theme
  } = useTheme();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinks = [{
    name: 'Dashboard',
    path: '/'
  }, {
    name: 'Notes',
    path: '/notes'
  }, {
    name: 'Planner',
    path: '/planner'
  }, {
    name: 'Resources',
    path: '/resources'
  }];
  const isActive = path => {
    return location.pathname === path;
  };
  return <nav className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-blue-900'} shadow-md`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <BookIcon className="h-8 w-8 text-white" />
            <span className="text-white text-xl font-bold">CampusHub</span>
          </Link>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => <Link key={link.path} to={link.path} className={`text-sm font-medium transition-colors duration-200 ${isActive(link.path) ? 'text-white border-b-2 border-white' : 'text-blue-100 hover:text-white'}`}>
                {link.name}
              </Link>)}
            <ThemeToggle />
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <ThemeToggle />
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="ml-4 text-white focus:outline-none">
              {isMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>
        {/* Mobile Navigation */}
        {isMenuOpen && <motion.div initial={{
        opacity: 0,
        height: 0
      }} animate={{
        opacity: 1,
        height: 'auto'
      }} exit={{
        opacity: 0,
        height: 0
      }} transition={{
        duration: 0.3
      }} className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              {navLinks.map(link => <Link key={link.path} to={link.path} className={`text-sm font-medium py-2 ${isActive(link.path) ? 'text-white font-bold' : 'text-blue-100 hover:text-white'}`} onClick={() => setIsMenuOpen(false)}>
                  {link.name}
                </Link>)}
            </div>
          </motion.div>}
      </div>
    </nav>;
};