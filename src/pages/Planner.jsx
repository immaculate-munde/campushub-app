import React, { useState } from "react";
import { motion } from "framer-motion";
import { PlusIcon } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useEvents } from "../contexts/EventsContext";

// Days + Time slots
const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

// Generate time slots in 24hr format (HH:mm)
const timeSlots = Array.from({ length: 12 }, (_, i) => {
  const hour = i + 8;
  return hour < 10 ? `0${hour}:00` : `${hour}:00`;
});

// Convert "HH:mm" → readable label
const formatHourLabel = (hourStr) => {
  const hour = parseInt(hourStr.split(":")[0]);
  if (hour === 0) return "12 AM";
  if (hour === 12) return "12 PM";
  return hour < 12 ? `${hour} AM` : `${hour - 12} PM`;
};

// Pad helper for consistency
const padTime = (hour) => (hour < 10 ? `0${hour}:00` : `${hour}:00`);

function Planner() {
  const { theme } = useTheme();
  const { events, addEvent } = useEvents();

  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [newEvent, setNewEvent] = useState({
    title: "",
    location: "",
    day: "",
    startTime: "",
    endTime: "",
  });

  // Open modal
  const handleAddEvent = (day, time) => {
    const hour = parseInt(time);
    setSelectedDay(day);
    setSelectedTime(time);
    setNewEvent({
      title: "",
      location: "",
      day,
      startTime: padTime(hour),
      endTime: padTime(hour + 1),
    });
    setIsAddingEvent(true);
  };

  // Save new event
  const handleSaveEvent = () => {
    if (!newEvent.title || !newEvent.day) return;
    addEvent(newEvent);
    setIsAddingEvent(false);
    setNewEvent({ title: "", location: "", day: "", startTime: "", endTime: "" });
  };

  // Get events for a cell
  const getEventForTimeSlot = (day, time) => {
    return events.filter(
      (event) =>
        event.day === day &&
        event.startTime <= time &&
        event.endTime > time
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6"
    >
      <h1
        className={`text-2xl font-bold mb-6 ${
          theme === "dark" ? "text-white" : "text-gray-900"
        }`}
      >
        Weekly Planner
      </h1>

      {/* Grid */}
      <div className="overflow-x-auto">
        <div className="min-w-max">
          <div className="grid grid-cols-6 gap-px">
            {/* Header row */}
            <div />
            {days.map((day) => (
              <div
                key={day}
                className={`p-3 text-center font-medium ${
                  theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900"
                }`}
              >
                {day}
              </div>
            ))}

            {/* Time slots */}
            {timeSlots.map((hourStr) => (
              <React.Fragment key={hourStr}>
                {/* Time column */}
                <div
                  className={`p-3 text-sm font-medium ${
                    theme === "dark" ? "bg-gray-800 text-gray-300" : "bg-gray-50 text-gray-700"
                  }`}
                >
                  {formatHourLabel(hourStr)}
                </div>

                {/* Event cells */}
                {days.map((day) => (
                  <div
                    key={day + hourStr}
                    className={`relative h-20 p-1 cursor-pointer ${
                      theme === "dark"
                        ? "bg-gray-900 hover:bg-gray-800"
                        : "bg-white hover:bg-gray-50"
                    } border border-gray-200`}
                    onClick={() => handleAddEvent(day, hourStr)}
                  >
                    {getEventForTimeSlot(day, hourStr).map((event, idx) => (
                      <div
                        key={idx}
                        className="absolute inset-1 bg-blue-500 text-white text-xs rounded-md p-1 overflow-hidden"
                      >
                        <div className="font-semibold">{event.title}</div>
                        <div>{event.location}</div>
                      </div>
                    ))}
                    <PlusIcon className="absolute bottom-1 right-1 h-4 w-4 text-gray-400" />
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Add Event Modal */}
      {isAddingEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className={`p-6 rounded-lg w-96 ${
              theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"
            }`}
          >
            <h2 className="text-lg font-semibold mb-4">Add Event</h2>
            <input
              type="text"
              placeholder="Event Title"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              className="w-full mb-3 p-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Location"
              value={newEvent.location}
              onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
              className="w-full mb-3 p-2 border rounded-lg"
            />
            <div className="flex space-x-2 mb-3">
              <input
                type="time"
                value={newEvent.startTime}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, startTime: e.target.value })
                }
                className="flex-1 p-2 border rounded-lg"
              />
              <input
                type="time"
                value={newEvent.endTime}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, endTime: e.target.value })
                }
                className="flex-1 p-2 border rounded-lg"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsAddingEvent(false)}
                className="px-4 py-2 rounded-lg bg-gray-300 text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEvent}
                className="px-4 py-2 rounded-lg bg-blue-500 text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default Planner;
