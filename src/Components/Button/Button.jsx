import React from "react";
import { Link } from "react-router"; 

const Button = ({
  children,
  className = "",
  onClick,
  type = "button",
  href,
  isExternal = false,
  ...props
}) => {
  const classes = `btn ${className}`;

  if (href) {
    if (isExternal) {
      return (
        <a
          href={href}
          className={classes}
          {...props}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    } else {
      
      return (
        <Link to={href} className={classes} {...props}>
          {children}
        </Link>
      );
    }
  }

  return (
    <button type={type} className={classes} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export default Button;
