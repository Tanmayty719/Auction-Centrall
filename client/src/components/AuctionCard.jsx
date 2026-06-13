import { Link } from "react-router";
import { useState, useEffect } from "react";

export default function AuctionCard({ auction }) {

  /* =========================================
     LIVE COUNTDOWN TIMER
  ========================================= */

  const calculateTimeLeft = () => {

    const difference =
      new Date(auction.itemEndDate) - new Date();

    return difference;

  };

  const [timeLeft, setTimeLeft] = useState(
    calculateTimeLeft()
  );

  useEffect(() => {

    const timer = setInterval(() => {

      setTimeLeft(calculateTimeLeft());

    }, 1000);

    return () => clearInterval(timer);

  }, [auction.itemEndDate]);



  /* =========================================
     TIME CONVERSION
  ========================================= */

  const days = Math.floor(
    timeLeft / (1000 * 60 * 60 * 24)
  );

  const hours = Math.floor(
    (timeLeft / (1000 * 60 * 60)) % 24
  );

  const minutes = Math.floor(
    (timeLeft / (1000 * 60)) % 60
  );

  const seconds = Math.floor(
    (timeLeft / 1000) % 60
  );



  return (

    <div className="bg-white border border-slate-200 rounded-3xl shadow-md hover:shadow-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 font-sans max-w-sm w-full">

      {/* =========================================
          IMAGE SECTION
      ========================================= */}

      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100">

        <img
          src={auction.itemPhoto || "https://picsum.photos/300"}
          alt={auction.itemName}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
        />

        {/* CATEGORY */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-indigo-700 px-3 py-1 rounded-full text-xs font-bold shadow-md border border-indigo-100">

          {auction.itemCategory}

        </div>

      </div>



      {/* =========================================
          CONTENT SECTION
      ========================================= */}

      <div className="p-5">

        {/* TITLE */}
        <h3 className="font-extrabold text-xl mb-2 text-slate-900 tracking-tight line-clamp-1">

          {auction.itemName}

        </h3>

        {/* DESCRIPTION */}
        <p className="text-slate-500 text-sm mb-5 leading-relaxed line-clamp-2">

          {auction.itemDescription}

        </p>



        {/* =========================================
            AUCTION INFO
        ========================================= */}

        <div className="space-y-3 mb-5">

          {/* CURRENT PRICE */}
          <div className="flex justify-between items-center bg-emerald-50 px-4 py-3 rounded-2xl border border-emerald-100">

            <span className="text-sm font-semibold text-slate-600">

              Current Price

            </span>

            <span className="font-extrabold text-lg text-emerald-600">

              ₹{auction.currentPrice || auction.startingPrice}

            </span>

          </div>



          {/* TOTAL BIDS */}
          <div className="flex justify-between items-center bg-indigo-50 px-4 py-3 rounded-2xl border border-indigo-100">

            <span className="text-sm font-semibold text-slate-600">

              Total Bids

            </span>

            <span className="text-sm font-bold text-indigo-700">

              {auction.bidsCount}

            </span>

          </div>



          {/* TIMER */}
          <div className="flex justify-between items-center bg-red-50 px-4 py-3 rounded-2xl border border-red-100">

            <span className="text-sm font-semibold text-slate-600">

              Time Left

            </span>

            <span className="text-sm font-extrabold text-red-500">

              {timeLeft <= 0
                ? "Ended"
                : `${days}d ${hours}h ${minutes}m ${seconds}s`}

            </span>

          </div>

        </div>



        {/* =========================================
            FOOTER
        ========================================= */}

        <div className="border-t border-slate-200 pt-4">

          <div className="flex justify-between items-center mb-4 gap-3">

            {/* SELLER */}
            <div className="flex flex-col">

              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">

                Seller:  {auction?.sellerName || auction?.seller?.name}

              </span>

            </div>



            {/* HIGHEST BIDDER */}
            <div className="flex flex-col text-right">

              <span className="text-[10px] uppercase tracking-wider text-indigo-400 font-bold">

                Highest Bidder :   {auction?.highestBidder}
                 

              </span>

            </div>

          </div>



          {/* BUTTON */}
          <Link to={`/auction/${auction._id}`}>

            <button className="w-full bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 text-white py-3 px-4 rounded-2xl hover:scale-[1.02] hover:shadow-[0_15px_40px_rgba(79,70,229,0.35)] transition-all duration-300 text-sm font-bold tracking-wide">

              View Details

            </button>

          </Link>

        </div>

      </div>

    </div>

  );

}