// src/components/EventCard.jsx
import React from "react";
import { motion } from "framer-motion";

export default function EventCard({ event, onDelete }) {
  return (
    <motion.div
      key={event.id}
      whileHover={{ scale: 1.02 }}
      className="p-3 rounded-lg border mb-2 flex justify-between items-center"
    >
      <div>
        <h4 className="font-semibold">{event.title}</h4>
        <p className="text-sm">
          {event.time} — {event.location}
        </p>
      </div>
      {onDelete && (
        <button
          onClick={() => onDelete(event.id)}
          className="ml-4 text-red-500 hover:text-red-700"
        >
          ✕
        </button>
      )}
    </motion.div>
  );
}
