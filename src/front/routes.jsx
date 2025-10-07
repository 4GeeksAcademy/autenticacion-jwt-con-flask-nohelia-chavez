import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./pages/Layout";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Private from "./pages/Private";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "signup", element: <Signup /> },
      { path: "login", element: <Login /> },
      { path: "private", element: <Private /> },
      { path: "*", element: <h2 className="m-4">404 - Not Found</h2> },
    ],
  },
]);
