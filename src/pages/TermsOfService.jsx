import React from "react";
import { useTheme } from "../contexts/ThemeContext";

const TermsOfService = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen px-6 py-12 ${
        theme === "dark" ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-800"
      }`}
    >
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
        <p className="mb-4">
          Welcome to CampusHub! By using our services, you agree to these terms.
        </p>
        <h2 className="text-xl font-semibold mb-2">1. Use of Service</h2>
        <p className="mb-4">
          You may use CampusHub only for lawful purposes. You must not misuse
          or disrupt the platform.
        </p>
        <h2 className="text-xl font-semibold mb-2">2. Accounts</h2>
        <p className="mb-4">
          You are responsible for maintaining the confidentiality of your
          account and activities that occur under your login.
        </p>
        <h2 className="text-xl font-semibold mb-2">3. Content</h2>
        <p className="mb-4">
          All materials shared remain property of their creators. CampusHub is
          not liable for user-generated content.
        </p>
        <p className="mt-8 text-sm opacity-70">
          Last updated: August 2025
        </p>
      </div>
    </div>
  );
};

export default TermsOfService;
