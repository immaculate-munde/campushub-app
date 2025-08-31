import React, { useState } from "react";
import emailjs from "emailjs-com";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setStatus("⚠️ Please fill out all fields.");
      return;
    }

    emailjs
      .send(
        "service_xcxrwyh",   // replace
        "template_0epdno9",  // replace
        formData,
        "EF98BjjKWKEP0UmIY"    // replace
      )
      .then(
        () => {
          setStatus("✅ Message sent successfully!");
          setFormData({ name: "", email: "", message: "" });
          setTimeout(() => setStatus(""), 4000);
        },
        (error) => {
          console.error(error);
          setStatus("❌ Failed to send. Try again later.");
        }
      );
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Us</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={formData.name}
          onChange={handleChange}
          className="w-full rounded-xl border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
        />
        <input
          type="email"
          name="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={handleChange}
          className="w-full rounded-xl border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
        />
        <textarea
          name="message"
          placeholder="Write your message..."
          rows="4"
          value={formData.message}
          onChange={handleChange}
          className="w-full rounded-xl border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-xl transition"
        >
          Send Message
        </button>
      </form>
      {status && (
        <p className="mt-3 text-center text-sm text-gray-600">{status}</p>
      )}
    </div>
  );
};

export default ContactForm;
