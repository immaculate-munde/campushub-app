import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, googleProvider, appleProvider } from "../firebase"; 
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Email/Password login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard"); 
    } catch (err) {
      alert(err.message);
    }
  };

  // Google login
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/dashboard");
    } catch (err) {
      alert(err.message);
    }
  };

  // Apple login
  const handleAppleLogin = async () => {
    try {
      await signInWithPopup(auth, appleProvider);
      navigate("/dashboard");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
          Login to CampusHub
        </h2>

        {/* Email/Password Form */}
        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-2 text-gray-500">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Social Logins */}
        <div className="flex flex-col gap-3">
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-600 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Login with Google
          </button>
          <button
            onClick={handleAppleLogin}
            className="w-full flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-600 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
              alt="Apple"
              className="w-5 h-5"
            />
            Login with Apple
          </button>
        </div>

        {/* Signup Link */}
        <p className="text-sm text-center mt-4 text-gray-600 dark:text-gray-300">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
