import { Link } from "react-router";
import { Gavel, ArrowLeft, Search } from "lucide-react";

const Error = () => {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
      <div className="max-w-4xl w-full">

        <div className="bg-slate-900/80 backdrop-blur-lg border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">

          <div className="grid lg:grid-cols-2">

            {/* Left */}
            <div className="p-10 lg:p-14">

              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 text-red-400 text-sm border border-red-500/20">
                Error 404
              </span>

              <h1 className="mt-6 text-5xl md:text-6xl font-black text-white">
                Lost in the Auction?
              </h1>

              <p className="mt-5 text-slate-400 text-lg leading-relaxed">
                The page you're looking for may have been removed,
                expired, or never existed.
              </p>

              <div className="flex flex-wrap gap-4 mt-8">

                <Link
                  to="/"
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition"
                >
                  <ArrowLeft size={18} />
                  Back Home
                </Link>

                

              </div>
            </div>

            {/* Right */}
            <div className="relative flex items-center justify-center p-10 bg-gradient-to-br from-indigo-600/10 via-slate-900 to-slate-900">

              <div className="relative">

                <div className="absolute inset-0 blur-3xl bg-indigo-500/20 rounded-full"></div>

                <div className="relative w-72 bg-slate-800 border border-slate-700 rounded-2xl p-6 rotate-6">

                  <div className="flex justify-between items-center mb-6">
                    <span className="text-slate-400 text-sm">
                      Auction Item
                    </span>

                    <span className="text-red-400 text-xs font-semibold">
                      REMOVED
                    </span>
                  </div>

                  <div className="h-32 rounded-xl bg-slate-700 flex items-center justify-center">
                    <Gavel size={60} className="text-slate-500" />
                  </div>

                  <div className="mt-5">
                    <h3 className="text-white font-bold">
                      Premium Collectible
                    </h3>

                    <p className="text-slate-500 text-sm mt-2">
                      This listing could not be found.
                    </p>
                  </div>

                  <div className="mt-6 border-t border-slate-700 pt-4">
                    <p className="text-slate-400 text-sm">
                      Current Bid
                    </p>
                    <p className="text-2xl font-bold text-white">
                      ---
                    </p>
                  </div>

                </div>

                <div className="absolute -bottom-6 -left-6 text-[120px] font-black text-slate-800">
                  404
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Error;