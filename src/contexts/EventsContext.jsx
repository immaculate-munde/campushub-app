// src/contexts/EventsContext.jsx
import React, { createContext, useContext, useState } from 'react';

const EventsContext = createContext();

export const EventsProvider = ({ children }) => {
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
    }
  ]);

  return (
    <EventsContext.Provider value={{ events, setEvents }}>
      {children}
    </EventsContext.Provider>
  );
};

export const useEvents = () => useContext(EventsContext);
