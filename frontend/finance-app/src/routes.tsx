import { createBrowserRouter } from "react-router-dom";
import LoginPage from "@/pages/LoginPage";
import RegistrationPage from "@/pages/RegistrationPage";
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardPage from "@/pages/DashboardPage";

const router = createBrowserRouter([
  { path: "/", element: <LoginPage /> },
  { path: "/register", element: <RegistrationPage /> },

  {
    path: "/dashboard",
    element: <ProtectedRoute />,
    children: [{ index: true, element: <DashboardPage /> }],
  },
]);

export default router;
