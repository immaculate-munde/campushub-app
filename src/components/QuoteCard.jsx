import React, { useState, useEffect } from "react";

export default function QuoteCard() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  const fetchQuote = async () => {
    try {
      const res = await fetch("https://dummyjson.com/quotes/random");
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      const data = await res.json();
      setQuote(data.quote);
      setAuthor(data.author);
    } catch (error) {
      console.error("Error fetching quote:", error);
      setQuote("Failed to load quote.");
      setAuthor("");
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 
                    text-gray-900 dark:text-gray-100 
                    rounded-2xl shadow-xl p-8 
                    w-11/12 md:w-3/4 mx-auto 
                    text-center font-sans 
                    transition-colors duration-500">
      
      <p className="text-xl italic mb-4">"{quote}"</p>
      <p className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-6">
        — {author}
      </p>

      <button
        className="bg-blue-500 hover:bg-blue-600 
                   dark:bg-blue-600 dark:hover:bg-blue-700 
                   text-white px-4 py-2 rounded-lg 
                   text-sm font-medium transition duration-300"
        onClick={fetchQuote}
      >
        New Quote
      </button>
    </div>
  );
}
