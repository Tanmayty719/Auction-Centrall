import { useState, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAuction } from "../api/auction.js";
import { useNavigate } from "react-router";

export const CreateAuction = () => {
  const fileInputRef = useRef();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    itemName: "",
    itemDescription: "",
    itemCategory: "",
    startingPrice: "",
    itemStartDate: "",
    itemEndDate: "",
    itemPhoto: "",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createAuction,

    onSuccess: (data) => {
      setFormData({
        itemName: "",
        itemDescription: "",
        itemCategory: "",
        startingPrice: "",
        itemStartDate: "",
        itemEndDate: "",
        itemPhoto: "",
      });

      setError("");

      queryClient.invalidateQueries({ queryKey: ["viewAuctions"] });
      queryClient.invalidateQueries({ queryKey: ["allAuction"] });
      queryClient.invalidateQueries({ queryKey: ["myauctions"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });

      navigate(`/auction/${data.newAuction._id}`);
    },

    onError: (error) =>
      setError(error?.response?.data?.message || "Something went wrong"),
  });

  const categories = [
    "Antiques",
    "Art",
    "Furniture",
    "Collectibles",
    "Jewelry",
    "Musical Instruments",
    "Toys",
    "Other",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const fileSizeMB = file.size / (1024 * 1024);

      if (!file.type.startsWith("image/")) {
        alert("Only image files are allowed.");
        return;
      }

      if (fileSizeMB > 5) {
        setError("File size must be less than 5 MB.");
        return;
      }

      setFormData((prev) => ({
        ...prev,
        itemPhoto: file,
      }));

      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.itemPhoto) {
      setError("Please upload an image.");
      return;
    }

    const start = new Date(formData.itemStartDate);
    const end = new Date(formData.itemEndDate);

    // End must be after start
    if (end <= start) {
      setError("Auction end time must be after start time.");
      return;
    }

    // Minimum 1 minute auction
    const differenceInMinutes = (end - start) / (1000 * 60);

    if (differenceInMinutes < 1) {
      setError("Auction duration must be at least 1 minute.");
      return;
    }

    mutate(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-white to-indigo-50 relative overflow-hidden font-sans">

      {/* BACKGROUND GLOW */}
      <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-indigo-200/40 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-200/40 blur-3xl rounded-full"></div>

      <main className="max-w-5xl mx-auto px-4 py-10 relative z-10">

        {/* HEADER */}
        <div className="text-center mb-10">

          <div className="inline-block px-5 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-bold tracking-wide mb-5">

            CREATE NEW AUCTION

          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">

            List Your Item

          </h1>

          <p className="text-slate-600 text-lg max-w-2xl mx-auto">

            Create a premium auction listing and connect with collectors worldwide.

          </p>

        </div>

        {/* CARD */}
        <div className="bg-white/80 backdrop-blur-xl border border-white/40 rounded-[2rem] shadow-[0_20px_60px_rgba(79,70,229,0.15)] overflow-hidden">

          <div className="p-6 md:p-10">

            <form onSubmit={handleSubmit} className="space-y-8">

              {/* ITEM NAME */}
              <div>

                <label
                  htmlFor="itemName"
                  className="block text-sm font-semibold text-slate-700 mb-3 tracking-wide"
                >
                  Item Name <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  id="itemName"
                  name="itemName"
                  value={formData.itemName}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-white/70 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all duration-300 shadow-sm hover:shadow-md"
                  placeholder="Enter item name"
                  required
                />

              </div>

              {/* DESCRIPTION */}
              <div>

                <label
                  htmlFor="itemDescription"
                  className="block text-sm font-semibold text-slate-700 mb-3 tracking-wide"
                >
                  Item Description <span className="text-red-500">*</span>
                </label>

                <textarea
                  id="itemDescription"
                  name="itemDescription"
                  value={formData.itemDescription}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-white/70 text-slate-800 placeholder:text-slate-400 resize-none focus:outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all duration-300 shadow-sm hover:shadow-md"
                  placeholder="Describe your item, condition, history, and features..."
                  required
                />

              </div>

              {/* CATEGORY + PRICE */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* CATEGORY */}
                <div>

                  <label
                    htmlFor="itemCategory"
                    className="block text-sm font-semibold text-slate-700 mb-3 tracking-wide"
                  >
                    Category <span className="text-red-500">*</span>
                  </label>

                  <select
                    id="itemCategory"
                    name="itemCategory"
                    value={formData.itemCategory}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-white/70 text-slate-800 focus:outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all duration-300 shadow-sm hover:shadow-md"
                    required
                  >
                    <option value="">Select Category</option>

                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}

                  </select>

                </div>

                {/* PRICE */}
                <div>

                  <label
                    htmlFor="startingPrice"
                    className="block text-sm font-semibold text-slate-700 mb-3 tracking-wide"
                  >
                    Starting Price (₹) <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="number"
                    id="startingPrice"
                    name="startingPrice"
                    value={formData.startingPrice}
                    onChange={handleInputChange}
                    min="10000"
                    step="5000"
                    className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-white/70 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all duration-300 shadow-sm hover:shadow-md"
                    placeholder="₹10000"
                    required
                  />

                </div>

              </div>

              {/* DATES */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* START */}
                <div>

                  <label
                    htmlFor="itemStartDate"
                    className="block text-sm font-semibold text-slate-700 mb-3 tracking-wide"
                  >
                    Start Date & Time <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="datetime-local"
                    id="itemStartDate"
                    name="itemStartDate"
                    value={formData.itemStartDate}
                    onChange={handleInputChange}
                    min={new Date().toISOString().slice(0, 16)}
                    className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-white/70 text-slate-800 focus:outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all duration-300 shadow-sm hover:shadow-md"
                    required
                  />

                </div>

                {/* END */}
                <div>

                  <label
                    htmlFor="itemEndDate"
                    className="block text-sm font-semibold text-slate-700 mb-3 tracking-wide"
                  >
                    End Date & Time <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="datetime-local"
                    id="itemEndDate"
                    name="itemEndDate"
                    value={formData.itemEndDate}
                    onChange={handleInputChange}
                    min={formData.itemStartDate}
                    className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-white/70 text-slate-800 focus:outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all duration-300 shadow-sm hover:shadow-md"
                    required
                  />

                </div>

              </div>

              {/* PHOTO */}
              <div>

                <label
                  htmlFor="itemPhoto"
                  className="block text-sm font-semibold text-slate-700 mb-3 tracking-wide"
                >
                  Item Photo <span className="text-red-500">*</span>
                </label>

                <div className="border-2 border-dashed border-indigo-200 rounded-[2rem] p-6 bg-gradient-to-br from-indigo-50 to-cyan-50 hover:border-indigo-400 transition-all duration-300">

                  <input
                    type="file"
                    id="itemPhoto"
                    name="itemPhoto"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    accept="image/*"
                    className="w-full text-slate-700 file:mr-4 file:rounded-xl file:border-0 file:bg-gradient-to-r file:from-indigo-600 file:to-blue-600 file:px-5 file:py-3 file:text-white file:font-semibold hover:file:scale-105 file:transition-all file:duration-300 cursor-pointer"
                  />

                  {formData.itemPhoto && (
                    <div className="mt-6">

                      <p className="text-sm font-semibold text-slate-700 mb-3">
                        Image Preview
                      </p>

                      <img
                        src={URL.createObjectURL(formData.itemPhoto)}
                        alt="Preview"
                        className="w-40 h-40 object-cover rounded-2xl border border-slate-200 shadow-lg hover:scale-105 transition-all duration-300"
                      />

                      <button
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            itemPhoto: "",
                          }));

                          fileInputRef.current.value = "";
                        }}
                        className="mt-4 text-red-500 hover:text-red-700 font-semibold transition-colors duration-300"
                      >
                        Remove Image
                      </button>

                    </div>
                  )}

                </div>

              </div>

              {/* ERROR */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-2xl text-sm font-medium animate-pulse">

                  {error}

                </div>
              )}

              {/* BUTTON */}
              <div className="pt-4 border-t border-slate-200">

                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full bg-gradient-to-r from-indigo-700 via-blue-600 to-cyan-500 text-white py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-[0_20px_50px_rgba(79,70,229,0.35)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isPending ? "Creating Auction..." : "Create Auction"}
                </button>

              </div>

            </form>

          </div>

        </div>

        {/* HELP SECTION */}
        <HelpSection />

      </main>
    </div>
  );
};

export const HelpSection = () => {
  return (
    <div className="mt-8 bg-white/80 backdrop-blur-xl border border-indigo-100 rounded-[2rem] p-8 shadow-lg">

      <div className="mb-5">

        <div className="inline-block px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-bold mb-4">

          AUCTION TIPS

        </div>

        <h3 className="text-2xl font-extrabold text-slate-900 mb-2">

          Tips for a Successful Auction

        </h3>

        <p className="text-slate-600">

          Increase visibility and attract more bidders with these simple tips.

        </p>

      </div>

      <ul className="space-y-4 text-slate-700">

        <li className="flex items-start bg-indigo-50 rounded-2xl p-4 hover:scale-[1.01] transition-all duration-300">
          <span className="text-indigo-600 mr-3 font-bold">•</span>
          Use clear, high-quality photos from multiple angles.
        </li>

        <li className="flex items-start bg-cyan-50 rounded-2xl p-4 hover:scale-[1.01] transition-all duration-300">
          <span className="text-cyan-600 mr-3 font-bold">•</span>
          Write detailed descriptions including flaws and dimensions.
        </li>

        <li className="flex items-start bg-emerald-50 rounded-2xl p-4 hover:scale-[1.01] transition-all duration-300">
          <span className="text-emerald-600 mr-3 font-bold">•</span>
          Set a competitive starting price to encourage bidding.
        </li>

        <li className="flex items-start bg-orange-50 rounded-2xl p-4 hover:scale-[1.01] transition-all duration-300">
          <span className="text-orange-600 mr-3 font-bold">•</span>
          Auctions between 3–7 days usually perform best.
        </li>

        <li className="flex items-start bg-pink-50 rounded-2xl p-4 hover:scale-[1.01] transition-all duration-300">
          <span className="text-pink-600 mr-3 font-bold">•</span>
          Select the correct category to improve discoverability.
        </li>

      </ul>

    </div>
  );
};