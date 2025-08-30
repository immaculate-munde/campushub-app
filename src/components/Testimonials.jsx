// src/components/Testimonials.jsx
import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Sophia Kim",
    role: "Computer Science Student",
    quote:
      "This platform completely transformed the way I manage my study schedule. The planner and notes section are lifesavers!",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "David Chen",
    role: "History Major",
    quote:
      "I love how everything is in one place. It keeps me focused and organized without the usual stress of juggling apps.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Amara Njoroge",
    role: "Engineering Student",
    quote:
      "The clean design makes it easy to use, and I feel more productive every single day. Highly recommend to students!",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          What Students Are Saying
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="p-6 rounded-xl shadow-md bg-white dark:bg-gray-800 hover:shadow-lg hover:scale-[1.02] transition-transform"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-4">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-12 h-12 rounded-full mr-3 object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {t.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {t.role}
                  </p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300">“{t.quote}”</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
