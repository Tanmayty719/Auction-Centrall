// CTA.jsx

import React from "react";
import { Link } from "react-router";

export const CTA = () => {
  return (
    <section className="py-24 bg-[#f8fafc] relative overflow-hidden">

      {/* BACKGROUND EFFECTS */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-300/20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-300/20 blur-3xl rounded-full"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-[#312e81] via-[#4338ca] to-[#1e3a8a] px-10 py-20 md:px-20 text-center shadow-[0_20px_80px_rgba(49,46,129,0.35)]">

          {/* GLOW */}
          <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 blur-3xl rounded-full"></div>

          <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-400/20 blur-3xl rounded-full"></div>

          <div className="relative z-10">

            {/* TAG */}
            <div className="inline-block px-5 py-2 rounded-full bg-white/10 border border-white/20 text-indigo-100 text-sm font-medium backdrop-blur-md mb-6">

              START BIDDING TODAY

            </div>

            {/* TITLE */}
            <h2 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-8">

              Ready to Start Your
              <br />
              Auction Journey?

            </h2>

            {/* DESCRIPTION */}
            <p className="text-lg md:text-2xl text-indigo-100 max-w-3xl mx-auto leading-relaxed mb-12">

              Discover rare collectibles, compete in live auctions,
              and turn your valuable items into profit — all in one place.

            </p>

            {/* BUTTON */}
            <Link to="/auction">

              <button className="bg-white text-indigo-500 px-10 py-5 rounded-2xl font-bold text-lg shadow-xl hover:scale-110 hover:bg-indigo-50 transition-all duration-300">

                Explore Auctions

              </button>

            </Link>

          </div>

        </div>
      </div>
    </section>
  );
};