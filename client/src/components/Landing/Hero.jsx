// Hero.jsx

import React from "react";
import { Link } from "react-router";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f8fafc] via-white to-indigo-50 pt-24 pb-24">

      {/* BACKGROUND GLOW */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-indigo-200/40 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-200/40 blur-3xl rounded-full"></div>

      {/* GRID EFFECT */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:60px_60px]"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        <div className="text-center">

          {/* TAG */}
          <div className="inline-block px-5 py-2 rounded-full bg-indigo-100 text-indigo-700 font-semibold text-sm tracking-wide mb-8 shadow-sm">

            TRUSTED ONLINE AUCTION PLATFORM

          </div>

          {/* HEADING */}
          <h1 className="text-5xl md:text-8xl font-extrabold tracking-[-0.05em] leading-[0.95] text-[#0b132b] font-sans mb-8">

            The Future of

            <span className="block bg-gradient-to-r from-indigo-700 via-blue-600 to-cyan-500 bg-clip-text text-transparent mt-3">

              Online Antique Auction

            </span>

          </h1>

          {/* DESCRIPTION */}
          <p className="text-lg md:text-2xl font-medium text-slate-600 mb-12 max-w-4xl mx-auto leading-relaxed tracking-[-0.01em]">

            Discover rare antiques, place competitive bids,
            and sell your treasures to a global audience.
            Join thousands of collectors and sellers in our
            trusted modern marketplace.

          </p>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">

            {/* SIGNUP BUTTON */}
            <Link to="/signup">

              <button className="group bg-gradient-to-r from-indigo-700 to-blue-600 text-white px-10 py-5 rounded-2xl hover:scale-105 hover:shadow-[0_20px_50px_rgba(79,70,229,0.35)] transition-all duration-300 font-bold text-lg shadow-xl">

                Get Started

              </button>

            </Link>

            {/* LOGIN BUTTON */}
            <Link to="/login">

              <button className="bg-white/80 backdrop-blur-md text-slate-800 border border-slate-200 px-10 py-5 rounded-2xl hover:bg-white hover:scale-105 hover:shadow-xl transition-all duration-300 font-bold text-lg">

                Login

              </button>

            </Link>

          </div>

          {/* STATS */}
          <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">

            <div className="bg-white/70 backdrop-blur-md border border-slate-200 rounded-3xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">

              <h3 className="text-4xl font-extrabold tracking-[-0.04em] text-indigo-700 mb-2">
                10K+
              </h3>

              <p className="text-slate-600 font-semibold tracking-wide">
                Active Bidders
              </p>

            </div>

            <div className="bg-white/70 backdrop-blur-md border border-slate-200 rounded-3xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">

              <h3 className="text-4xl font-extrabold tracking-[-0.04em] text-emerald-600 mb-2">
                50K+
              </h3>

              <p className="text-slate-600 font-semibold tracking-wide">
                Auctions Completed
              </p>

            </div>

            <div className="bg-white/70 backdrop-blur-md border border-slate-200 rounded-3xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">

              <h3 className="text-4xl font-extrabold tracking-[-0.04em] text-cyan-600 mb-2">
                99%
              </h3>

              <p className="text-slate-600 font-semibold tracking-wide">
                Trusted Transactions
              </p>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};