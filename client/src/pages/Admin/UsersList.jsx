import React, {
  useState,
  useEffect,
} from "react";

import { Link } from "react-router-dom";

import LoadingScreen from "../../components/LoadingScreen";

import {
  getAllUsers,
  deleteUser,
} from "../../api/admin";

export const UsersList = () => {

  const [users, setUsers] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);

  const [pagination, setPagination] =
    useState({});

  const [currentPage, setCurrentPage] =
    useState(1);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [debouncedSearch, setDebouncedSearch] =
    useState("");

  const [sortBy, setSortBy] =
    useState("createdAt");

  const [sortOrder, setSortOrder] =
    useState("desc");

    const [showDeleteModal, setShowDeleteModal] =
  useState(false);

const [selectedUserId, setSelectedUserId] =
  useState(null);

const [isDeleting, setIsDeleting] =
  useState(false);

  /* =========================================
     DEBOUNCED SEARCH
  ========================================= */

  useEffect(() => {

    const timer = setTimeout(() => {

      setDebouncedSearch(searchTerm);

    }, 500);

    return () => clearTimeout(timer);

  }, [searchTerm]);

  /* =========================================
     FETCH USERS
  ========================================= */

  const fetchUsers = async (
    page = 1,
    search = "",
    sort = "createdAt",
    order = "desc"
  ) => {

    try {

      setLoading(true);

      setError(null);

     const response =
  await getAllUsers(
    page,
    search,
    "all",
    20,
    sort,
    order
  );

console.log("Users API:", response);

setUsers(
  response?.data?.users || []
);

setPagination(
  response?.data?.pagination || {}
);

    } catch (error) {

      console.error(
        "Error fetching users:",
        error
      );

      setError(
        "Failed to load users"
      );

      setUsers([]);

    } finally {

      setLoading(false);

    }

  };

  /* =========================================
     FETCH ON CHANGE
  ========================================= */

  useEffect(() => {

    fetchUsers(
      currentPage,
      debouncedSearch,
      sortBy,
      sortOrder
    );

  }, [
    currentPage,
    debouncedSearch,
    sortBy,
    sortOrder,
  ]);

  /* =========================================
     SEARCH
  ========================================= */

  const handleSearch = (e) => {

    setSearchTerm(
      e.target.value
    );

    setCurrentPage(1);

  };

  /* =========================================
     SORT
  ========================================= */

  const handleSort = (field) => {

    if (sortBy === field) {

      setSortOrder(
        sortOrder === "asc"
          ? "desc"
          : "asc"
      );

    } else {

      setSortBy(field);

      setSortOrder("desc");

    }

    setCurrentPage(1);

  };

  /* =========================================
     DELETE USER
  ========================================= */

const openDeleteModal = (id) => {

  setSelectedUserId(id);

  setShowDeleteModal(true);

};

const handleDeleteUser = async () => {

  try {

    setIsDeleting(true);

    await deleteUser(selectedUserId);

    setUsers((prev) =>
      prev.filter(
        (user) =>
          user._id !== selectedUserId
      )
    );

    setPagination((prev) => ({
      ...prev,
      totalUsers:
        (prev.totalUsers || 1) - 1,
    }));

    setShowDeleteModal(false);

    setSelectedUserId(null);

  } catch (error) {

    console.error(
      "FULL DELETE ERROR:",
      error
    );

    console.error(
      "STATUS:",
      error?.response?.status
    );

    console.error(
      "DATA:",
      error?.response?.data
    );

    alert(
      `Status: ${
        error?.response?.status
      }\n${
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Delete Failed"
      }`
    );

  } finally {

    setIsDeleting(false);

  }

};


  /* =========================================
     FORMAT DATE
  ========================================= */

  const formatDate = (
    dateString
  ) => {

    if (!dateString)
      return "Never";

    return new Date(
      dateString
    ).toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    );

  };

  /* =========================================
     FORMAT LOCATION
  ========================================= */

  const formatLocation = (
    location
  ) => {

    if (!location)
      return "Unknown";

    const parts = [];

    if (location.city)
      parts.push(location.city);

    if (location.region)
      parts.push(location.region);

    if (location.country)
      parts.push(location.country);

    return parts.length > 0
      ? parts.join(", ")
      : "Unknown";

  };

  /* =========================================
     SORT ICON
  ========================================= */

  const getSortIcon = (
    field
  ) => {

    if (sortBy !== field) {

      return (
        <svg
          className="w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >

          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
          />

        </svg>
      );

    }

    return sortOrder === "asc" ? (

      <svg
        className="w-4 h-4 text-blue-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >

        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 15l7-7 7 7"
        />

      </svg>

    ) : (

      <svg
        className="w-4 h-4 text-blue-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >

        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />

      </svg>

    );

  };

  if (loading)
    return <LoadingScreen />;

  return (

    <div className="min-h-screen bg-gray-50">

      <div className="p-8">

        {/* TOP BAR */}
        <div className="flex items-center justify-between mb-8">

          <div>

            <h1 className="text-4xl font-bold text-gray-900">

              All Users

            </h1>

            <p className="text-gray-600 mt-2">

              Manage and monitor all registered users

            </p>

          </div>

          <Link
            to="/admin"
            className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-3 rounded-xl font-semibold transition-all duration-300"
          >

            Back to Dashboard

          </Link>

        </div>

        {/* SEARCH */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8 mb-8">

          <div className="flex flex-col md:flex-row md:items-end gap-6">

            <div className="flex-1">

              <label className="block text-sm font-semibold text-gray-700 mb-3">

                Search Users

              </label>
<input
  type="text"
  placeholder="Search by name or email..."
  value={searchTerm}
  onChange={handleSearch}
  className="w-full px-5 py-4 rounded-2xl border border-gray-300 text-gray-900 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300"
/>

            </div>

            <div className="text-gray-600 font-medium">

              {pagination.totalUsers || 0} total users

            </div>

          </div>

        </div>

        {/* ERROR */}
        {error && (

          <div className="bg-red-50 border border-red-200 rounded-2xl p-5 mb-6 text-red-600">

            {error}

          </div>

        )}

        {/* TABLE */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">

          <div className="overflow-x-auto scrollbar-thin">

            <table className="w-full table-auto">

              <thead className="bg-gray-50 border-b border-gray-200">

                <tr>

                  <th
                    onClick={() =>
                      handleSort("name")
                    }
                    className="px-4 py-4 text-left text-sm font-bold text-gray-500 uppercase tracking-wider cursor-pointer"
                  >

                    <div className="flex items-center gap-2">

                      USER

                      {getSortIcon("name")}

                    </div>

                  </th>

                  <th
                    onClick={() =>
                      handleSort("role")
                    }
                    className="px-4 py-4 text-left text-sm font-bold text-gray-500 uppercase tracking-wider cursor-pointer"
                  >

                    <div className="flex items-center gap-2">

                      ROLE

                      {getSortIcon("role")}

                    </div>

                  </th>

                  <th
                    onClick={() =>
                      handleSort(
                        "createdAt"
                      )
                    }
                    className="px-4 py-4 text-left text-sm font-bold text-gray-500 uppercase tracking-wider cursor-pointer"
                  >

                    <div className="flex items-center gap-2">

                      DATE CREATED

                      {getSortIcon(
                        "createdAt"
                      )}

                    </div>

                  </th>

                  <th className="px-4 py-4 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">

                    LAST LOGIN

                  </th>

                  <th className="px-4 py-4 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">

                    LOCATION

                  </th>

                  <th className="px-4 py-4 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">

                    ACTIONS

                  </th>

                </tr>

              </thead>

              <tbody className="divide-y divide-gray-100">

                {users.length === 0 ? (

                  <tr>

                    <td
                      colSpan="6"
                      className="text-center py-16 text-gray-500"
                    >

                      No users found

                    </td>

                  </tr>

                ) : (

                  users.map((user) => (

                    <tr
                      key={user._id}
                      className="hover:bg-indigo-50/40 transition-all duration-300"
                    >

                      {/* USER */}
                      <td className="px-8 py-6">

                        <div className="flex items-center gap-4">

                          <img
                            src={
                              user.avatar ||
                              `https://ui-avatars.com/api/?name=${user.name}`
                            }
                            alt={user.name}
                            className="w-15 h-15 rounded-full object-cover border-2 border-gray-200"
                          />

                          <div>
<div className="ml-8">
                            <h3 className="font-bold text-gray-900 text-lg">

                              {user.name}

                            </h3>

                            <p className="text-gray-500">

                              {user.email}

                            </p>
</div>
                          </div>

                        </div>

                      </td>

                      {/* ROLE */}
                      <td className="px-4 py-4">

                        <span
                          className={`px-4 py-2 rounded-full text-sm font-bold ${
                            user.role ===
                            "admin"
                              ? "bg-purple-100 text-purple-700"
                              : "bg-emerald-100 text-emerald-700"
                          }`}
                        >

                          {user.role}

                        </span>

                      </td>

                      {/* DATE */}
                      <td className="px-4 py-4 text-gray-600 whitespace-nowrap text-sm">

                        {formatDate(
                          user.createdAt
                        )}

                      </td>

                      {/* LOGIN */}
                      <td className="px-4 py-4 text-gray-600 whitespace-nowrap text-sm">

                        {formatDate(
                          user.lastLogin
                        )}

                      </td>

                      {/* LOCATION */}
                      <td className="px-4 py-4 text-gray-600 text-sm max-w-[180px]">

                        {formatLocation(
                          user.location
                        )}

                      </td>

                      {/* ACTION */}
                      <td className="px-4 py-4">

                        <button
                          onClick={() =>
                          openDeleteModal(
                              user._id
                            )
                          }
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 hover:scale-105"
                        >

                          Delete

                        </button>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>
      {showDeleteModal && (

  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

    <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl animate-in fade-in zoom-in">

      <div className="flex justify-center mb-5">

        <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">

          <span className="text-4xl">
            🗑️
          </span>

        </div>

      </div>

      <h2 className="text-2xl font-bold text-center text-gray-900">

        Delete User

      </h2>

      <p className="text-center text-gray-500 mt-3">

        This action cannot be undone.
        Are you sure you want to delete this user?

      </p>

      <div className="flex gap-4 mt-8">

       <button
  onClick={() =>
    setShowDeleteModal(false)
  }
  disabled={isDeleting}
  className="flex-1 py-3 rounded-xl bg-slate-800 text-white font-semibold hover:bg-white-900 transition-all duration-300"
>
  Cancel
</button>

        <button
          onClick={handleDeleteUser}
          disabled={isDeleting}
          className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold"
        >

          {isDeleting
            ? "Deleting..."
            : "Delete User"}

        </button>

      </div>

    </div>

  </div>

)}

    </div>

  );
};  