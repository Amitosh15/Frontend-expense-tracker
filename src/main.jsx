import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import Income from "./components/Incomes/Income.jsx";
import Expenses from "./components/Expenses/Expenses.jsx";
import Login from "./components/Login/Login.jsx";
import Signup from "./components/Signup/Signup.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import PublicRoute from "./PublicRoute.jsx";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/incomes",
        element: (
          <ProtectedRoute>
            <Income />
          </ProtectedRoute>
        ),
      },
      {
        path: "/expenses",
        element: (
          <ProtectedRoute>
            <Expenses />
          </ProtectedRoute>
        ),
      },
      {
        path: "/login",
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
      {
        path: "/signup",
        element: (
          <PublicRoute>
            <Signup />
          </PublicRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={appRouter}></RouterProvider>,
);
