import { AdminLayout } from "../layout/AdminLayout";
import { AdminDashboard } from "../pages/Admin/AdminDashboard";
import { UsersList } from "../pages/Admin/UsersList";
import { AdminRoute } from "../components/AdminRoute";

export const adminRouter = [
  {
    path: "/admin",
    element: (
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    ),

    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },

      {
        path: "users",
        element: <UsersList />,
      },
    ],
  },
];