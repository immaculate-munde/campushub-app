import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useNotes } from '../contexts/NotesContext';
import { CalendarIcon, BookOpenIcon, FolderIcon, ArrowRightIcon, LogOutIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import QuoteCard from '../components/QuoteCard';
import { auth } from '../firebase';  // 👈 import auth
import { signOut } from 'firebase/auth'; // 👈 import signOut

const Dashboard = () => {
  const { theme } = useTheme();
  const { notes } = useNotes();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login"); // 👈 redirect to login after logout
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

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

  return (
    <div className="container mx-auto p-6 space-y-6">
      
      {/* Header with Logout */}
      <div className="flex justify-between items-center">
        <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="flex items-center px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors duration-200"
        >
          <LogOutIcon className="h-5 w-5 mr-2" />
          Logout
        </button>
      </div>

      {/* Quote at top */}
      <QuoteCard />

      {/* Today's Schedule & Recent Notes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Schedule */}
        <div className={`p-6 rounded-xl shadow-md ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`text-lg font-semibold mb-4 flex items-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            <CalendarIcon className="mr-2 h-5 w-5 text-blue-500" />
            Today's Schedule
          </h2>
          <div className="space-y-3">
            {scheduleItems.map((item, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'} transition-colors duration-200`}
              >
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
        </div>

        {/* Recent Notes */}
        <div className={`p-6 rounded-xl shadow-md ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className={`text-lg font-semibold flex items-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              <BookOpenIcon className="mr-2 h-5 w-5 text-blue-500" />
              Recent Notes
            </h2>
            <Link
              to="/notes"
              className={`flex items-center text-sm ${theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}
            >
              View All
              <ArrowRightIcon className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {notes.slice(0, 3).map((note) => (
              <div
                key={note.id}
                className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'} transition-colors duration-200`}
              >
                <h3 className="font-medium">{note.title}</h3>
                <p className={`text-sm truncate ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {note.content.substring(0, 60)}...
                </p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-gray-500">{note.date}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${theme === 'dark' ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
                    {note.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className={`p-6 rounded-xl shadow-md ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Quick Access
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {quickLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className={`flex items-center p-4 rounded-lg shadow-sm transition-transform duration-200 transform hover:scale-105 ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-blue-50 hover:bg-blue-100'}`}
            >
              <div className={`p-3 rounded-full mr-4 ${theme === 'dark' ? 'bg-gray-600 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
                {link.icon}
              </div>
              <span className="font-medium">{link.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
