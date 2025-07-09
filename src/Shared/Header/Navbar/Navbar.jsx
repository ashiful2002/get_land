import React from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import SignOutButton from "../../../Pages/Auth/SignOutButton/SignOutButton";
import Avatar from "../../../Components/Avatar/Avatar";
import NavLinks from "../../../Components/NavLinks/NavLinks";
import Logo from "../../../Components/Logo/Logo";

const Navbar = () => {
  const { user } = useAuth();
  
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
             
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <NavLinks />
          </ul>
        </div>
       < Logo/>
      </div>
      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal px-1">
          <NavLinks />
        </ul>
      </div>
      <div className="navbar-end">
        <Avatar />
        {user ? (
          <span>
            <SignOutButton />
          </span>
        ) : (
          <Link to="/sign-in" className="btn btn-primary">
            Sign in
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
