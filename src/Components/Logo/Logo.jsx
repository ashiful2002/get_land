import React from "react";
import { Link } from "react-router";

const Logo = () => {
  return (
    <Link to="/" className="btn  btn-ghost text-xl">
      <img src="/logo.png" className="w-32  rounded-full" />
    </Link>
  );
};

export default Logo;
