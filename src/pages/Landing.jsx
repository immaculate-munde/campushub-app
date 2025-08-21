import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sun, Moon, Menu, X, Star, Users, BookOpen } from "lucide-react";

const Landing = () => {
  const featuresRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Detect scroll for navbar background
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle dark/light theme
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const scrollToFeatures = () => {
    featuresRef.current.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="flex flex-col w-full bg-white dark:bg-gray-900 overflow-x-hidden">
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 w-full z-20 transition-all ${
          scrolled
            ? "bg-white dark:bg-gray-900 shadow-md"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link
            to="/"
            className={`text-2xl font-bold ${
              scrolled ? "text-blue-600 dark:text-blue-400" : "text-white"
            }`}
          >
            CampusHub
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={scrollToFeatures}
              className={`font-medium ${
                scrolled
                  ? "text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
                  : "text-white"
              }`}
            >
              Features
            </button>
            <Link
              to="/signup"
              className={`px-4 py-2 rounded-md font-medium transition ${
                scrolled
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-white text-blue-600 hover:bg-gray-100"
              }`}
            >
              Sign Up
            </Link>
            <Link
              to="/login"
              className={`px-4 py-2 rounded-md font-medium border transition ${
                scrolled
                  ? "border-blue-600 text-blue-600 hover:bg-blue-50"
                  : "border-white text-white hover:bg-white hover:text-blue-600"
              }`}
            >
              Log In
            </Link>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              {darkMode ? (
                <Sun className="h-5 w-5 text-yellow-400" />
              ) : (
                <Moon className="h-5 w-5 text-gray-800" />
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white dark:text-gray-200 focus:outline-none"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg">
            <div className="flex flex-col items-start px-6 py-4 space-y-4">
              <button
                onClick={scrollToFeatures}
                className="text-gray-700 dark:text-gray-200 font-medium"
              >
                Features
              </button>
              <Link
                to="/signup"
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 text-center"
                onClick={() => setMenuOpen(false)}
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="w-full border border-blue-600 text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-blue-50 dark:hover:bg-gray-800 text-center"
                onClick={() => setMenuOpen(false)}
              >
                Log In
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative w-full h-screen flex items-center justify-center text-center">
        <div className="absolute inset-0 w-full h-full">
          <img
            src="/hero.png"
            alt="Students working"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>

        <div className="relative z-10 px-6 max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-6xl font-extrabold text-white"
          >
            Your Gateway to {" "}
            <span className="text-blue-400">Campus Success</span>
          </motion.h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-200">
            Organize notes, plan classes, and access resources all in one place.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition"
            >
              Log In
            </Link>
          </div>
        </div>

        {/* Scroll Arrow */}
        <motion.div
          onClick={scrollToFeatures}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "mirror" }}
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-20 bg-gray-50 dark:bg-gray-800 w-full">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Why Choose CampusHub?
          </h2>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md">
              <BookOpen className="h-10 w-10 text-blue-500 mx-auto" />
              <h3 className="mt-4 text-xl font-semibold text-blue-600 dark:text-blue-400">
                Notes
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Keep your notes organized and accessible anytime, anywhere.
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md">
              <Star className="h-10 w-10 text-yellow-500 mx-auto" />
              <h3 className="mt-4 text-xl font-semibold text-blue-600 dark:text-blue-400">
                Planner
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Stay on top of your classes, exams, and deadlines effortlessly.
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md">
              <Users className="h-10 w-10 text-green-500 mx-auto" />
              <h3 className="mt-4 text-xl font-semibold text-blue-600 dark:text-blue-400">
                Resources
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Access curated materials to help you excel in your studies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 w-full bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            What Students Say
          </h2>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[1, 2, 3].map((id) => (
              <div key={id} className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md">
                <p className="text-gray-700 dark:text-gray-300 italic">
                  “CampusHub has completely changed how I manage my classes. Super easy and efficient!”
                </p>
                <div className="mt-4 flex items-center justify-center gap-3">
                  <img
                    src={`https://i.pravatar.cc/100?img=${id}`}
                    alt="User"
                    className="h-10 w-10 rounded-full"
                  />
                  <span className="text-gray-900 dark:text-gray-200 font-medium">
                    Student {id}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-blue-600 text-white text-center">
        <h2 className="text-3xl sm:text-4xl font-bold">
          Ready to Transform Your Campus Life?
        </h2>
        <p className="mt-4 text-lg">
          Sign up today and unlock smarter ways to study, plan, and succeed.
        </p>
        <div className="mt-6 flex justify-center">
          <Link
            to="/signup"
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100"
          >
            Join Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white text-lg font-semibold">CampusHub</h3>
            <p className="mt-2 text-gray-400">
              Your all-in-one platform for smarter campus life.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold">Quick Links</h4>
            <ul className="mt-2 space-y-2">
              <li><Link to="/" className="hover:underline">Home</Link></li>
              <li><Link to="/signup" className="hover:underline">Sign Up</Link></li>
              <li><Link to="/login" className="hover:underline">Log In</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold">Follow Us</h4>
            <ul className="mt-2 space-y-2">
              <li><a href="#" className="hover:underline">Twitter</a></li>
              <li><a href="#" className="hover:underline">Instagram</a></li>
              <li><a href="#" className="hover:underline">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} CampusHub. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Landing;
