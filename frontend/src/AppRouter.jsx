import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App"; 
import Login from "./components/Login";
import Signup from './components/Signup'
import ProtectedRoute from "./middleware/ProtectedRoute"

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute><App /></ProtectedRoute>, // Only logged-in users can access
    errorElement: <div>Page Not Found</div>,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "*",
    element: <Navigate to="/login" />, // Redirect unknown routes to login
  }
]);

export default router;
