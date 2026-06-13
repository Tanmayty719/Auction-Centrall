import { Link } from "react-router";
import { FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";
import logo from "../assets/logoac.png";

export const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-[#0b132b] via-[#111c44] to-[#1e3a8a] pt-16 pb-10 font-sans">

      {/* BACKGROUND GLOW */}
      <div className="absolute -top-24 left-0 w-72 h-72 bg-indigo-500/20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-400/20 blur-3xl rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* TOP SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-10 border-b border-white/10 pb-10">

          {/* LOGO + BRAND */}
          <div className="text-center md:text-left">

            <div className="flex items-center justify-center md:justify-start gap-4 mb-5">

              {/* CIRCLE LOGO */}
              <div className="w-16 h-16 rounded-full overflow-hidden shadow-2xl bg-white p-1 border-2 border-white/30 hover:scale-110 hover:rotate-3 transition-all duration-500">

                <img
                  src={logo}
                  alt="Auction Centrall Logo"
                  className="w-full h-full object-cover rounded-full"
                />

              </div>

              {/* BRAND NAME */}
              <div>

                <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight">

                  Auction Centrall

                </h3>

                <p className="text-cyan-300 text-sm tracking-widest uppercase mt-1">

                  Premium Auction Platform

                </p>

              </div>

            </div>

            {/* DESCRIPTION */}
            <p className="text-slate-300 text-base max-w-md leading-relaxed">

              Discover rare collectibles, bid in real-time,
              and experience the future of online auctions
              with a trusted modern marketplace.

            </p>

          </div>

          {/* LINKS + SOCIAL */}
          <div className="flex flex-col items-center md:items-end gap-6">

            {/* NAVIGATION */}
            <div className="flex items-center gap-8 text-[15px] font-medium">

              <Link
                to="/"
                className="text-slate-300 hover:text-white hover:-translate-y-1 transition-all duration-300"
              >
                Home
              </Link>

              <Link
                to="/contact"
                className="text-slate-300 hover:text-cyan-300 hover:-translate-y-1 transition-all duration-300"
              >
                Contact
              </Link>

              <Link
                to="/about"
                className="text-slate-300 hover:text-indigo-300 hover:-translate-y-1 transition-all duration-300"
              >
                About
              </Link>

            </div>

            {/* SOCIAL ICONS */}
            <div className="flex gap-5">

                        {/*   <a
                href="#"
                className="group w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-slate-300 hover:bg-gradient-to-r hover:from-pink-500 hover:to-orange-400 hover:text-white hover:scale-110 transition-all duration-300 shadow-lg"
              >
                <FaInstagram className="text-lg group-hover:rotate-12 transition-transform duration-300" />
              </a>*/}

              <a
                href="https://github.com/Tanmayty719"
                className="group w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-slate-300 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 hover:text-white hover:scale-110 transition-all duration-300 shadow-lg"
              >
                <FaGithub className="text-lg group-hover:rotate-12 transition-transform duration-300" />
              </a>

              <a
                href="https://www.linkedin.com/in/tanmay-kamtekar-644996371/"
                className="group w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-slate-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500 hover:text-white hover:scale-110 transition-all duration-300 shadow-lg"
              >
                <FaLinkedin className="text-lg group-hover:rotate-12 transition-transform duration-300" />
              </a>

            </div>

          </div>

        </div>

        {/* BOTTOM */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-5">

          <p className="text-slate-400 text-sm text-center md:text-left">

            © 2026 Auction Centrall. All rights reserved.

          </p>

          {/* LEGAL LINKS */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">

            <Link
              to="/legal/privacy-policy"
              className="text-slate-400 hover:text-white transition-all duration-300"
            >
              Privacy Policy
            </Link>

            <Link
              to="/legal/terms-of-service"
              className="text-slate-400 hover:text-cyan-300 transition-all duration-300"
            >
              Terms
            </Link>

            <Link
              to="/legal/code-of-conduct"
              className="text-slate-400 hover:text-indigo-300 transition-all duration-300"
            >
              Code of Conduct
            </Link>

          </div>

        </div>

      </div>
    </footer>
  );
};