import { useRef, useState, useEffect } from "react";
import { useParams } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { placeBid, viewAuction } from "../api/auction.js";
import { useSelector } from "react-redux";
import LoadingScreen from "../components/LoadingScreen.jsx";

export const ViewAuction = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();
  const inputRef = useRef();

  // LIVE TIME
  const [now, setNow] = useState(new Date());

  const { data, isLoading } = useQuery({
    queryKey: ["viewAuctions", id],
    queryFn: () => viewAuction(id),
    staleTime: 30 * 1000,
    placeholderData: () => undefined,
  });

  // LIVE COUNTDOWN
  useEffect(() => {
    if (!data?.itemEndDate) return;

    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, [data?.itemEndDate]);

  // PLACE BID
  const placeBidMutate = useMutation({
    mutationFn: ({ bidAmount, id }) =>
      placeBid({ bidAmount, id }),

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: ["viewAuctions"],
      });

      queryClient.invalidateQueries({
        queryKey: ["stats"],
      });

      queryClient.invalidateQueries({
        queryKey: ["allAuction"],
      });

      queryClient.invalidateQueries({
        queryKey: ["myauctions"],
      });

      if (inputRef.current) {
        inputRef.current.value = "";
      }

    },

    onError: (error) => {
      console.log("Error: ", error.message);
    },
  });

  if (isLoading) return <LoadingScreen />;

  const handleBidSubmit = (e) => {

  e.preventDefault();

  let bidAmount = Number(
    e.target.bidAmount.value.trim()
  );

  // Minimum next bid
  const minimumBid =
    Number(data.currentPrice) + 500;

  // Validate minimum bid
  if (bidAmount < minimumBid) {

    alert(
      `Minimum bid should be ₹${minimumBid}`
    );

    return;
  }

  // Validate multiples of ₹500
  if (bidAmount % 500 !== 0) {

    alert(
      "Bid amount must be in multiples of ₹500"
    );

    return;
  }

  placeBidMutate.mutate({
    bidAmount,
    id,
  });

};

  // TIMER
  const msLeft = Math.max(
    0,
    new Date(data.itemEndDate) - now
  );

  const daysLeft = Math.floor(
    msLeft / (1000 * 60 * 60 * 24)
  );

  const hoursLeft = Math.floor(
    (msLeft / (1000 * 60 * 60)) % 24
  );

  const minsLeft = Math.floor(
    (msLeft / (1000 * 60)) % 60
  );

  const secLeft = Math.floor(
    (msLeft / 1000) % 60
  );

  const isActive = msLeft > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-white to-indigo-50 overflow-hidden relative font-sans">

      {/* BACKGROUND GLOW */}
      <div className="absolute -top-32 -left-32 w-[420px] h-[420px] bg-indigo-200/40 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[420px] h-[420px] bg-cyan-200/40 blur-3xl rounded-full"></div>

      <main className="max-w-7xl mx-auto px-4 py-10 relative z-10">

        {/* HEADER */}
        <div className="mb-10 text-center">

          <div className="inline-block px-5 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-bold tracking-wide mb-5">

            LIVE AUCTION

          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">

            Auction Details

          </h1>

          <p className="text-slate-500 mt-4 text-lg">

            Place bids in real-time and compete with collectors worldwide.

          </p>

        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* IMAGE SECTION */}
          <div className="space-y-5">

            <div className="bg-white/80 backdrop-blur-xl border border-white/40 rounded-[2rem] shadow-[0_20px_60px_rgba(79,70,229,0.12)] overflow-hidden">

              <div className="aspect-square flex items-center justify-center overflow-hidden">

                <img
                  src={
                    data.itemPhoto ||
                    "https://picsum.photos/601"
                  }
                  alt={data.itemName}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />

              </div>

            </div>

          </div>

          {/* DETAILS */}
          <div className="space-y-6">

            {/* TITLE */}
            <div className="bg-white/80 backdrop-blur-xl border border-white/40 rounded-[2rem] shadow-[0_20px_60px_rgba(79,70,229,0.12)] p-8">

              <div className="flex flex-wrap items-center gap-3 mb-5">

                <span className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-bold">

                  {data.itemCategory}

                </span>

                <span
                  className={`px-4 py-2 rounded-full text-sm font-bold ${
                    isActive
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {isActive ? "LIVE" : "ENDED"}
                </span>

              </div>

              <h1 className="text-4xl font-extrabold text-slate-900 mb-5 leading-tight">

                {data.itemName}

              </h1>

              <p className="text-slate-600 leading-relaxed text-lg">

                {data.itemDescription}

              </p>

            </div>

            {/* PRICE CARD */}
            <div className="bg-white/80 backdrop-blur-xl border border-white/40 rounded-[2rem] shadow-[0_20px_60px_rgba(79,70,229,0.12)] p-8">

              <div className="grid grid-cols-2 gap-6 mb-8">

                <div className="bg-indigo-50 rounded-2xl p-5">

                  <p className="text-sm text-slate-500 font-medium mb-2">
                    Starting Price
                  </p>

                  <p className="text-2xl font-extrabold text-slate-900">
                    ₹{data.startingPrice}
                  </p>

                </div>

                <div className="bg-emerald-50 rounded-2xl p-5">

                  <p className="text-sm text-slate-500 font-medium mb-2">
                    Current Price
                  </p>

                  <p className="text-3xl font-extrabold text-emerald-600">
                    ₹{data.currentPrice}
                  </p>

                </div>

              </div>

              <div className="grid grid-cols-2 gap-6">

                <div className="bg-white border border-slate-200 rounded-2xl p-5">

                  <p className="text-sm text-slate-500 font-medium mb-2">
                    Total Bids
                  </p>

                  <p className="text-2xl font-extrabold text-slate-900">
                    {data.bids.length}
                  </p>

                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-5">

                  <p className="text-sm text-slate-500 font-medium mb-2">
                    Time Left
                  </p>

                  <p
                    className={`text-xl font-extrabold ${
                      isActive
                        ? "text-red-500"
                        : "text-slate-500"
                    }`}
                  >
                    {!isActive
                      ? "Auction Ended"
                      : `${daysLeft}d ${hoursLeft}h ${minsLeft}m ${secLeft}s`}
                  </p>

                </div>

              </div>

            </div>

            {/* BID FORM */}
{data.seller._id !== user.user._id &&
  isActive && (

  <div className="bg-white/80 backdrop-blur-xl border border-white/40 rounded-[2rem] shadow-[0_20px_60px_rgba(79,70,229,0.12)] p-8">

    <h3 className="text-2xl font-extrabold text-slate-900 mb-6">

      Place Your Bid

    </h3>

    <form
      onSubmit={handleBidSubmit}
      className="space-y-5"
    >

      <div>

        <label
          htmlFor="bidAmount"
          className="block text-sm font-bold text-slate-700 mb-3"
        >
          Bid Amount
        </label>

        <input
          type="number"
          name="bidAmount"
          id="bidAmount"
          ref={inputRef}

          // Minimum next bid
          min={Number(data.currentPrice) + 500}

          // Increase by ₹500 only
          step={500}

          className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all duration-300 shadow-sm hover:shadow-md"

          placeholder={`Minimum ₹${Number(data.currentPrice) + 500}`}

          required
        />

       

      </div>

      <button
        type="submit"
        disabled={placeBidMutate.isPending}
        className="w-full bg-gradient-to-r from-indigo-700 via-blue-600 to-cyan-500 text-white py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-[0_20px_50px_rgba(79,70,229,0.35)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {placeBidMutate.isPending
          ? "Placing Bid..."
          : "Place Bid"}

      </button>

    </form>

  </div>

)}

            {/* SELLER */}
            <div className="bg-white/80 backdrop-blur-xl border border-white/40 rounded-[2rem] shadow-[0_20px_60px_rgba(79,70,229,0.12)] p-8">

              <h3 className="text-2xl font-extrabold text-slate-900 mb-4">

                Seller Information

              </h3>

              <div className="flex items-center gap-4">

                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-lg">
  <img
    src={
      data?.seller?.avatar ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(
        data?.seller?.name || "User"
      )}`
    }
    alt={data?.seller?.name}
    className="w-full h-full object-cover"
  />
</div>

                <div>

                  <p className="text-lg font-bold text-slate-900">

                    {data.seller.name}

                  </p>

                  <p className="text-slate-500">
                    Trusted Auction Seller
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* BID HISTORY */}
        <div className="mt-14">

          <div className="flex items-center justify-between mb-8">

            <div>

              <h2 className="text-3xl font-extrabold text-slate-900">

                Bid History

              </h2>

              <p className="text-slate-500 mt-2">

                Latest bids placed on this auction

              </p>

            </div>

          </div>

          <div className="bg-white/80 backdrop-blur-xl border border-white/40 rounded-[2rem] shadow-[0_20px_60px_rgba(79,70,229,0.12)] overflow-hidden">

            {data.bids.length === 0 ? (

              <div className="p-16 text-center">

                <div className="w-24 h-24 mx-auto rounded-full bg-indigo-100 flex items-center justify-center mb-6">

                  <span className="text-4xl">💰</span>

                </div>

                <h3 className="text-2xl font-extrabold text-slate-900 mb-3">

                  No Bids Yet

                </h3>

                <p className="text-slate-500 text-lg">

                  Be the first one to place a bid on this item.

                </p>

              </div>

            ) : (

              <div className="divide-y divide-slate-200">

                {data.bids.map((bid, index) => (

                <div
  key={index}
  className="p-6 flex items-center hover:bg-slate-50 transition-colors duration-300"
>

  {/* Avatar */}
  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-lg flex-shrink-0">
    <img
      src={
        bid?.bidder?.avatar ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(
          bid?.bidder?.name || "User"
        )}`
      }
      alt={bid?.bidder?.name}
      className="w-full h-full object-cover"
    />
  </div>

  {/* Bidder Details */}
  <div className="ml-5">

    <p className="font-bold text-slate-900 text-xl">
      {bid.bidder?.name}
    </p>

    <p className="text-sm text-slate-500 mt-1">
      {new Date(bid.bidTime).toLocaleDateString()} at{" "}
      {new Date(bid.bidTime).toLocaleTimeString()}
    </p>

  </div>

  {/* Amount */}
  <div className="ml-auto bg-emerald-50 px-6 py-3 rounded-2xl shadow-sm">

    <p className="text-2xl font-extrabold text-emerald-600">
      ₹{bid.bidAmount}
    </p>

  </div>

</div>
                ))}

              </div>

            )}

          </div>

        </div>

      </main>
    </div>
  );
};