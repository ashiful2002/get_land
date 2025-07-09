import { createBrowserRouter, RouterProvider } from "react-router";

import React from "react";
import ReactDOM from "react-dom/client";
import RootLayouts from "../Layoots/RootLayouts/RootLayouts";
import Home from "../Pages/Home/Home";
import Signin from "../Pages/Auth/Signin/Signin";
import SignUp from "../Pages/Auth/SignUp/SignUp";
import AllProperties from "../Pages/AllProperties/AllProperties";
import PrivateRoute from "../ProtectedRoutes/PrivateRoute/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayouts />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "all-properties",
        element: (
          <PrivateRoute>
            <AllProperties />
          </PrivateRoute>
        ),
      },
      {
        path: "/sign-in",
        element: <Signin />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
]);

export default router;
