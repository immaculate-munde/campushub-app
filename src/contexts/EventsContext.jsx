// src/contexts/EventsContext.jsx
import React, { createContext, useContext, useState } from "react";

const EventsContext = createContext();

export function EventsProvider({ children }) {
  const [events, setEvents] = useState([
    { id: 1, time: "09:00 AM", title: "CS101: Introduction to Programming", location: "Room 302" },
    { id: 2, time: "11:00 AM", title: "Study Group: Mathematics", location: "Library" },
    { id: 3, time: "02:00 PM", title: "HIST201: World History", location: "Room 105" },
    { id: 4, time: "04:30 PM", title: "Project Meeting", location: "Student Center" },
  ]);

  // Helpers to add and remove events
  const addEvent = (event) => {
    setEvents((prev) => [...prev, { id: Date.now(), ...event }]);
  };

  const removeEvent = (id) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <EventsContext.Provider value={{ events, addEvent, removeEvent }}>
      {children}
    </EventsContext.Provider>
  );
}

export function useEvents() {
  return useContext(EventsContext);
}
