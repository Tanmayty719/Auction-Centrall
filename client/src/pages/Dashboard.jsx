import AuctionCard from "../components/AuctionCard.jsx";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { dashboardStats } from "../api/auction.js";
import LoadingScreen from "../components/LoadingScreen.jsx";
import {
  FaGavel,
  FaFire,
  FaCoins,
  FaChartLine,
  FaArrowRight,
} from "react-icons/fa";

const Dashboard = () => {
 const {
  data,
  isLoading,
  isError,
  error,
} = useQuery({
  queryKey: ["stats"],
  queryFn: dashboardStats,
  staleTime: 30 * 1000,
});

  if (isLoading) return <LoadingScreen />;

  if (isError) {
  return (
    <div className="p-10 text-center text-red-600">
      <h2 className="text-2xl font-bold">Failed to load dashboard</h2>
      <p>{error?.message}</p>
    </div>
  );
}
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-white to-indigo-50 font-sans relative overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-indigo-200/30 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-200/30 blur-3xl rounded-full"></div>

      <main className="max-w-7xl mx-auto px-4 py-10 relative z-10">

        {/* PAGE TITLE */}
        <div className="mb-10">

          <div className="inline-block px-5 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-bold tracking-wide mb-5">

            DASHBOARD OVERVIEW

          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-3">

            Welcome
          </h1>

          <p className="text-slate-600 text-lg">
            Track your auctions, bids, and marketplace activity in real-time.
          </p>

        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">

          {/* TOTAL AUCTIONS */}
          <div className="group bg-white/80 backdrop-blur-xl border border-white/40 rounded-[2rem] p-6 shadow-[0_10px_40px_rgba(79,70,229,0.10)] hover:shadow-[0_20px_60px_rgba(79,70,229,0.18)] hover:-translate-y-2 transition-all duration-500">

            <div className="flex items-center justify-between mb-5">

              <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-700 shadow-md group-hover:scale-110 transition-transform duration-300">

                <FaGavel className="text-2xl" />

              </div>

            </div>

            <h3 className="text-slate-500 text-sm font-semibold tracking-wide uppercase">

              Total Auctions

            </h3>

            <p className="text-4xl font-extrabold text-slate-900 mt-3">

              {data.totalAuctions}

            </p>

          </div>

          {/* ACTIVE AUCTIONS */}
          <div className="group bg-white/80 backdrop-blur-xl border border-white/40 rounded-[2rem] p-6 shadow-[0_10px_40px_rgba(79,70,229,0.10)] hover:shadow-[0_20px_60px_rgba(16,185,129,0.18)] hover:-translate-y-2 transition-all duration-500">

            <div className="flex items-center justify-between mb-5">

              <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700 shadow-md group-hover:scale-110 transition-transform duration-300">

                <FaFire className="text-2xl" />

              </div>

            </div>

            <h3 className="text-slate-500 text-sm font-semibold tracking-wide uppercase">

              Active Auctions

            </h3>

            <p className="text-4xl font-extrabold text-emerald-600 mt-3">

              {data.activeAuctions}

            </p>

          </div>

          {/* MY AUCTIONS */}
          <div className="group bg-white/80 backdrop-blur-xl border border-white/40 rounded-[2rem] p-6 shadow-[0_10px_40px_rgba(79,70,229,0.10)] hover:shadow-[0_20px_60px_rgba(59,130,246,0.18)] hover:-translate-y-2 transition-all duration-500">

            <div className="flex items-center justify-between mb-5">

              <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-700 shadow-md group-hover:scale-110 transition-transform duration-300">

                <FaChartLine className="text-2xl" />

              </div>

            </div>

            <h3 className="text-slate-500 text-sm font-semibold tracking-wide uppercase">

              My Auctions

            </h3>

            <p className="text-4xl font-extrabold text-blue-600 mt-3">

              {data.userAuctionCount}

            </p>

          </div>

          {/* MY BIDS */}
          <div className="group bg-white/80 backdrop-blur-xl border border-white/40 rounded-[2rem] p-6 shadow-[0_10px_40px_rgba(79,70,229,0.10)] hover:shadow-[0_20px_60px_rgba(245,158,11,0.18)] hover:-translate-y-2 transition-all duration-500">

            <div className="flex items-center justify-between mb-5">

              <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-700 shadow-md group-hover:scale-110 transition-transform duration-300">

                <FaCoins className="text-2xl" />

              </div>

            </div>

            <h3 className="text-slate-500 text-sm font-semibold tracking-wide uppercase">

              My Bids

            </h3>

            <p className="text-4xl font-extrabold text-amber-600 mt-3">

              {data.userBidsCount}

            </p>

          </div>

        </div>

        {/* ALL AUCTIONS */}
        <div className="mb-16">

          <div className="flex justify-between items-center mb-8 flex-wrap gap-4">

            <div>

              <div className="inline-block px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold mb-3">

                LIVE MARKETPLACE

              </div>

              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">

                All Auctions

              </h2>

            </div>

            <Link
              to="/auction"
              className="group flex items-center gap-2 text-indigo-700 font-bold hover:text-indigo-900 transition-all duration-300"
            >
              View More

              <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />

            </Link>

          </div>

          {data.latestAuctions.length === 0 ? (
            <div className="text-center py-16 bg-white/70 backdrop-blur-xl border border-white/40 rounded-[2rem] shadow-lg">

              <p className="text-slate-500 text-lg">
                No auctions available at the moment.
              </p>

            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-8">
              {data.latestAuctions.map((auction) => (
                <AuctionCard key={auction._id} auction={auction} />
              ))}
            </div>
          )}

        </div>

        {/* YOUR AUCTIONS */}
        <div>

          <div className="flex justify-between items-center mb-8 flex-wrap gap-4">

            <div>

              <div className="inline-block px-4 py-2 rounded-full bg-cyan-100 text-cyan-700 text-sm font-semibold mb-3">

                YOUR COLLECTION

              </div>

              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">

                Your Auctions

              </h2>

            </div>

            <Link
              to="/myauction"
              className="group flex items-center gap-2 text-cyan-700 font-bold hover:text-cyan-900 transition-all duration-300"
            >
              View More

              <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />

            </Link>

          </div>

          {data.latestUserAuctions.length === 0 ? (
            <div className="text-center py-16 bg-white/70 backdrop-blur-xl border border-white/40 rounded-[2rem] shadow-lg">

              <p className="text-slate-500 text-lg mb-6">
                You haven&apos;t created any auctions yet.
              </p>

              <Link to="/create">

                <button className="bg-gradient-to-r from-indigo-700 via-blue-600 to-cyan-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:scale-105 hover:shadow-[0_20px_50px_rgba(79,70,229,0.35)] transition-all duration-300">

                  Create Your First Auction

                </button>

              </Link>

            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-8">
              {data.latestUserAuctions.map((auction) => (
                <AuctionCard key={auction._id} auction={auction} />
              ))}
            </div>
          )}

        </div>

      </main>
    </div>
  );
};

export default Dashboard;