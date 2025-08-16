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
import RequestedProperties from "../Pages/Dashboard/AgentPages/RequestedProperties/RequestedProperties";
import Payment from "../Pages/Dashboard/UserPages/Payment/Payment";
import SoldProperties from "../Pages/Dashboard/AgentPages/SoldProperties/SoldProperties";
import AdvertiseProperty from "../Pages/Dashboard/AdminPages/AdvertiseProperty/AdvertiseProperty";
import NotFound from "../Pages/ErrorPage/Errirpage";
import AdminRoute from "../ProtectedRoutes/AdminRoute/AdminRoute";
import AgentRoute from "../ProtectedRoutes/AgentsRoute/AgentRoute";
import UpdateProperty from "../Pages/Dashboard/AgentPages/MyAddedProperties/UpdateProperty";
import About from "../Pages/About/About";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <NotFound />,
    element: <RootLayouts />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "all-properties",
        element: (
          <>
            <AllProperties />
          </>
        ),
      },
      {
        path: "about",
        element: (
          <>
            <About />
          </>
        ),
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
        path: "property-bought",
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
          <AgentRoute>
            <AddProperties />
          </AgentRoute>
        ),
      },
      {
        path: "my-added-properties",
        element: (
          <AgentRoute>
            <MyAddedProperties />
          </AgentRoute>
        ),
      },
      {
        path: "update-property/:id",
        element: (
          <PrivateRoute>
            <UpdateProperty />
          </PrivateRoute>
        ),
      },
      {
        path: "requested-properties",
        element: (
          <AgentRoute>
            <RequestedProperties />
          </AgentRoute>
        ),
      },
      {
        path: "sold-properties",
        element: (
          <AgentRoute>
            <SoldProperties />
          </AgentRoute>
        ),
      },
      {
        path: "/dashboard/payment/:id",
        element: (
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        ),
      },

      /// admin path

      {
        path: "manage-reviews",
        element: (
          <AdminRoute>
            <ManageReviews />
          </AdminRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "manage-properties",
        element: (
          <AdminRoute>
            <ManageProperties />
          </AdminRoute>
        ),
      },
      {
        path: "advertise-property",
        element: (
          <AdminRoute>
            <AdvertiseProperty />
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
