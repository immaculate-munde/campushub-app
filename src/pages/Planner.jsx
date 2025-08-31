import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Calendar } from "lucide-react";
import { useSearch } from "../contexts/SearchContext"; // ⬅️ use your SearchContext

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const hours = Array.from({ length: 12 }, (_, i) => `${i + 8} AM`).concat(
  Array.from({ length: 6 }, (_, i) => `${i + 1} PM`)
);

export default function WeeklyPlanner() {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    day: "Mon",
    time: "8 AM",
    color: "blue",
  });

  const { searchQuery } = useSearch(); // ⬅️ grab the global search query
  const todayIndex = new Date().getDay() - 1;

  const handleAddEvent = () => {
    setEvents([...events, newEvent]);
    setShowModal(false);
    setNewEvent({ title: "", day: "Mon", time: "8 AM", color: "blue" });
  };

  const colors = {
    blue: "from-blue-100 to-blue-200 border-blue-300 text-blue-800",
    green: "from-green-100 to-green-200 border-green-300 text-green-800",
    purple: "from-purple-100 to-purple-200 border-purple-300 text-purple-800",
    pink: "from-pink-100 to-pink-200 border-pink-300 text-pink-800",
  };

  // 🔍 filter events by search query
  const filteredEvents = events.filter((e) =>
    e.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // if no search, show all
  const eventsToShow = searchQuery ? filteredEvents : events;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="text-blue-600 w-6 h-6" />
        <h2 className="text-2xl font-bold">Weekly Planner</h2>
      </div>

      {/* Planner Grid */}
      <div className="grid grid-cols-8 border rounded-2xl overflow-hidden shadow-md bg-white">
        {/* Time Column */}
        <div className="bg-gray-100 p-2 text-sm font-medium">
          {hours.map((h) => (
            <div key={h} className="h-16 flex items-start text-gray-500">
              {h}
            </div>
          ))}
        </div>

        {/* Days Columns */}
        {days.map((day, idx) => (
          <div
            key={day}
            className={`border-l ${
              idx === todayIndex ? "bg-blue-50" : idx >= 5 ? "bg-indigo-50" : ""
            }`}
          >
            <div
              className={`sticky top-0 z-10 p-2 text-center font-semibold ${
                idx === todayIndex
                  ? "bg-blue-100 text-blue-700"
                  : idx >= 5
                  ? "bg-indigo-100 text-indigo-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {day}
            </div>

            {hours.map((h) => (
              <div
                key={h}
                className="h-16 border-t relative hover:bg-gray-50 transition cursor-pointer"
                onClick={() => {
                  setNewEvent({ ...newEvent, day, time: h });
                  setShowModal(true);
                }}
              >
                {/* Events */}
                <AnimatePresence>
                  {eventsToShow
                    .filter((e) => e.day === day && e.time === h)
                    .map((e, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className={`absolute inset-1 rounded-xl p-2 text-xs shadow-md 
                          bg-gradient-to-r border ${colors[e.color]} 
                          ${searchQuery && e.title.toLowerCase().includes(searchQuery.toLowerCase()) 
                            ? "ring-2 ring-yellow-400" // 🔥 highlight match
                            : ""}`}
                      >
                        <p className="font-medium">{e.title}</p>
                        <p className="text-[10px] opacity-80">{e.time}</p>
                      </motion.div>
                    ))}
                </AnimatePresence>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-80">
            <h3 className="text-lg font-bold mb-4">Add Event</h3>
            <input
              type="text"
              placeholder="Event title"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              className="w-full p-2 mb-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />
            <select
              value={newEvent.color}
              onChange={(e) => setNewEvent({ ...newEvent, color: e.target.value })}
              className="w-full p-2 mb-3 border rounded-lg"
            >
              <option value="blue">Blue</option>
              <option value="green">Green</option>
              <option value="purple">Purple</option>
              <option value="pink">Pink</option>
            </select>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleAddEvent}
                className="px-3 py-1 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
