import { useState, useEffect } from "react";
import AuctionCard from "../components/AuctionCard";
import { useQuery } from "@tanstack/react-query";
import { getMyAuctions } from "../api/auction";
import LoadingScreen from "../components/LoadingScreen";
import { socket } from "../socket";

export const MyAuction = () => {

  const [filter, setFilter] = useState("all");

  // SOCKET CONNECTION
  useEffect(() => {

    socket.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });

    socket.on("bidUpdated", (data) => {
      console.log("Bid updated:", data);
    });

    return () => {
      socket.off("connect");
      socket.off("bidUpdated");
    };

  }, []);

  // FETCH AUCTIONS
  const { data, isLoading } = useQuery({
    queryKey: ["myauctions"],
    queryFn: getMyAuctions,
    staleTime: 30 * 1000,
  });

  if (isLoading) return <LoadingScreen />;

  // CATEGORY FILTERS
  const categories = [
    "all",
    ...new Set(data?.map((auction) => auction.itemCategory)),
  ];

  // FILTERED AUCTIONS
  const filteredAuctions =
    filter === "all"
      ? data
      : data?.filter(
          (auction) => auction.itemCategory === filter
        );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-white to-indigo-50 relative overflow-hidden font-sans">

      {/* BACKGROUND GLOW */}
      <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-indigo-200/40 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-200/40 blur-3xl rounded-full"></div>

      <main className="max-w-7xl mx-auto px-4 py-10 relative z-10">

        {/* HEADER */}
        <div className="mb-10 text-center">

          <div className="inline-block px-5 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-bold tracking-wide mb-5">

            MANAGE AUCTIONS

          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">

            My Auctions

          </h1>

          <p className="text-slate-600 text-lg max-w-2xl mx-auto">

            View, manage, and monitor all your live and completed auctions.

          </p>

        </div>

        {/* FILTER SECTION */}
        <div className="mb-10 bg-white/80 backdrop-blur-xl border border-white/40 rounded-[2rem] shadow-[0_20px_60px_rgba(79,70,229,0.12)] p-6">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

            <div>

              <h2 className="text-2xl font-extrabold text-slate-900 mb-2">

                Filter Auctions

              </h2>

              <p className="text-slate-500">

                Select a category to quickly find your listings.

              </p>

            </div>

            {/* FILTER BUTTONS */}
            <div className="flex flex-wrap gap-3">

              {categories.map((category) => (

                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-5 py-3 rounded-2xl text-sm font-bold tracking-wide transition-all duration-300 hover:scale-105 ${
                    filter === category
                      ? "bg-gradient-to-r from-indigo-700 via-blue-600 to-cyan-500 text-white shadow-lg"
                      : "bg-white text-slate-700 border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 shadow-sm"
                  }`}
                >
                  {category.charAt(0).toUpperCase() +
                    category.slice(1)}

                </button>

              ))}

            </div>

          </div>

        </div>

        {/* RESULTS */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div>

            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">

              {filter === "all"
                ? "All My Auctions"
                : `${filter} Auctions`}

            </h2>

            <p className="text-slate-500 mt-2">

              Showing{" "}
              <span className="font-bold text-indigo-700">
                {filteredAuctions?.length || 0}
              </span>{" "}
              auction listings

            </p>

          </div>

          {/* LIVE STATUS */}
          <div className="bg-white/80 backdrop-blur-md border border-white/40 px-5 py-4 rounded-2xl shadow-md">

            <div className="flex items-center gap-3">

              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>

              <span className="text-slate-700 font-semibold">
                Live updates connected
              </span>

            </div>

          </div>

        </div>

        {/* EMPTY STATE */}
        {filteredAuctions?.length === 0 ? (

          <div className="bg-white/80 backdrop-blur-xl border border-white/40 rounded-[2rem] shadow-lg p-14 text-center">

            <div className="w-24 h-24 mx-auto rounded-full bg-indigo-100 flex items-center justify-center mb-6">

              <span className="text-4xl">📦</span>

            </div>

            <h3 className="text-3xl font-extrabold text-slate-900 mb-4">

              No Auctions Found

            </h3>

            <p className="text-slate-500 text-lg max-w-md mx-auto">

              There are no auctions available in this category right now.

            </p>

          </div>

        ) : (

          /* AUCTION GRID */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 place-items-center gap-8">

            {filteredAuctions?.map((auction) => (

              <div
                key={auction._id}
                className="hover:scale-[1.02] transition-all duration-500"
              >

                <AuctionCard auction={auction} />

              </div>

            ))}

          </div>

        )}

      </main>

    </div>
  );
};