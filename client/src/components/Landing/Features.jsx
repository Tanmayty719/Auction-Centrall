// Features.jsx

import React from "react";
import { FaClock, FaGavel, FaShieldAlt } from "react-icons/fa";

export const Features = () => {
  return (
    <section className="py-24 bg-[#f8fafc] relative overflow-hidden">

      {/* BACKGROUND DECOR */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-200/40 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-200/40 blur-3xl rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* HEADING */}
        <div className="text-center mb-20">

          <span className="inline-block px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-medium text-sm mb-5">

            PREMIUM AUCTION EXPERIENCE

          </span>

          <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight mb-6">

            Why Choose Our Platform?

          </h2>

          <p className="text-slate-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">

            Built for collectors, sellers, and bidders who want a modern,
            secure, and smooth auction experience.

          </p>

        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* CARD 1 */}
          <div className="group bg-white border border-slate-200 rounded-[2rem] p-10 shadow-lg hover:shadow-2xl hover:-translate-y-4 transition-all duration-500 relative overflow-hidden">

            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>

            <div className="relative z-10">

              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center mx-auto mb-8 shadow-lg group-hover:scale-110 transition-transform duration-300">

                <FaGavel className="text-3xl text-white" />

              </div>

              <h3 className="text-3xl font-bold text-slate-900 mb-5 text-center">

                Easy Bidding

              </h3>

              <p className="text-slate-600 text-lg leading-relaxed text-center">

                Place bids instantly with a modern interface and enjoy real-time
                auction updates without refreshing the page.

              </p>

            </div>

          </div>

          {/* CARD 2 */}
          <div className="group bg-white border border-slate-200 rounded-[2rem] p-10 shadow-lg hover:shadow-2xl hover:-translate-y-4 transition-all duration-500 relative overflow-hidden">

            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>

            <div className="relative z-10">

              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center mx-auto mb-8 shadow-lg group-hover:scale-110 transition-transform duration-300">

                <FaShieldAlt className="text-3xl text-white" />

              </div>

              <h3 className="text-3xl font-bold text-slate-900 mb-5 text-center">

                Secure Payments

              </h3>

              <p className="text-slate-600 text-lg leading-relaxed text-center">

                Advanced security and protected transactions ensure complete
                trust for buyers and sellers.

              </p>

            </div>

          </div>

          {/* CARD 3 */}
          <div className="group bg-white border border-slate-200 rounded-[2rem] p-10 shadow-lg hover:shadow-2xl hover:-translate-y-4 transition-all duration-500 relative overflow-hidden">

            <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>

            <div className="relative z-10">

              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center mx-auto mb-8 shadow-lg group-hover:scale-110 transition-transform duration-300">

                <FaClock className="text-3xl text-white" />

              </div>

              <h3 className="text-3xl font-bold text-slate-900 mb-5 text-center">

                24/7 Live Auctions

              </h3>

              <p className="text-slate-600 text-lg leading-relaxed text-center">

                Participate anytime with live countdowns, instant bidding, and
                uninterrupted auction access.

              </p>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};