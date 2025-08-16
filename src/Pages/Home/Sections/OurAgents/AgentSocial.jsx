// components/ContactIcons.jsx
import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

const AgentSocial = ({ size = 24, color = "#333", className = "" }) => {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
        <FaFacebookF size={size} color={color} />
      </a>
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
        <FaInstagram size={size} color={color} />
      </a>
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
        <FaTwitter size={size} color={color} />
      </a>
      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
        <FaLinkedinIn size={size} color={color} />
      </a>
    </div>
  );
};

export default AgentSocial;
