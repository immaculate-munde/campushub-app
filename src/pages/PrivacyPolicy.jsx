import React from "react";
import { useTheme } from "../contexts/ThemeContext";

const PrivacyPolicy = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen px-6 py-12 ${
        theme === "dark" ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-800"
      }`}
    >
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <p className="mb-4">
          Your privacy is important to us. This policy explains how CampusHub
          collects, uses, and protects your information.
        </p>
        <h2 className="text-xl font-semibold mb-2">1. Information We Collect</h2>
        <p className="mb-4">
          We may collect personal details such as your name, email, and usage
          activity for improving your experience.
        </p>
        <h2 className="text-xl font-semibold mb-2">2. Use of Information</h2>
        <p className="mb-4">
          Your data is used to provide and improve CampusHub services. We do not
          sell your information to third parties.
        </p>
        <h2 className="text-xl font-semibold mb-2">3. Security</h2>
        <p className="mb-4">
          We take appropriate security measures to protect your data against
          unauthorized access.
        </p>
        <p className="mt-8 text-sm opacity-70">
          Last updated: August 2025
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
