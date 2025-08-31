import React from "react";
import { motion } from "framer-motion";
import { CalendarIcon, StickyNoteIcon, LinkIcon } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useNotes } from "../contexts/NotesContext";
import { useEvents } from "../contexts/EventsContext";
import { useSearch } from "../contexts/SearchContext";
import EventCard from "../components/EventCard";
import { Link } from "react-router-dom";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Card wrapper component
function Card({ children, title, icon, accent, span = "md:col-span-1" }) {
  const { theme } = useTheme();
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.02 }}
      className={`p-6 rounded-xl shadow-md ${span} ${
        theme === "dark" ? "bg-gray-800" : "bg-white"
      }`}
    >
      <h2
        className={`text-lg font-semibold mb-4 flex items-center ${
          theme === "dark" ? "text-white" : "text-gray-900"
        }`}
      >
        {icon && <span className={`mr-2 h-5 w-5 ${accent}`}>{icon}</span>}
        {title}
      </h2>
      {children}
    </motion.div>
  );
}

function Notes() {
  const { theme } = useTheme();
  const { notes } = useNotes();
  const { events, removeEvent } = useEvents();
  const { searchQuery } = useSearch(); // ✅ Grab global search query

  // 🔍 Filter notes by search
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 🔍 Filter events by search
  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      {/* Schedule */}
      <Card
        title="Today's Schedule"
        icon={<CalendarIcon className="h-5 w-5 text-blue-500" />}
        accent="text-blue-500"
      >
        <div className="space-y-3">
          {filteredEvents.length === 0 ? (
            <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
              No matching events found.
            </p>
          ) : (
            filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} onDelete={removeEvent} />
            ))
          )}
        </div>
      </Card>

      {/* Notes */}
      <Card
        title="Recent Notes"
        icon={<StickyNoteIcon className="h-5 w-5 text-yellow-500" />}
        accent="text-yellow-500"
      >
        <div className="space-y-3">
          {filteredNotes.length === 0 ? (
            <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
              No matching notes found.
            </p>
          ) : (
            filteredNotes.slice(0, 3).map((note) => (
              <div
                key={note.id}
                className={`p-3 rounded-lg ${
                  theme === "dark"
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-gray-50 hover:bg-gray-100"
                } transition-colors duration-200`}
              >
                <h3 className="font-medium">{note.title}</h3>
                <p
                  className={`text-sm truncate ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {note.content}
                </p>
              </div>
            ))
          )}
        </div>
      </Card>

      {/* Quick Links */}
      <Card
        title="Quick Links"
        icon={<LinkIcon className="h-5 w-5 text-green-500" />}
        accent="text-green-500"
        span="md:col-span-2"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { name: "Planner", path: "/planner" },
            { name: "Dashboard", path: "/dashboard" },
            { name: "Resources", path: "/resources" },
          ].map((link, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link
                to={link.path}
                className={`block p-4 rounded-lg text-center font-medium ${
                  theme === "dark"
                    ? "bg-gray-700 hover:bg-gray-600 text-white"
                    : "bg-gray-50 hover:bg-gray-100 text-gray-900"
                } transition-colors duration-200`}
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}

export default Notes;
