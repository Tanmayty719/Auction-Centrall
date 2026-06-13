import { useState, useEffect } from "react";
import AuctionCard from "../components/AuctionCard";
import { useQuery } from "@tanstack/react-query";
import { getAuctions } from "../api/auction";
import LoadingScreen from "../components/LoadingScreen";
import { socket } from "../socket";

export const AuctionList = () => {

  /* =========================================================
     STATE MANAGEMENT
  ========================================================= */

  const [filter, setFilter] = useState("all");

  // Live updates
  const [liveUpdates, setLiveUpdates] = useState({});



  /* =========================================================
     FETCH AUCTIONS
  ========================================================= */

  const {
    data,
    isLoading,
  } = useQuery({

    queryKey: ["allAuction"],

    queryFn: getAuctions,

    staleTime: 30 * 1000,

  });



  /* =========================================================
     SOCKET.IO CONNECTION
  ========================================================= */

  useEffect(() => {

    socket.on("connect", () => {

      console.log("✅ Connected to Socket.IO server");

    });

    // JOIN ROOMS
    if (data?.length > 0) {

      data.forEach((auction) => {

        socket.emit("joinAuction", auction._id);

        console.log(
          `📌 Joined auction room: ${auction._id}`
        );

      });

    }

    // LIVE BIDS
    socket.on("bidUpdated", (updatedBidData) => {

      console.log(
        "🔥 Live bid update:",
        updatedBidData
      );

      setLiveUpdates((prev) => ({

        ...prev,

        [updatedBidData.auctionId]: {

          amount: updatedBidData.amount,

          bidder: updatedBidData.bidder,

        },

      }));

    });

    // CLEANUP
    return () => {

      socket.off("connect");

      socket.off("bidUpdated");

    };

  }, [data]);



  /* =========================================================
     LOADING
  ========================================================= */

  if (isLoading) return <LoadingScreen />;



  /* =========================================================
     CATEGORIES
  ========================================================= */

  const categories = [

    "all",

    ...new Set(
      data?.map((auction) => auction.itemCategory)
    ),

  ];



  /* =========================================================
     FILTERED AUCTIONS
  ========================================================= */

  const filteredAuctions =

    filter === "all"

      ? data

      : data?.filter(
          (auction) =>
            auction.itemCategory === filter
        );



  /* =========================================================
     UI
  ========================================================= */

  return (

    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-white to-indigo-50 overflow-hidden relative font-sans">

      {/* BACKGROUND GLOW */}
      <div className="absolute -top-32 -left-32 w-[420px] h-[420px] bg-indigo-200/40 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[420px] h-[420px] bg-cyan-200/40 blur-3xl rounded-full"></div>

      <main className="max-w-7xl mx-auto px-4 py-10 relative z-10">

        {/* =====================================================
            PAGE HEADER
        ===================================================== */}

        <div className="text-center mb-12">

          <div className="inline-block px-5 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-bold tracking-wide mb-5">

            LIVE MARKETPLACE

          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">

            Explore Auctions

          </h1>

          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">

            Discover rare collectibles, antiques, art pieces,
            and place live bids in real-time.

          </p>

        </div>



        {/* =====================================================
            FILTER SECTION
        ===================================================== */}

        <div className="mb-10">

          <div className="bg-white/80 backdrop-blur-xl border border-white/40 rounded-[2rem] shadow-[0_20px_60px_rgba(79,70,229,0.10)] p-6">

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

              <div>

                <h2 className="text-2xl font-extrabold text-slate-900 mb-2">

                  Filter by Category

                </h2>

                <p className="text-slate-500">

                  Browse auctions based on categories.

                </p>

              </div>

              <div className="flex flex-wrap gap-3">

                {categories.map((category) => (

                  <button
                    key={category}
                    onClick={() => setFilter(category)}
                    className={`px-5 py-3 rounded-2xl text-sm font-bold transition-all duration-300 hover:scale-105 ${
                      filter === category
                        ? "bg-gradient-to-r from-indigo-700 via-blue-600 to-cyan-500 text-white shadow-xl"
                        : "bg-white border border-slate-200 text-slate-700 hover:bg-indigo-50 hover:border-indigo-300 shadow-sm"
                    }`}
                  >

                    {category.charAt(0).toUpperCase() +
                      category.slice(1)}

                  </button>

                ))}

              </div>

            </div>

          </div>

        </div>



        {/* =====================================================
            RESULTS HEADER
        ===================================================== */}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

          <div>

            <h2 className="text-3xl font-extrabold text-slate-900">

              {filter === "all"
                ? "All Auctions"
                : `${filter} Auctions`}

            </h2>

            <p className="text-slate-500 mt-2">

              Showing{" "}
              <span className="font-bold text-indigo-700">

                {filteredAuctions?.length || 0}

              </span>{" "}
              auctions

            </p>

          </div>

          <div className="bg-white/80 backdrop-blur-xl border border-white/40 rounded-2xl px-5 py-3 shadow-md">

            <span className="text-slate-600 font-medium">

              Live Updates Enabled ⚡

            </span>

          </div>

        </div>



        {/* =====================================================
            EMPTY STATE
        ===================================================== */}

        {filteredAuctions?.length === 0 ? (

          <div className="bg-white/80 backdrop-blur-xl border border-white/40 rounded-[2rem] shadow-[0_20px_60px_rgba(79,70,229,0.10)] p-16 text-center">

            <div className="w-24 h-24 mx-auto rounded-full bg-indigo-100 flex items-center justify-center mb-6">

              <span className="text-5xl">🔍</span>

            </div>

            <h3 className="text-3xl font-extrabold text-slate-900 mb-4">

              No Auctions Found

            </h3>

            <p className="text-slate-500 text-lg">

              There are no auctions available in this category right now.

            </p>

          </div>

        ) : (

          /* ===================================================
             AUCTION GRID
          =================================================== */

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 place-items-center gap-8">

            {filteredAuctions?.map((auction) => (

              <div
                key={auction._id}
                className="w-full hover:-translate-y-2 transition-all duration-500"
              >

                {/* LIVE BID BADGE */}
                {liveUpdates[auction._id] && (

                  <div className="mb-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white px-4 py-2 rounded-2xl shadow-lg animate-pulse">

                    <p className="text-sm font-bold">

                      🔥 New Bid ₹
                      {liveUpdates[auction._id]?.amount}

                    </p>

                    <p className="text-xs opacity-90">

                      by{" "}
                      {liveUpdates[auction._id]?.bidder}

                    </p>

                  </div>

                )}

                <AuctionCard
                  auction={{

                    ...auction,

                    currentPrice:
                      liveUpdates[auction._id]?.amount ||

                      auction.currentPrice,

                  }}
                />

              </div>

            ))}

          </div>

        )}

      </main>

    </div>

  );
};