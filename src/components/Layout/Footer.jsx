import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { HeartIcon } from 'lucide-react';
export const Footer = () => {
  const {
    theme
  } = useTheme();
  return <footer className={`py-6 ${theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-blue-900 text-blue-100'}`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">© 2023 CampusHub. All rights reserved.</p>
          </div>
          <div className="flex items-center space-x-1 text-sm">
            <span>Made with</span>
            <HeartIcon className="h-4 w-4 text-red-400" />
            <span>for students</span>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <a href="#" className="text-sm hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="text-sm hover:underline">
              Terms of Service
            </a>
            <a href="#" className="text-sm hover:underline">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>;
};