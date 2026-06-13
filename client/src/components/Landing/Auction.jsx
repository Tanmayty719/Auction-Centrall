import { FaClock, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router";

export const Auction = () => {
  return (
    <section className="py-24 bg-[#f8fafc] relative overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-200/40 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-200/40 blur-3xl rounded-full"></div>

      <div className="container mx-auto px-4 relative z-10">

        {/* SECTION HEADER */}
        <div className="flex justify-between items-center mb-14 flex-wrap gap-4">

          <div>

            <span className="inline-block px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-medium text-sm mb-4">

              LIVE AUCTIONS

            </span>

            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900">
              Trending Auctions
            </h2>

          </div>

          <Link
            to="/signup"
            className="group text-indigo-700 hover:text-indigo-900 flex items-center font-semibold text-lg transition-all"
          >
            View all

            <FaChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />

          </Link>

        </div>

        {/* AUCTION GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

          {/* CARD 1 */}
          <div className="group bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-4 transition-all duration-500">

            {/* IMAGE */}
            <div className="relative overflow-hidden">

              <img
                src="https://res.cloudinary.com/dgltznomz/image/upload/v1756812754/padlock_hqgohj.jpg"
                alt="Vintage Lock"
                className="w-full h-64 object-contain bg-gradient-to-b from-slate-50 to-slate-100 group-hover:scale-105 transition-transform duration-500"
              />

              {/* TIMER */}
              <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">

                <FaClock className="inline h-3 w-3 mr-2" />

                2h 15m

              </div>

            </div>

            {/* CONTENT */}
            <div className="p-6">

              <h3 className="font-bold text-2xl text-slate-900 mb-4 line-clamp-2">
                16th Century Triangle Padlock
              </h3>

              <div className="flex items-center justify-between mb-6">

                <div>

                  <p className="text-sm text-slate-500 mb-1">
                    Current Bid
                  </p>

                  <p className="text-2xl font-extrabold text-emerald-600">
                    ₹24,500
                  </p>

                </div>

                <div className="text-right">

                  <p className="text-sm text-slate-500 mb-1">
                    Bids
                  </p>

                  <p className="text-lg font-semibold text-slate-700">
                    12
                  </p>

                </div>

              </div>

              <Link to="/signup">

                <button className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white py-4 rounded-2xl font-semibold text-lg shadow-lg hover:scale-105 transition-all duration-300">

                  Place Bid

                </button>

              </Link>

            </div>

          </div>

          {/* CARD 2 */}
          <div className="group bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-4 transition-all duration-500">

            <div className="relative overflow-hidden">

              <img
                src="https://res.cloudinary.com/dgltznomz/image/upload/v1756813448/clock_bjj2qv.jpg"
                alt="Antique Clock"
                className="w-full h-64 object-contain bg-gradient-to-b from-slate-50 to-slate-100 group-hover:scale-105 transition-transform duration-500"
              />

              <div className="absolute top-4 right-4 bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">

                <FaClock className="inline h-3 w-3 mr-2" />

                5h 42m

              </div>

            </div>

            <div className="p-6">

              <h3 className="font-bold text-2xl text-slate-900 mb-4 line-clamp-2">
                Howard Miller Grandfather Clock
              </h3>

              <div className="flex items-center justify-between mb-6">

                <div>

                  <p className="text-sm text-slate-500 mb-1">
                    Current Bid
                  </p>

                  <p className="text-2xl font-extrabold text-emerald-600">
                    ₹12,500
                  </p>

                </div>

                <div className="text-right">

                  <p className="text-sm text-slate-500 mb-1">
                    Bids
                  </p>

                  <p className="text-lg font-semibold text-slate-700">
                    28
                  </p>

                </div>

              </div>

              <Link to="/signup">

                <button className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white py-4 rounded-2xl font-semibold text-lg shadow-lg hover:scale-105 transition-all duration-300">

                  Place Bid

                </button>

              </Link>

            </div>

          </div>

          {/* CARD 3 */}
          <div className="group bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-4 transition-all duration-500">

            <div className="relative overflow-hidden">

              <img
                src="https://res.cloudinary.com/dgltznomz/image/upload/v1756813464/painting_ozh8gt.jpg"
                alt="Painting"
                className="w-full h-64 object-contain bg-gradient-to-b from-slate-50 to-slate-100 group-hover:scale-105 transition-transform duration-500"
              />

              <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">

                <FaClock className="inline h-3 w-3 mr-2" />

                1d 3h

              </div>

            </div>

            <div className="p-6">

              <h3 className="font-bold text-2xl text-slate-900 mb-4 line-clamp-2">
                Lord Vishnu Painting by Raghavendra Swami
              </h3>

              <div className="flex items-center justify-between mb-6">

                <div>

                  <p className="text-sm text-slate-500 mb-1">
                    Current Bid
                  </p>

                  <p className="text-2xl font-extrabold text-emerald-600">
                    ₹34,787
                  </p>

                </div>

                <div className="text-right">

                  <p className="text-sm text-slate-500 mb-1">
                    Bids
                  </p>

                  <p className="text-lg font-semibold text-slate-700">
                    7
                  </p>

                </div>

              </div>

              <Link to="/signup">

                <button className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white py-4 rounded-2xl font-semibold text-lg shadow-lg hover:scale-105 transition-all duration-300">

                  Place Bid

                </button>

              </Link>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};