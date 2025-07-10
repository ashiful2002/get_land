import React from "react";
import { NavLink } from "react-router";

const NavLinks = () => {
  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/all-properties">All Properties</NavLink>
      </li>
      {/* <li>
        <NavLink to="/add-property">Add Property</NavLink>
      </li> */}
      <li>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </li>
    </>
  );
  return links;
};

export default NavLinks;
