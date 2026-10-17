import React, { useState } from "react";
import { useTheme } from "@mui/material";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SendIcon from "@mui/icons-material/Send";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import toast from "react-hot-toast";

function ContactForm() {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactChannels = [
    {
      title: "Customer & Order Support",
      description: "Assistance with your orders, shipping, and product questions.",
      email: "support@abrand.com",
      phone: "+20 106 488 094",
      icon: <SupportAgentIcon className="!text-2xl" />,
      badge: "24/7 Response",
    },
    {
      title: "Showroom & Headquarters",
      description: "Visit our flagship store and meet the team in person.",
      address: "21st Century St., Desouk, Egypt",
      phone: "047 258 5456",
      icon: <LocationOnIcon className="!text-2xl" />,
    },
    {
      title: "Operating Hours",
      description: "Our dedicated support team is available during these hours.",
      hours: [
        "Mon - Thu: 9:00 AM - 10:00 PM",
        "Friday: 1:00 PM - 10:00 PM",
        "Saturday: 10:00 AM - 8:00 PM",
      ],
      icon: <AccessTimeIcon className="!text-2xl" />,
    },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Please provide your name.");
      return;
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Please provide a valid email address.");
      return;
    }
    if (!formData.message.trim()) {
      toast.error("Please enter your message.");
      return;
    }

    setIsSubmitting(true);

    // Simulate sending message
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success("Thank you! Your message has been sent successfully.");
      setFormData({
        name: "",
        email: "",
        subject: "General Inquiry",
        message: "",
      });
    }, 1000);
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
  };

  return (
    <div
      className={`contact min-h-[calc(100vh-110px)] py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200 ${
        isDarkMode ? "bg-[#111827] text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 ${
              isDarkMode
                ? "bg-teal-950/70 text-teal-300 border border-teal-800"
                : "bg-teal-50 text-teal-700 border border-teal-200"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
            Get in Touch
          </div>
          <h1
            className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            We'd love to hear from you
          </h1>
          <p
            className={`mt-4 text-base sm:text-lg leading-relaxed ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Have a question about our products, orders, or a custom inquiry? Reach
            out to us anytime and our team will get back to you promptly.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Form Card (7 Cols) */}
          <div
            className={`lg:col-span-7 rounded-2xl border p-6 sm:p-8 lg:p-10 shadow-lg transition-all duration-200 ${
              isDarkMode
                ? "bg-gray-800/80 border-gray-700/80 shadow-gray-950/50"
                : "bg-white border-gray-200 shadow-gray-200/50"
            }`}
          >
            {isSubmitted ? (
              <div className="py-12 text-center flex flex-col items-center">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mb-5 ${
                    isDarkMode
                      ? "bg-teal-900/50 text-teal-400"
                      : "bg-teal-50 text-teal-600"
                  }`}
                >
                  <CheckCircleOutlineIcon className="!text-4xl" />
                </div>
                <h3
                  className={`text-2xl font-bold mb-2 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Message Sent!
                </h3>
                <p
                  className={`max-w-md mx-auto mb-8 text-sm sm:text-base ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Thank you for reaching out. We have received your message and
                  our team will get back to you within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="px-6 py-2.5 rounded-xl font-medium text-sm text-white bg-teal-600 hover:bg-teal-500 transition-colors shadow-sm"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <h2
                    className={`text-2xl font-bold tracking-tight mb-2 ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Send us a message
                  </h2>
                  <p
                    className={`text-sm ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Fill in your details and our team will get in touch with you shortly.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="name"
                        className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        required
                        className={`w-full px-4 py-3 rounded-xl border text-sm transition-all duration-200 outline-none focus:ring-2 ${
                          isDarkMode
                            ? "bg-gray-900/60 border-gray-700 text-white placeholder-gray-500 focus:border-teal-400 focus:ring-teal-500/20"
                            : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:bg-white focus:border-teal-500 focus:ring-teal-500/20"
                        }`}
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        required
                        className={`w-full px-4 py-3 rounded-xl border text-sm transition-all duration-200 outline-none focus:ring-2 ${
                          isDarkMode
                            ? "bg-gray-900/60 border-gray-700 text-white placeholder-gray-500 focus:border-teal-400 focus:ring-teal-500/20"
                            : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:bg-white focus:border-teal-500 focus:ring-teal-500/20"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="subject"
                      className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-xl border text-sm transition-all duration-200 outline-none focus:ring-2 ${
                        isDarkMode
                          ? "bg-gray-900/90 border-gray-700 text-white focus:border-teal-400 focus:ring-teal-500/20"
                          : "bg-gray-50 border-gray-300 text-gray-900 focus:bg-white focus:border-teal-500 focus:ring-teal-500/20"
                      }`}
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Order & Shipping Status">Order & Shipping Status</option>
                      <option value="Returns & Exchanges">Returns & Exchanges</option>
                      <option value="Wholesale & Bulk Orders">Wholesale & Bulk Orders</option>
                      <option value="Technical Support">Technical Support</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="How can we help you? Write your message here..."
                      required
                      className={`w-full px-4 py-3 rounded-xl border text-sm transition-all duration-200 outline-none resize-none focus:ring-2 ${
                        isDarkMode
                          ? "bg-gray-900/60 border-gray-700 text-white placeholder-gray-500 focus:border-teal-400 focus:ring-teal-500/20"
                            : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:bg-white focus:border-teal-500 focus:ring-teal-500/20"
                      }`}
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-medium text-white transition-all duration-200 shadow-md ${
                      isSubmitting
                        ? "bg-teal-400 cursor-not-allowed opacity-80"
                        : "bg-teal-600 hover:bg-teal-500 hover:shadow-teal-500/25 active:scale-[0.99]"
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <SendIcon className="!text-sm" />
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>

          {/* Info Cards (5 Cols) */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-5">
            {contactChannels.map((channel, idx) => (
              <div
                key={idx}
                className={`p-5 sm:p-6 rounded-2xl border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
                  isDarkMode
                    ? "bg-gray-800/80 border-gray-700/80 hover:border-teal-500/50"
                    : "bg-white border-gray-200 hover:border-teal-400/50 hover:shadow-gray-200/50"
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                      isDarkMode
                        ? "bg-teal-950/60 text-teal-400 border border-teal-800/60"
                        : "bg-teal-50 text-teal-600 border border-teal-100"
                    }`}
                  >
                    {channel.icon}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h3
                        className={`text-base font-bold truncate ${
                          isDarkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {channel.title}
                      </h3>
                      {channel.badge && (
                        <span
                          className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                            isDarkMode
                              ? "bg-teal-950/80 text-teal-300 border border-teal-800"
                              : "bg-teal-50 text-teal-700 border border-teal-200"
                          }`}
                        >
                          {channel.badge}
                        </span>
                      )}
                    </div>

                    <p
                      className={`text-xs mb-3 leading-relaxed ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {channel.description}
                    </p>

                    <div className="space-y-1.5 text-xs sm:text-sm">
                      {channel.email && (
                        <div className="flex items-center gap-2">
                          <EmailIcon
                            className={`!text-sm ${
                              isDarkMode ? "text-teal-400" : "text-teal-600"
                            }`}
                          />
                          <a
                            href={`mailto:${channel.email}`}
                            className={`font-medium transition-colors hover:text-teal-500 hover:underline ${
                              isDarkMode ? "text-gray-200" : "text-gray-700"
                            }`}
                          >
                            {channel.email}
                          </a>
                        </div>
                      )}

                      {channel.phone && (
                        <div className="flex items-center gap-2">
                          <PhoneIcon
                            className={`!text-sm ${
                              isDarkMode ? "text-teal-400" : "text-teal-600"
                            }`}
                          />
                          <a
                            href={`tel:${channel.phone.replace(/\s+/g, "")}`}
                            className={`font-medium transition-colors hover:text-teal-500 hover:underline ${
                              isDarkMode ? "text-gray-200" : "text-gray-700"
                            }`}
                          >
                            {channel.phone}
                          </a>
                        </div>
                      )}

                      {channel.address && (
                        <div className="flex items-start gap-2">
                          <LocationOnIcon
                            className={`!text-sm mt-0.5 ${
                              isDarkMode ? "text-teal-400" : "text-teal-600"
                            }`}
                          />
                          <span
                            className={`font-medium ${
                              isDarkMode ? "text-gray-200" : "text-gray-700"
                            }`}
                          >
                            {channel.address}
                          </span>
                        </div>
                      )}

                      {channel.hours && (
                        <div className="mt-2 pt-2 border-t border-dashed space-y-1 text-xs border-gray-200 dark:border-gray-700">
                          {channel.hours.map((h, hIdx) => (
                            <p
                              key={hIdx}
                              className={isDarkMode ? "text-gray-300" : "text-gray-600"}
                            >
                              {h}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
