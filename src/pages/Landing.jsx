// src/pages/Landing.jsx
import React from "react";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";
import { useTheme } from "../contexts/ThemeContext";

export default function Landing() {
  const { theme } = useTheme();

  return (
    <div className={`${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"} w-full`}>
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center text-center w-full"
        style={{
          backgroundImage: "url('/hero.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl px-6">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-white">
            Welcome to <span className="text-blue-400">CampusHub</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-8">
            Your all-in-one student platform to stay organized, manage notes,
            plan ahead, and access resources with ease.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/signup"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg transition"
            >
              Get Started
            </a>
            <a
              href="/login"
              className="px-6 py-3 bg-white/80 hover:bg-white text-gray-900 rounded-lg shadow-lg transition"
            >
              Login
            </a>
          </div>
        </div>
      </section>

      {/* Other Sections */}
      <Features />
      <Testimonials />
      <Footer />
    </div>
  );
}
