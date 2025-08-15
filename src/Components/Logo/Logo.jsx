import React from "react";
import { Link } from "react-router";

const Logo = () => {
  return (
    <Link to="/" className="btn btn-ghost">
      <img src="/logo.png" className="w-22 sm:w-32 " />
    </Link>
  );
};

export default Logo;
