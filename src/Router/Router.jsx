import { createBrowserRouter, RouterProvider } from "react-router";

import React from "react";
import ReactDOM from "react-dom/client";
import RootLayouts from "../Layoots/RootLayouts/RootLayouts";
import Home from "../Pages/Home/Home";
import Signin from "../Pages/Auth/Signin/Signin";
import SignUp from "../Pages/Auth/SignUp/SignUp";
import AllProperties from "../Pages/AllProperties/AllProperties";
import PrivateRoute from "../ProtectedRoutes/PrivateRoute/PrivateRoute";
import AddProperties from "../Pages/AddProperties/AddProperties";
import axios from "axios";
import PropertyDetails from "../Pages/PropertyDetails/PropertyDetails";

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
        path: "add-property",
        element: (
          <PrivateRoute>
            <AddProperties />
          </PrivateRoute>
        ),
      },
      {
        path: "property-details/:id",
        element: (
          <PrivateRoute>
            <PropertyDetails />
          </PrivateRoute>
        ),
        loader: ({params}) =>
          axios.get(`http://localhost:3000/properties/${params.id}`),
      },
      //properties/686e493a5f6a385c107e545a
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
