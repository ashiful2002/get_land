import React from "react";

const Divider = ({ children = "OR", position = "center", className = "" }) => {
  const positionClass = {
    center: "divider",
    start: "divider divider-start",
    end: "divider divider-end",
  }[position];

  return <div className={`${positionClass} ${className}`}>{children}</div>;
};

export default Divider;
