// components/AgentSocial.jsx
import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

const socialLinks = [
  {
    name: "LinkedIn",
    icon: FaLinkedinIn,
    url: "https://www.linkedin.com/in/ashiful-islam-mukto/",
    color: "#0077B5", // LinkedIn blue
  },
  {
    name: "Twitter",
    icon: FaTwitter,
    url: "https://x.com/Mini_Mukto",
    color: "#1DA1F2", // Twitter blue
  },
  {
    name: "Facebook",
    icon: FaFacebookF,
    url: "https://www.facebook.com/ashifulislam.mukto/",
    color: "#1877F2", // Facebook blue
  },
  {
    name: "Instagram",
    icon: FaInstagram,
    url: "https://www.instagram.com/ashifulislammukto/",
    color: "#E4405F", // Instagram pink
  },
];

const AgentSocial = ({ size = 24, className = "" }) => {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {socialLinks.map((social) => {
        const Icon = social.icon;
        return (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            title={social.name}
          >
            <Icon size={size} color={social.color} />
          </a>
        );
      })}
    </div>
  );
};

export default AgentSocial;
