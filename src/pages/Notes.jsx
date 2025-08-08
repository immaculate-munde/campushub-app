import React, { useEffect, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useNotes } from '../contexts/NotesContext';
import { CalendarIcon, BookOpenIcon, FolderIcon, ArrowRightIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Notes() {
  const { theme } = useTheme();
  const { notes } = useNotes();
  const [quote, setQuote] = useState({ text: '', author: '' });
  const [isLoading, setIsLoading] = useState(true);

  const scheduleItems = [
    { time: '09:00 AM', title: 'CS101: Introduction to Programming', location: 'Room 302' },
    { time: '11:00 AM', title: 'Study Group: Mathematics', location: 'Library' },
    { time: '02:00 PM', title: 'HIST201: World History', location: 'Room 105' },
    { time: '04:30 PM', title: 'Project Meeting', location: 'Student Center' }
  ];

  const quickLinks = [
    { name: 'Notes', path: '/notes', icon: <BookOpenIcon className="h-5 w-5" /> },
    { name: 'Planner', path: '/planner', icon: <CalendarIcon className="h-5 w-5" /> },
    { name: 'Resources', path: '/resources', icon: <FolderIcon className="h-5 w-5" /> }
  ];

  useEffect(() => {
    const fetchQuote = async () => {
      setIsLoading(true);
      try {
        setTimeout(() => {
          setQuote({
            text: 'The beautiful thing about learning is that no one can take it away from you.',
            author: 'B.B. King'
          });
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching quote:', error);
        setIsLoading(false);
      }
    };
    fetchQuote();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Motivational Quote */}
      <motion.div variants={itemVariants} className={`col-span-1 md:col-span-2 p-6 rounded-xl shadow-md ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        {isLoading ? (
          <div className="animate-pulse h-20 flex items-center justify-center">
            <div className={`h-4 w-3/4 rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
          </div>
        ) : (
          <div className="text-center">
            <p className={`text-xl italic mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              "{quote.text}"
            </p>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              — {quote.author}
            </p>
          </div>
        )}
      </motion.div>

      {/* Today's Schedule */}
      <motion.div variants={itemVariants} className={`p-6 rounded-xl shadow-md ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className={`text-lg font-semibold mb-4 flex items-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          <CalendarIcon className="mr-2 h-5 w-5 text-blue-500" />
          Today's Schedule
        </h2>
        <div className="space-y-3">
          {scheduleItems.map((item, index) => (
            <div key={index} className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'} transition-colors duration-200`}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{item.title}</h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{item.location}</p>
                </div>
                <span className={`text-sm font-medium ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>{item.time}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Recent Notes */}
      <motion.div variants={itemVariants} className={`p-6 rounded-xl shadow-md ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className={`text-lg font-semibold flex items-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            <BookOpenIcon className="mr-2 h-5 w-5 text-blue-500" />
            Recent Notes
          </h2>
          <Link to="/notes" className={`flex items-center text-sm ${theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}>
            View All
            <ArrowRightIcon className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="space-y-3">
          {notes.slice(0, 3).map(note => (
            <div key={note.id} className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'} transition-colors duration-200`}>
              <h3 className="font-medium">{note.title}</h3>
              <p className={`text-sm truncate ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {note.content.substring(0, 60)}...
              </p>
              <div className="flex justify-between items-center mt-2">
                <span className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>{note.date}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${theme === 'dark' ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
                  {note.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Quick Links */}
      <motion.div variants={itemVariants} className={`col-span-1 md:col-span-2 p-6 rounded-xl shadow-md ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Quick Access
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {quickLinks.map((link, index) => (
            <Link key={index} to={link.path} className={`flex items-center p-4 rounded-lg shadow-sm transition-transform duration-200 transform hover:scale-105 ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-blue-50 hover:bg-blue-100'}`}>
              <div className={`p-3 rounded-full mr-4 ${theme === 'dark' ? 'bg-gray-600 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
                {link.icon}
              </div>
              <span className="font-medium">{link.name}</span>
            </Link>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Notes;
