import React from "react";
import { BookOpen, Calendar, FileText, Users } from "lucide-react";

const features = [
  {
    icon: <BookOpen className="w-10 h-10 text-blue-600" />,
    title: "Smart Notes",
    desc: "Organize your study materials and access them anytime, anywhere.",
  },
  {
    icon: <Calendar className="w-10 h-10 text-green-600" />,
    title: "Planner",
    desc: "Keep track of assignments, deadlines, and upcoming exams with ease.",
  },
  {
    icon: <FileText className="w-10 h-10 text-purple-600" />,
    title: "Resources",
    desc: "Find curated resources and materials tailored to your courses.",
  },
  {
    icon: <Users className="w-10 h-10 text-pink-600" />,
    title: "Community",
    desc: "Connect and collaborate with fellow students for better learning.",
  },
];

export default function Features() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
          Why Students Love CampusHub
        </h2>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-lg transition"
            >
              {feature.icon}
              <h3 className="mt-4 text-lg font-semibold text-gray-800 dark:text-white">
                {feature.title}
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
