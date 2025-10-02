import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./pages/Layout";

import {Home} from "./pages/Home";
import {Demo} from "./pages/Demo";
import {Single} from "./pages/Single";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Private from "./pages/Private";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/demo", element: <Demo /> },
      { path: "/single/:theid", element: <Single /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/private", element: <Private /> },
    ],
  },
]);
