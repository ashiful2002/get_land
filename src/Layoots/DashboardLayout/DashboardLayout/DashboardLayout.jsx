import React from "react";
import { NavLink, Outlet } from "react-router";
import {
  FaUserShield,
  FaHome,
  FaHeart,
  FaCheckCircle,
  FaStar,
  FaUserCircle,
  FaPlusCircle,
  FaBuilding,
  FaClipboardList,
  FaComments,
  FaUsersCog,
  FaTasks,
} from "react-icons/fa"; // icons
import useUserRole from "../../../Hooks/useUserRole/useUserRole";
import Logo from "../../../Components/Logo/Logo";
import SignOutButton from "../../../Pages/Auth/SignOutButton/SignOutButton";

const DashboardLayout = () => {
  const { role, roleLoading } = useUserRole();

  console.log(role);

  const links = (
    <>
      <Logo />

      {/* user nav */}
      {!roleLoading && role === "user" && (
        <>
          <li>
            <NavLink to="/dashboard" className="flex items-center gap-2">
              <FaHome /> Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/profile"
              className="flex items-center gap-2"
            >
              <FaUserCircle /> My Profile
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/wishlist"
              className="flex items-center gap-2"
            >
              <FaHeart /> Wishlist
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/property-bought"
              className="flex items-center gap-2"
            >
              <FaCheckCircle /> Property Bought
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/reviews"
              className="flex items-center gap-2"
            >
              <FaStar /> My Reviews
            </NavLink>
          </li>
        </>
      )}
      {/* agent nav */}
      {!roleLoading && role === "agent" && (
        <>
          <li>
            <NavLink
              to="/dashboard/profile"
              className="flex items-center gap-2"
            >
              <FaUserCircle /> Agent Profile
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/add-property"
              className="flex items-center gap-2"
            >
              <FaPlusCircle /> Add Property
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/my-added-properties"
              className="flex items-center gap-2"
            >
              <FaBuilding /> My Added Properties
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/requested-properties"
              className="flex items-center gap-2"
            >
              <FaClipboardList /> Requested Properties
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/sold-properties"
              className="flex items-center gap-2"
            >
              <FaCheckCircle /> My Sold Properties
            </NavLink>
          </li>
        </>
      )}

      {/* admin navbar */}
      {!roleLoading && role === "admin" && (
        <>
          <li>
            <NavLink
              to="/dashboard/profile"
              className="flex items-center gap-2"
            >
              <FaUserShield /> Admin Profile
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/manage-properties"
              className="flex items-center gap-2"
            >
              <FaTasks /> Manage Properties
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/manage-users"
              className="flex items-center gap-2"
            >
              <FaUsersCog /> Manage Users
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/manage-reviews"
              className="flex items-center gap-2"
            >
              <FaComments /> Manage Reviews --admin ends
            </NavLink>
          </li>
        </>
      )}
    </>
  );
  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col ">
          {/* dsfgag asdfg a */}

          <div className="drawer">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
              {/* Navbar */}
              <div className="navbar bg-base-300 w-full lg:hidden">
                <div className="flex-none ">
                  <label
                    htmlFor="my-drawer-2"
                    aria-label="open sidebar"
                    className="btn btn-square btn-ghost"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="inline-block h-6 w-6 stroke-current"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      ></path>
                    </svg>
                  </label>
                </div>
                <div className="mx-2 flex-1 px-2 lg:hidden">Dashboard</div>
                <div className="hidden flex-none  lg:hidden">
                  <ul className="menu menu-horizontal">{links}</ul>
                </div>
              </div>
            </div>
          </div>
          <Outlet />
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-72 p-4">
            {links}{" "}
            <div className="mt-[60vh]">
              <SignOutButton />
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
