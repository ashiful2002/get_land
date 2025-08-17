// components/AgentSocial.jsx
import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

const AgentSocial = ({ size = 24, className = "", agent }) => {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {agent.linkedinUrl ? (
        <a
          href={agent.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="LinkedIn"
        >
          <FaLinkedinIn size={size} color="#0077B5" />
        </a>
      ) : (
        <a
          href="https://www.linkedin.com/in/ashiful-islam-mukto/"
          target="_blank"
          rel="noopener noreferrer"
          title="LinkedIn"
        >
          <FaLinkedinIn size={size} color="#0077B5" />
        </a>
      )}

      {agent.twitterUrl ? (
        <a
          href={agent.twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="Twitter"
        >
          <FaTwitter size={size} color="#1DA1F2" />
        </a>
      ) : (
        <a
          href="https://x.com/Mini_Mukto"
          target="_blank"
          rel="noopener noreferrer"
          title="Twitter"
        >
          <FaTwitter size={size} color="#1DA1F2" />
        </a>
      )}

      {agent.facebookUrl ? (
        <a
          href={agent.facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="Facebook"
        >
          <FaFacebookF size={size} color="#1877F2" />
        </a>
      ) : (
        <a
          href="https://www.facebook.com/ashifulislam.mukto"
          target="_blank"
          rel="noopener noreferrer"
          title="Facebook"
        >
          <FaFacebookF size={size} color="#1877F2" />
        </a>
      )}

      {agent.instagramUrl ? (
        <a
          href={agent.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="Instagram"
        >
          <FaInstagram size={size} color="#E4405F" />
        </a>
      ) : (
        <a
          href="https://www.instagram.com/ashifulislammukto"
          target="_blank"
          rel="noopener noreferrer"
          title="Instagram"
        >
          <FaInstagram size={size} color="#E4405F" />
        </a>
      )}
    </div>
  );
};

export default AgentSocial;
