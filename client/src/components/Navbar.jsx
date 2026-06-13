import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/auth/authSlice";

import {
  MdOutlineCreate,
  MdOutlineDashboard,
  MdMailOutline,
  MdCurrencyRupee,
  MdMenuOpen,
  MdOutlineAccountCircle,
  MdOutlineHome,
  MdOutlinePrivacyTip,
  MdAdminPanelSettings,
} from "react-icons/md";

import {
  IoCloseSharp,
  IoLogOutOutline,
} from "react-icons/io5";

import { RiAuctionLine } from "react-icons/ri";

import logo from "../assets/logoac.png";

export const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { user } = useSelector((state) => state.auth);

  // LOGOUT
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // PREVENT BODY SCROLL
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      {/* NAVBAR */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-sm font-sans">

        <div className="max-w-7xl mx-auto px-6 py-4">

          <div className="flex justify-between items-center">

            {/* LOGO */}
            <Link
              to="/"
              className="flex items-center gap-4 group"
            >

              {/* LOGO IMAGE */}
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-indigo-100 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">

                <img
                  src={logo}
                  alt="Auction Centrall"
                  className="w-full h-full object-cover"
                />

              </div>

              {/* BRAND */}
              <div>

                <h1 className="text-2xl font-black tracking-tight text-slate-900">

                  Auction Centrall

                </h1>

                <p className="text-[11px] uppercase tracking-[0.25em] text-slate-500 font-semibold">

                  Modern Marketplace

                </p>

              </div>

            </Link>

            {/* DESKTOP NAV */}
            <nav className="hidden md:flex items-center gap-8">

              {(user ? getNavLinks(user.user.role) : navMenu).map((item) => (

                <NavLink
                  key={item.link}
                  to={item.link}
                  className={({ isActive }) =>
                    isActive
                      ? "text-indigo-700 font-bold text-lg transition-all duration-300"
                      : "text-slate-600 hover:text-indigo-700 font-semibold text-lg transition-all duration-300 hover:-translate-y-0.5"
                  }
                >
                  {item.name}
                </NavLink>

              ))}

            </nav>

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-4">

              {!user && <LoginSignup />}

              {/* MENU BUTTON */}
              <button
                onClick={toggleMenu}
                className="w-12 h-12 rounded-2xl bg-slate-100 hover:bg-indigo-100 hover:text-indigo-700 flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-lg"
                aria-expanded={isMenuOpen}
                aria-label="Toggle menu"
              >

                <MdMenuOpen className="text-2xl" />

              </button>

            </div>

          </div>

        </div>

      </header>

      {/* OVERLAY */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-all duration-300 ${
          isMenuOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* SIDE DRAWER */}
    <div
  className={`fixed top-0 right-0 h-full w-80 bg-white border-l border-slate-200 shadow-[0_20px_80px_rgba(15,23,42,0.15)] z-50 transform transition-all duration-500 ease-in-out overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-300 scrollbar-track-transparent ${
    isMenuOpen
      ? "translate-x-0"
      : "translate-x-full"
  }`}
>
      

        {/* DRAWER HEADER */}
        <div className="flex justify-between items-center p-5 border-b border-slate-200">

          <div className="flex items-center gap-3">

            <div className="w-12 h-12 rounded-full overflow-hidden shadow-md border border-slate-200">

              <img
                src={logo}
                alt="Auction Centrall"
                className="w-full h-full object-cover"
              />

            </div>

            <div>

              <h2 className="text-2xl font-black text-slate-900">

                Auction Centrall

              </h2>

              <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500 font-semibold">

                Dashboard

              </p>

            </div>

          </div>

          {/* CLOSE BUTTON */}
          <button
            onClick={() => setIsMenuOpen(false)}
            className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-red-100 hover:text-red-500 flex items-center justify-center transition-all duration-300"
          >

            <IoCloseSharp className="text-2xl" />

          </button>

        </div>

        {/* USER INFO */}
        {user && (
          <div className="p-5 border-b border-slate-200">

            <div className="flex items-center gap-4">

              <div className="w-14 h-14 rounded-full bg-slate-100 overflow-hidden shadow-md flex items-center justify-center">

  <img
    src={
      user?.user?.avatar ||
      "https://ui-avatars.com/api/?name=User"
    }
    alt={user.user.name}
    className="w-full h-full object-cover"
  />

</div>

              <div>

                <h3 className="font-bold text-xl text-slate-900">
                  {user.user.name}
                </h3>

                <p className="text-sm text-slate-500 truncate max-w-[180px]">
                  {user.user.email}
                </p>

              </div>

            </div>

          </div>
        )}

        {/* NAVIGATION */}
        <nav className="p-5">

          {/* MAIN LINKS */}
          <ul className="space-y-2">

            {(user ? getNavLinks(user.user.role) : navMenu).map((item) => (

              <li key={item.link}>

                <NavLink
                  to={item.link}
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center gap-4 px-5 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg font-semibold text-lg"
                      : "flex items-center gap-4 px-5 py-4 rounded-2xl text-slate-700 hover:bg-slate-100 hover:text-indigo-700 transition-all duration-300 font-semibold text-lg"
                  }
                  onClick={() => setIsMenuOpen(false)}
                >

                  <span className="text-2xl">
                    {item.icon}
                  </span>

                  {item.name}

                </NavLink>

              </li>

            ))}

          </ul>

          {/* EXTRA USER LINKS */}
          {user ? (
            <div className="mt-8 pt-8 border-t border-slate-200">

              <ul className="space-y-2">

                {protectedNavLink.slice(4, 7).map((item) => (

                  <li key={item.link}>

                    <NavLink
                      to={item.link}
                      className={({ isActive }) =>
                        isActive
                          ? "flex items-center gap-4 px-5 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg font-semibold text-lg"
                          : "flex items-center gap-4 px-5 py-4 rounded-2xl text-slate-700 hover:bg-slate-100 hover:text-indigo-700 transition-all duration-300 font-semibold text-lg"
                      }
                      onClick={() => setIsMenuOpen(false)}
                    >

                      <span className="text-2xl">
                        {item.icon}
                      </span>

                      {item.name}

                    </NavLink>

                  </li>

                ))}

                {/* LOGOUT */}
                <li>

                  <button
                    className="flex items-center gap-4 w-full px-5 py-4 rounded-2xl text-slate-700 hover:bg-red-50 hover:text-red-500 transition-all duration-300 font-semibold text-lg"
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleLogout();
                    }}
                  >

                    <IoLogOutOutline className="text-2xl" />

                    Sign out

                  </button>

                </li>

              </ul>

            </div>
          ) : (
            <div className="mt-8 pt-8 border-t border-slate-200 space-y-4">

              <Link
                to="/login"
                className="block w-full py-4 text-center rounded-2xl border border-slate-200 text-slate-700 hover:bg-slate-100 transition-all duration-300 font-semibold"
                onClick={() => setIsMenuOpen(false)}
              >
                Log in
              </Link>

              <Link
                to="/signup"
                className="block w-full py-4 text-center rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg hover:scale-[1.02] transition-all duration-300 font-semibold"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign up
              </Link>

            </div>
          )}

        </nav>

      </div>
    </>
  );
};

export const LoginSignup = () => {
  return (
    <div className="hidden md:flex items-center gap-4">

      <Link
        to="/login"
        className="px-6 py-3 rounded-2xl border border-slate-200 text-slate-700 hover:bg-slate-100 transition-all duration-300 font-semibold"
      >
        Log in
      </Link>

      <Link
        to="/signup"
        className="px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg hover:scale-105 transition-all duration-300 font-semibold"
      >
        Sign up
      </Link>

    </div>
  );
};

const navMenu = [
  {
    name: "Home",
    link: "/",
    icon: <MdOutlineHome className="h-5 w-5" />,
  },
];

const protectedNavLink = [
  {
    name: "Dashboard",
    link: "/",
    icon: <MdOutlineDashboard className="h-5 w-5" />,
  },
  {
    name: "Create Auction",
    link: "/create",
    icon: <MdOutlineCreate className="h-5 w-5" />,
  },
  {
    name: "View Auction",
    link: "/auction",
    icon: <RiAuctionLine className="h-5 w-5" />,
  },
  {
    name: "My Auction",
    link: "/myauction",
    icon: <MdCurrencyRupee className="h-5 w-5" />,
  },
  {
    name: "Profile",
    link: "/profile",
    icon: <MdOutlineAccountCircle className="h-5 w-5" />,
  },
  {
    name: "Contact",
    link: "/contact",
    icon: <MdMailOutline className="h-5 w-5" />,
  },
  {
    name: "Privacy",
    link: "/privacy",
    icon: <MdOutlinePrivacyTip className="h-5 w-5" />,
  },
];

const adminNavLink = [
  {
    name: "Admin Panel",
    link: "/admin",
    icon: <MdAdminPanelSettings className="h-5 w-5" />,
  },
  {
    name: "Dashboard",
    link: "/",
    icon: <MdOutlineDashboard className="h-5 w-5" />,
  },
  {
    name: "Create Auction",
    link: "/create",
    icon: <MdOutlineCreate className="h-5 w-5" />,
  },
  {
    name: "View Auction",
    link: "/auction",
    icon: <RiAuctionLine className="h-5 w-5" />,
  },
];

// GET NAV LINKS
const getNavLinks = (userRole) => {
  if (userRole === "admin") {
    return adminNavLink;
  }

  return protectedNavLink.slice(0, 4);
};