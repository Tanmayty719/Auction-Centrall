import { useState, useRef, useMemo } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { changePassword, uploadAvatar } from "../api/user";
import {
  CiMail,
  CiUser,
  CiLock,
  CiCamera,
} from "react-icons/ci";

import { dashboardStats } from "../api/auction";

import {
  IoEyeOutline,
  IoEyeOffOutline,
  IoCheckmarkCircle,
} from "react-icons/io5";

import { useSelector } from "react-redux";

export default function Profile() {

  const { user } = useSelector((state) => state.auth);

  const fileInputRef = useRef(null);

  const [isError, setIsError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  /* =========================================
     PASSWORD VISIBILITY
  ========================================= */

  const [showCurrentPassword, setShowCurrentPassword] =
    useState(false);

  const [showNewPassword, setShowNewPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  /* =========================================
     STATS
  ========================================= */

  const { data: statsData } = useQuery({
    queryKey: ["stats"],
    queryFn: dashboardStats,
  });

  /* =========================================
     PROFILE IMAGE
  ========================================= */

  const [profileImage, setProfileImage] = useState(
    user?.user?.avatar || ""
  );

  /* =========================================
     EDITABLE USERNAME + BIO
  ========================================= */

  const [editableName, setEditableName] =
  useState(user?.user?.name || "");

const [bio, setBio] = useState(
  user?.user?.bio || ""
);

const [isEditingName, setIsEditingName] =
  useState(false);

  /* =========================================
     PASSWORD FORM
  ========================================= */

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  /* =========================================
     PASSWORD STRENGTH
  ========================================= */

  const passwordStrength = useMemo(() => {

    const password = formData.newPassword;

    if (!password) return "";

    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 1) return "Weak";
    if (score <= 3) return "Medium";

    return "Strong";

  }, [formData.newPassword]);

  /* =========================================
     PROFILE COMPLETION
  ========================================= */

  const profileCompletion = useMemo(() => {

    let score = 0;

    if (user?.user?.avatar) score += 20;
    if (user?.user?.email) score += 20;
    
    if (editableName.length > 2) score += 20;
    if (formData.newPassword.length >= 8) score += 20;

    return score;

  }, [
    user,
    bio,
    editableName,
    formData.newPassword,
  ]);

  /* =========================================
     EARNINGS ANALYTICS
  ========================================= */



const totalEarnings =
  statsData?.totalUserEarnings || 0;

  const highestSale =
    Math.max(
      ...(statsData?.latestUserAuctions?.map(
        (auction) =>
          Number(auction.currentPrice || 0)
      ) || [0])
    );

  /* =========================================
     WINNER BADGE
  ========================================= */

  const winnerBadge =
    statsData?.userAuctionWinCount >= 1;

  /* =========================================
     PASSWORD CHANGE
  ========================================= */

  const { mutate, isPending } = useMutation({

    mutationFn: () => changePassword(formData),

    onSuccess: () => {

      setSuccessMessage(
        "Password Changed Successfully"
      );

      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);

      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

    },

    onError: (error) => {

      setIsError(
        error?.response?.data?.error ||
        "Something went wrong"
      );

      setTimeout(() => {
        setIsError("");
      }, 5000);

    },

  });

  /* =========================================
     UPLOAD AVATAR
  ========================================= */

  const uploadAvatarMutation = useMutation({

    mutationFn: uploadAvatar,

    onSuccess: (data) => {

      setProfileImage(data.avatar);

      const updatedUser = {

        ...user,

        user: {

          ...user.user,

          avatar: data.avatar,

        },

      };

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );

      setSuccessMessage(
        "Profile photo updated successfully"
      );

      setTimeout(() => {
        setSuccessMessage("");
      }, 4000);

    },

    onError: (error) => {

      setIsError(
        error?.response?.data?.message ||
        "Failed to upload image"
      );

      setTimeout(() => {
        setIsError("");
      }, 4000);

    },

  });

  /* =========================================
     INPUT CHANGE
  ========================================= */

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

  };

  /* =========================================
     PROFILE PHOTO CHANGE
  ========================================= */

  const handleProfileImage = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {

      setIsError(
        "Only image files are allowed."
      );

      return;

    }

    const fileSizeMB =
      file.size / (1024 * 1024);

    if (fileSizeMB > 5) {

      setIsError(
        "Image size must be less than 5MB."
      );

      return;

    }

    const imagePreview =
      URL.createObjectURL(file);

    setProfileImage(imagePreview);

    const form = new FormData();

    form.append("avatar", file);

    uploadAvatarMutation.mutate(form);

  };

  /* =========================================
     SUBMIT
  ========================================= */

  const handleSubmit = (e) => {

    e.preventDefault();

    const {
      currentPassword,
      newPassword,
      confirmPassword,
    } = formData;

    if (
      !currentPassword ||
      !newPassword ||
      !confirmPassword
    ) {

      setIsError(
        "Please enter all fields."
      );

      setTimeout(() => {
        setIsError("");
      }, 5000);

      return;

    }

    if (newPassword !== confirmPassword) {

      setIsError(
        "Passwords do not match."
      );

      setTimeout(() => {
        setIsError("");
      }, 5000);

      return;

    }

    mutate(formData);

  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-white to-indigo-50 font-sans py-10 px-4 relative overflow-hidden">

      {/* GLOW */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-300/20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-300/20 blur-3xl rounded-full"></div>

      <div className="max-w-6xl mx-auto relative z-10">

        {/* HEADER */}
        <div className="text-center mb-10">

          <div className="inline-block px-5 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold mb-5">

            PROFILE SETTINGS

          </div>

          <h1 className="text-5xl font-extrabold text-[#0b132b]">

            Manage Your Account

          </h1>

          <p className="text-slate-500 mt-3 text-lg">

            Update your information and security settings

          </p>

        </div>

        {/* SUCCESS */}
        {successMessage && (

          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-5 py-4 rounded-2xl">

            {successMessage}

          </div>

        )}

        {/* ERROR */}
        {isError && (

          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-2xl">

            {isError}

          </div>

        )}

        {/* PROFILE CARD */}
        <div className="bg-white/80 backdrop-blur-xl border border-white/40 rounded-[2rem] shadow-[0_20px_60px_rgba(79,70,229,0.15)] overflow-hidden">

          {/* TOP SECTION */}
          <div className="px-8 py-10 border-b border-slate-200">

            <div className="flex flex-col lg:flex-row items-center justify-between gap-10">

              {/* LEFT */}
              <div className="flex flex-col md:flex-row items-center gap-6">

                {/* IMAGE */}
                <div className="relative group">

                  <img
                    src={
                      profileImage ||
                      "https://ui-avatars.com/api/?name=User"
                    }
                    alt="Profile"
                    className="w-36 h-36 rounded-full object-cover border-4 border-white shadow-2xl transition-all duration-500 group-hover:scale-105"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      fileInputRef.current.click()
                    }
                    className="absolute bottom-2 right-2 w-12 h-12 rounded-full bg-white shadow-lg border border-slate-200 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all duration-300"
                  >

                    <CiCamera className="text-2xl" />

                  </button>

                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleProfileImage}
                    className="hidden"
                  />

                </div>

                {/* USER INFO */}
                <div className="text-center md:text-left">
<div className="flex items-center gap-3 flex-wrap justify-center md:justify-start">

  {isEditingName ? (

    <input
      type="text"
      value={editableName}
      onChange={(e) =>
        setEditableName(e.target.value)
      }
      onBlur={() =>
        setIsEditingName(false)
      }
      autoFocus
      maxLength={25}
      className="text-4xl font-bold text-[#0b132b] bg-white border-2 border-indigo-500 rounded-xl px-3 py-1 outline-none transition-all duration-300"
    />

  ) : (

    <h2
      onClick={() =>
        setIsEditingName(true)
      }
      className="text-4xl font-bold text-[#0b132b] cursor-pointer hover:text-indigo-600 transition-all duration-300"
    >

      {editableName}

    </h2>

  )}

  <IoCheckmarkCircle className="text-blue-500 text-2xl" />
<br></br>
  {winnerBadge && (

    <span className="px-4 py-2 rounded-full bg-yellow-100 text-yellow-700 text-sm font-bold shadow-sm">

      Auction Winner 🏆 

    </span>

  )}

</div>

                  <p className="text-slate-500 mt-2 text-lg">

                    {user.user.email}

                  </p>

                 

                </div> 

              </div>

              {/* PROFILE COMPLETION */}
              

            </div>

          </div>

          {/* STATS */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-8 border-b border-slate-200">

            <div className="bg-indigo-50 rounded-3xl p-6 text-center">

              <p className="text-slate-500 text-sm">

                Auctions Created

              </p>

              <h3 className="text-4xl font-bold text-indigo-700 mt-2">

                {statsData?.userAuctionCount || 0}

              </h3>

            </div>

            <div className="bg-cyan-50 rounded-3xl p-6 text-center">

              <p className="text-slate-500 text-sm">

                Total Bids

              </p>

              <h3 className="text-4xl font-bold text-cyan-700 mt-2">

                {statsData?.userBidsCount || 0}

              </h3>

            </div>

            <div className="bg-emerald-50 rounded-3xl p-6 text-center">

              <p className="text-slate-500 text-sm">

                Auctions Won

              </p>

              <h3 className="text-4xl font-bold text-emerald-700 mt-2">

                {statsData?.userAuctionWinCount || 0}

              </h3>

            </div>

            <div className="bg-amber-50 rounded-3xl p-6 text-center">

              <p className="text-slate-500 text-sm">

                Active Auctions

              </p>

              <h3 className="text-4xl font-bold text-amber-700 mt-2">

                {statsData?.activeAuctions || 0}

              </h3>

            </div>

          </div>

          {/* EARNINGS ANALYTICS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-8 pb-8">

            {/* TOTAL EARNINGS */}
            <div className="bg-gradient-to-r from-emerald-500 to-green-500 rounded-3xl p-8 text-white shadow-2xl">

              <p className="text-sm uppercase tracking-wider opacity-80">

                Total Earnings

              </p>

              <h2 className="text-5xl font-extrabold mt-4">

                ₹{totalEarnings.toLocaleString()}

              </h2>

              <p className="mt-4 text-white/80">

                Revenue generated from your auctions

              </p>

            </div>

            {/* HIGHEST SALE */}
            <div className="bg-gradient-to-r from-indigo-600 to-cyan-500 rounded-3xl p-8 text-white shadow-2xl">

              <p className="text-sm uppercase tracking-wider opacity-80">

                Highest Sale

              </p>

              <h2 className="text-5xl font-extrabold mt-4">

                ₹{highestSale.toLocaleString()}

              </h2>

              <p className="mt-4 text-white/80">

                Highest auction value achieved

              </p>

            </div>

          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="divide-y divide-slate-200"
          >

            {/* PASSWORD */}
            <div className="px-8 py-8">

              <h3 className="text-2xl font-bold text-[#0b132b] mb-8">

                Change Password

              </h3>

              <div className="space-y-6">

                <PasswordInput
                  label="Current Password"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  show={showCurrentPassword}
                  setShow={setShowCurrentPassword}
                />

                <PasswordInput
                  label="New Password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  show={showNewPassword}
                  setShow={setShowNewPassword}
                />

                {formData.newPassword && (

                  <div>

                    <p className="text-sm text-slate-600 mb-2">

                      Password Strength:

                    </p>

                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold ${
                        passwordStrength === "Weak"
                          ? "bg-red-100 text-red-700"
                          : passwordStrength === "Medium"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >

                      {passwordStrength}

                    </span>

                  </div>

                )}

                <PasswordInput
                  label="Confirm Password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  show={showConfirmPassword}
                  setShow={setShowConfirmPassword}
                />

              </div>

            </div>

            {/* BUTTON */}
            <div className="px-8 py-6 flex justify-end">

              <button
                type="submit"
                disabled={isPending}
                className="px-8 py-3 rounded-2xl bg-gradient-to-r from-indigo-700 via-blue-600 to-cyan-500 text-white font-semibold shadow-xl hover:scale-[1.03] transition-all duration-300 disabled:opacity-50"
              >

                {isPending
                  ? "Saving..."
                  : "Save Changes"}

              </button>

            </div>

          </form>

        </div>

      </div>

    </div>

  );
}

/* =========================================
   PASSWORD INPUT COMPONENT
========================================= */

const PasswordInput = ({
  label,
  name,
  value,
  onChange,
  show,
  setShow,
}) => {

  return (

    <div>

      <label className="block text-sm font-semibold text-slate-700 mb-2">

        {label}

      </label>

      <div className="relative">

        <CiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />

        <input
          type={show ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full pl-12 pr-14 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all duration-300"
        />

        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-indigo-600"
        >

          {show ? (
            <IoEyeOffOutline size={22} />
          ) : (
            <IoEyeOutline size={22} />
          )}

        </button>

      </div>

    </div>

  );
};