import { createBrowserRouter } from "react-router-dom";
import LoginPage from "@/pages/LoginPage";
import HomePage from "@/pages/HomePage";
import RegistrationPage from "./pages/RegistrationPage";
import Layout from "@/pages/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/home", element: <HomePage /> },
      { path: "/register", element: <RegistrationPage /> },
    ],
  },
]);

export default router;
