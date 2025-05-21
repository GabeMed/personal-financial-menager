import { createBrowserRouter } from "react-router-dom";
import LoginPage from "@/pages/LoginPage";
import HomePage from "./pages/HomePage";
import RegistrationPage from "./pages/RegistrationPage";

const router = createBrowserRouter([
  { path: "/", element: <LoginPage /> },
  { path: "/home", element: <HomePage /> },
  { path: "/register", element: <RegistrationPage /> },
]);

export default router;
