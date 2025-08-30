// src/components/Footer.jsx
import React from "react";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-10 mt-16">
      <div className="container mx-auto px-6 grid gap-8 md:grid-cols-3 items-center">
        {/* Brand */}
        <div className="text-center md:text-left">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            CampusHub
          </h3>
          <p className="text-sm mt-2">
            Your all-in-one study companion for notes, planning, and resources.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex justify-center space-x-6">
          <a
            href="/"
            className="hover:text-blue-500 transition-colors duration-200"
          >
            Home
          </a>
          <a
            href="/resources"
            className="hover:text-blue-500 transition-colors duration-200"
          >
            Resources
          </a>
          <a
            href="/planner"
            className="hover:text-blue-500 transition-colors duration-200"
          >
            Planner
          </a>
          <a
            href="/notes"
            className="hover:text-blue-500 transition-colors duration-200"
          >
            Notes
          </a>
        </div>

        {/* Social Links */}
        <div className="flex justify-center md:justify-end space-x-5 text-xl">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition-colors duration-200"
          >
            <FaGithub />
          </a>
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition-colors duration-200"
          >
            <FaTwitter />
          </a>
          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition-colors duration-200"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} CampusHub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
