import { Outlet } from "react-router";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  LayoutDashboard,
  Users,
  Gavel,
  BarChart3,
  CloudBackup,
} from "lucide-react";

export const AdminLayout = () => {
const { user } = useSelector((state) => state.auth);
  return (

    <div className="min-h-screen flex bg-[#0f172a] text-white">

      {/* SIDEBAR */}
      <aside className="w-[270px] bg-[#111827] border-r border-slate-800 p-6 hidden md:block">

        {/* LOGO */}
        <div className="mb-10">

          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent">

            Auction Central

          </h1>

          <p className="text-slate-400 mt-2 text-sm">

            Admin Panel

          </p>

        </div>

        {/* NAVIGATION */}
        <nav className="space-y-3">

          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-5 py-4 rounded-2xl transition-all duration-300 ${
                isActive
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "hover:bg-slate-800 text-slate-300"
              }`
            }
          >

            <LayoutDashboard size={22} />

            Dashboard

          </NavLink>

          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `flex items-center gap-3 px-5 py-4 rounded-2xl transition-all duration-300 ${
                isActive
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "hover:bg-slate-800 text-slate-300"
              }`
            }
          >

            <Users size={22} />

            Users

          </NavLink>

          

          
<NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-3 px-5 py-4 rounded-2xl transition-all duration-300 ${
                isActive
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "hover:bg-slate-800 text-slate-300"
              }`
            }
          >

            <CloudBackup size={22} />

            Back to Site

          </NavLink>
        </nav>

      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto">

        {/* TOPBAR */}
        <div className="sticky top-0 z-20 bg-[#0f172a]/80 backdrop-blur-xl border-b border-slate-800 px-8 py-5">

          <div className="flex items-center justify-between">

            <h2 className="text-2xl font-bold">

              Admin Dashboard

            </h2>

            <div className="flex items-center gap-4">

  <div className="text-right">

    <h3 className="text-sm font-semibold text-white">
      {user?.user?.name}
    </h3>

    <p className="text-xs text-slate-400 capitalize">
      {user?.user?.role}
    </p>

  </div>

  <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-cyan-400 shadow-lg">

    <img
      src={
        user?.user?.avatar ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(
          user?.user?.name || "Admin"
        )}`
      }
      alt={user?.user?.name}
      className="w-full h-full object-cover"
    />

  </div>

</div>

          </div>

        </div>

        {/* PAGE CONTENT */}
        <div className="p-8">

          <Outlet />

        </div>

      </main>

    </div>

  );

};