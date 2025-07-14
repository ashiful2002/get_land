import { createBrowserRouter } from "react-router";

import RootLayouts from "../Layoots/RootLayouts/RootLayouts";
import Home from "../Pages/Home/Home";
import Signin from "../Pages/Auth/Signin/Signin";
import SignUp from "../Pages/Auth/SignUp/SignUp";
import AllProperties from "../Pages/AllProperties/AllProperties";
import PrivateRoute from "../ProtectedRoutes/PrivateRoute/PrivateRoute";
import AddProperties from "../Pages/Dashboard/AgentPages/AddProperty/AddProperties";
import PropertyDetails from "../Pages/PropertyDetails/PropertyDetails";
import DashboardLayout from "../Layoots/DashboardLayout/DashboardLayout/DashboardLayout";
import GetWishList from "../Pages/Dashboard/UserPages/GetWishList/GetWishList";
import DashboardStats from "../Pages/Dashboard/DashboardStats/DashboardStats";
import PropertyBought from "../Pages/Dashboard/UserPages/PropertyBought/PropertyBought";
import MyReviews from "../Pages/Dashboard/UserPages/MyReviews/MyReviews";
import MakeOffer from "../Pages/Dashboard/UserPages/GetWishList/MakeOffer/MakeOffer";
import MyAddedProperties from "../Pages/Dashboard/AgentPages/MyAddedProperties/MyAddedProperties";
import ManageReviews from "../Pages/Dashboard/AdminPages/ManageReviews/ManageReviews";
import ManageProperties from "../Pages/Dashboard/AdminPages/ManageProperties/ManageProperties";
import Profile from "../Pages/Dashboard/Shared/Profile/Profile";
import Statastics from "../Pages/Dashboard/DashboardStats/Statastics";
import ManageUsers from "../Pages/Dashboard/AdminPages/ManageUsers/ManageUsers";

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
            <Statastics />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
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
        path: "manage-users",
        element: (
          <PrivateRoute>
            <ManageUsers />
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
