import { useState } from "react";
import { FiSend } from "react-icons/fi";
import { useMutation } from "@tanstack/react-query";
import { sendMessage } from "../api/contact";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isError, setIsError] = useState("");

  const { isPending, mutate } = useMutation({
    mutationFn: () => sendMessage(formData),

    onSuccess: () => {
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      setSubmitted(true);
    },

    onError: (error) => {
      setIsError(
        error?.response?.data?.error || "Something went wrong"
      );

      setTimeout(() => {
        setIsError("");
      }, 5000);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-white to-indigo-50 relative overflow-hidden font-sans">

      {/* BACKGROUND GLOW */}
      <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-indigo-200/40 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-200/40 blur-3xl rounded-full"></div>

      <div className="max-w-4xl mx-auto px-4 py-16 relative z-10">

        {/* HEADING */}
        <div className="text-center mb-12">

          <div className="inline-block px-5 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold tracking-wide mb-5">

            CONTACT SUPPORT

          </div>

          <h1 className="text-5xl md:text-6xl font-black tracking-tight text-slate-900 mb-5">

            Get In Touch

          </h1>

          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">

            Have questions, feedback, or need assistance?
            We’d love to hear from you.

          </p>

        </div>

        {/* CARD */}
        <div className="bg-white/80 backdrop-blur-xl border border-white/40 rounded-[2rem] shadow-[0_20px_60px_rgba(79,70,229,0.15)] p-8 md:p-10 hover:shadow-[0_30px_80px_rgba(79,70,229,0.20)] transition-all duration-500">

          {submitted ? (

            <div className="text-center py-10">

              {/* SUCCESS ICON */}
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 shadow-lg mb-6 animate-pulse">

                <svg
                  className="h-10 w-10 text-green-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />

                </svg>

              </div>

              <h2 className="text-3xl font-bold text-slate-900 mb-4">

                Message Sent Successfully!

              </h2>

              <p className="text-slate-600 text-lg mb-8">

                Thank you for contacting us.
                We'll get back to you shortly.

              </p>

              <button
                onClick={() => setSubmitted(false)}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-[0_20px_50px_rgba(79,70,229,0.35)] transition-all duration-300"
              >

                Send Another Message

              </button>

            </div>

          ) : (

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              {/* NAME */}
              <div>

                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-slate-700 mb-2 tracking-wide"
                >
                  Full Name
                </label>

                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your name"
                  className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-white/70 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all duration-300 shadow-sm hover:shadow-md"
                />

              </div>

              {/* EMAIL */}
              <div>

                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-slate-700 mb-2 tracking-wide"
                >
                  Email Address
                </label>

                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                  className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-white/70 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all duration-300 shadow-sm hover:shadow-md"
                />

              </div>

              {/* SUBJECT */}
              <div>

                <label
                  htmlFor="subject"
                  className="block text-sm font-semibold text-slate-700 mb-2 tracking-wide"
                >
                  Subject
                </label>

                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="What is this regarding?"
                  className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-white/70 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all duration-300 shadow-sm hover:shadow-md"
                />

              </div>

              {/* MESSAGE */}
              <div>

                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-slate-700 mb-2 tracking-wide"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="Write your message here..."
                  className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-white/70 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all duration-300 shadow-sm hover:shadow-md resize-none"
                ></textarea>

              </div>

              {/* ERROR */}
              {isError && (

                <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-2xl text-sm font-medium animate-pulse">

                  {isError}

                </div>

              )}

              {/* BUTTON */}
              <div className="flex justify-end">

                <button
                  type="submit"
                  disabled={isPending}
                  className="group flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-700 via-blue-600 to-cyan-500 text-white font-bold text-lg shadow-xl hover:shadow-[0_20px_50px_rgba(79,70,229,0.35)] hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >

                  {isPending ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message

                      <FiSend className="text-xl group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}

                </button>

              </div>

            </form>

          )}

        </div>

      </div>

    </main>
  );
};