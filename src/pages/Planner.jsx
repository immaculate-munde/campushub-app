import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { ChevronLeftIcon, ChevronRightIcon, PlusIcon, XIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Planner = () => {
  const { theme } = useTheme();
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: '',
    day: 0,
    startTime: '',
    endTime: '',
    type: 'study',
    location: ''
  });

  // Mock events data
  const [events, setEvents] = useState([
    {
      id: '1',
      title: 'CS101 Lecture',
      day: 1,
      startTime: '09:00',
      endTime: '10:30',
      type: 'class',
      location: 'Room 302'
    },
    {
      id: '2',
      title: 'Study Group',
      day: 2,
      startTime: '14:00',
      endTime: '16:00',
      type: 'study',
      location: 'Library'
    },
    {
      id: '3',
      title: 'Project Meeting',
      day: 3,
      startTime: '11:00',
      endTime: '12:00',
      type: 'meeting',
      location: 'Student Center'
    },
    {
      id: '4',
      title: 'Math Homework',
      day: 4,
      startTime: '16:00',
      endTime: '18:00',
      type: 'study'
    },
    {
      id: '5',
      title: 'History Lecture',
      day: 5,
      startTime: '13:00',
      endTime: '14:30',
      type: 'class',
      location: 'Room 105'
    }
  ]);

  // Get the start of the current week (Sunday)
  const getWeekStart = (date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day;
    return new Date(d.setDate(diff));
  };

  // Get the week days
  const getWeekDays = () => {
    const weekStart = getWeekStart(currentWeek);
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(weekStart);
      day.setDate(weekStart.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const weekDays = getWeekDays();
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const timeSlots = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 7 PM

  const handlePrevWeek = () => {
    const prevWeek = new Date(currentWeek);
    prevWeek.setDate(prevWeek.getDate() - 7);
    setCurrentWeek(prevWeek);
  };

  const handleNextWeek = () => {
    const nextWeek = new Date(currentWeek);
    nextWeek.setDate(nextWeek.getDate() + 7);
    setCurrentWeek(nextWeek);
  };

  const handleAddEvent = (day, time) => {
    setSelectedDay(day);
    setSelectedTime(time);
    setNewEvent({
      ...newEvent,
      day,
      startTime: time,
      endTime: `${parseInt(time) + 1}:00`
    });
    setIsAddingEvent(true);
  };

  const handleSaveEvent = () => {
    if (newEvent.title && newEvent.startTime && newEvent.endTime) {
      const event = {
        ...newEvent,
        id: Date.now().toString()
      };
      setEvents([...events, event]);
      setIsAddingEvent(false);
      setNewEvent({
        title: '',
        day: 0,
        startTime: '',
        endTime: '',
        type: 'study',
        location: ''
      });
    }
  };

  const handleDeleteEvent = (id) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  const getEventForTimeSlot = (day, time) => {
    return events.filter(
      (event) => event.day === day && event.startTime <= time && event.endTime > time
    );
  };

  const getEventTypeColor = (type, isDark) => {
    switch (type) {
      case 'class':
        return isDark ? 'bg-blue-800 text-blue-100' : 'bg-blue-100 text-blue-800';
      case 'study':
        return isDark ? 'bg-green-800 text-green-100' : 'bg-green-100 text-green-800';
      case 'meeting':
        return isDark ? 'bg-purple-800 text-purple-100' : 'bg-purple-100 text-purple-800';
      default:
        return isDark ? 'bg-gray-700 text-gray-100' : 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Study Planner
        </h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={handlePrevWeek}
            className={`p-2 rounded-full ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {weekDays[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} -{' '}
            {weekDays[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </span>
          <button
            onClick={handleNextWeek}
            className={`p-2 rounded-full ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div className={`rounded-lg shadow-md overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        {/* Week Header */}
        <div className="grid grid-cols-8 divide-x divide-y">
          <div className={`p-3 text-center ${theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
            Time
          </div>
          {weekDays.map((day, index) => (
            <div
              key={index}
              className={`p-3 text-center ${theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}
            >
              <div className="font-medium">{daysOfWeek[index]}</div>
              <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{day.getDate()}</div>
            </div>
          ))}
        </div>
        {/* Time Slots */}
        {timeSlots.map((hour) => (
          <div key={hour} className="grid grid-cols-8 divide-x divide-y">
            <div className={`p-3 text-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              {hour === 12 ? '12 PM' : hour < 12 ? `${hour} AM` : `${hour - 12} PM`}
            </div>
            {Array.from({ length: 7 }, (_, dayIndex) => {
              const eventsInSlot = getEventForTimeSlot(dayIndex, `${hour}:00`);
              return (
                <div
                  key={dayIndex}
                  className={`p-1 min-h-[80px] relative ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}
                  onClick={() => handleAddEvent(dayIndex, `${hour}:00`)}
                >
                  {eventsInSlot.length > 0 ? (
                    eventsInSlot.map((event) => (
                      <div key={event.id} className={`p-2 rounded mb-1 ${getEventTypeColor(event.type, theme === 'dark')}`}>
                        <div className="flex justify-between">
                          <span className="font-medium text-sm">{event.title}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteEvent(event.id);
                            }}
                            className="opacity-50 hover:opacity-100"
                          >
                            <XIcon className="h-3 w-3" />
                          </button>
                        </div>
                        {event.location && <div className="text-xs opacity-75">{event.location}</div>}
                        <div className="text-xs mt-1">
                          {event.startTime} - {event.endTime}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <PlusIcon
                        className={`h-5 w-5 opacity-20 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-300'}`}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      {/* Add Event Modal */}
      <AnimatePresence>
        {isAddingEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setIsAddingEvent(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className={`rounded-lg shadow-xl p-6 max-w-md w-full ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Add New Event</h3>
                <button onClick={() => setIsAddingEvent(false)}>
                  <XIcon className="h-5 w-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Title
                  </label>
                  <input
                    type="text"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    className={`w-full p-2 rounded-md ${
                      theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'
                    } border focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    placeholder="Event title"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      Start Time
                    </label>
                    <input
                      type="time"
                      value={newEvent.startTime}
                      onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
                      className={`w-full p-2 rounded-md ${
                        theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'
                      } border focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      End Time
                    </label>
                    <input
                      type="time"
                      value={newEvent.endTime}
                      onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
                      className={`w-full p-2 rounded-md ${
                        theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'
                      } border focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    />
                  </div>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Type
                  </label>
                  <select
                    value={newEvent.type}
                    onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
                    className={`w-full p-2 rounded-md ${
                      theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'
                    } border focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  >
                    <option value="class">Class</option>
                    <option value="study">Study</option>
                    <option value="meeting">Meeting</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Location (Optional)
                  </label>
                  <input
                    type="text"
                    value={newEvent.location || ''}
                    onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                    className={`w-full p-2 rounded-md ${
                      theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'
                    } border focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    placeholder="Room number, building, etc."
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSaveEvent}
                  className={`w-full py-2 rounded-md ${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                >
                  Save Event
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Planner;
