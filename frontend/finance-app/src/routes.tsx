import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginPage from "@/pages/LoginPage";
import RegistrationPage from "@/pages/RegistrationPage";
import Layout from "@/pages/Layout";
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardPage from "@/pages/DashboardPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="/home" replace /> },

      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegistrationPage /> },

      {
        element: <ProtectedRoute />,
        children: [{ path: "/home", element: <DashboardPage /> }],
      },
    ],
  },
]);

export default router;
