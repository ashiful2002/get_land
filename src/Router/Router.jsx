import { createBrowserRouter, RouterProvider } from "react-router";

import React from "react";
import ReactDOM from "react-dom/client";
import RootLayouts from "../Layoots/RootLayouts/RootLayouts";
import Home from "../Pages/Home/Home";
import Signin from "../Pages/Auth/Signin/Signin";
import SignUp from "../Pages/Auth/SignUp/SignUp";
import AllProperties from "../Pages/AllProperties/AllProperties";
import PrivateRoute from "../ProtectedRoutes/PrivateRoute/PrivateRoute";
import AddProperties from "../Pages/Dashboard/AgentPages/AddProperty/AddProperties";
import axios from "axios";
import PropertyDetails from "../Pages/PropertyDetails/PropertyDetails";
import DashboardLayout from "../Layoots/DashboardLayout/DashboardLayout/DashboardLayout";
import AdminRoute from "../ProtectedRoutes/AdminRoute/AdminRoute";
import AdminDashboard from "../Layoots/DashboardLayout/AdminDashboard/AdminDashboard";
import AgentRoute from "../ProtectedRoutes/AgentsRoute/AgentRoute";
import AgentDashboard from "../Layoots/DashboardLayout/AgentDashBoard/AgentDashboard";
import UserDashboard from "../Layoots/DashboardLayout/UserDashboard/UserDashboard";
import DashboardHome from "../Layoots/DashboardLayout/DashboardHome/DashboardHome";
import GetWishList from "../Pages/Dashboard/UserPages/GetWishList/GetWishList";
import Wishlist from "../Shared/Header/WishList/Wishlist";
import UserRoute from "../ProtectedRoutes/UserRoute/UserRoute";
import DashboardStats from "../Pages/Dashboard/DashboardStats/DashboardStats";
import MyProfile from "../Pages/Dashboard/UserPages/MyProfile/MyProfile";
import PropertyBought from "../Pages/Dashboard/UserPages/PropertyBought/PropertyBought";
import MyReviews from "../Pages/Dashboard/UserPages/MyReviews/MyReviews";
import MakeOffer from "../Pages/Dashboard/UserPages/GetWishList/MakeOffer/MakeOffer";
import MyAddedProperties from "../Pages/Dashboard/AgentPages/MyAddedProperties/MyAddedProperties";
import ManageReviews from "../Pages/Dashboard/AdminPages/ManageReviews/ManageReviews";
import ManageProperties from "../Pages/Dashboard/AdminPages/ManageProperties/ManageProperties";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayouts />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: () => fetch("http://localhost:3000/properties"),
      },
      {
        path: "all-properties",
        element: (
          <PrivateRoute>
            <AllProperties />
          </PrivateRoute>
        ),
        loader: () => fetch("http://localhost:3000/properties"),
      },

      {
        path: "property-details/:id",
        element: (
          <PrivateRoute>
            <PropertyDetails />
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
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <DashboardStats
              stats={{
                totalProperties: 87,
                totalUsers: 259,
                totalReviews: 104,
                totalSales: 12250,
              }}
            />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <PrivateRoute>
            <GetWishList />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/make-offer/:id",
        element: (
          <PrivateRoute>
            <MakeOffer />
          </PrivateRoute>
        ),
      },
      {
        path: "purchased",
        element: (
          <PrivateRoute>
            <PropertyBought />
          </PrivateRoute>
        ),
      },
      {
        path: "reviews",
        element: (
          <PrivateRoute>
            <MyReviews />
          </PrivateRoute>
        ),
      },
      // agents related path

      {
        path: "add-property",
        element: (
          <PrivateRoute>
            <AddProperties />
          </PrivateRoute>
        ),
      },
      {
        path: "my-added-properties",
        element: (
          <PrivateRoute>
            <MyAddedProperties />
          </PrivateRoute>
        ),
      },

      /// admin path

      {
        path: "manage-reviews",
        element: (
          <PrivateRoute>
            <ManageReviews />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-properties",
        element: (
          <PrivateRoute>
            <ManageProperties />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
