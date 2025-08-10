import React from "react";
const socialLinks = [
  {
    href: "https://github.com/ashiful2002",
    src: "https://i.ibb.co.com/DPgHTjzM/github.png",
    alt: "GitHub",
  },
  {
    href: "https://www.linkedin.com/in/ashiful-islam-mukto/",
    src: "https://i.ibb.co.com/hRWQmGR9/linkedin.png",
    alt: "LinkedIn",
  },
  {
    href: "https://www.facebook.com/ashifulislam.mukto/",
    src: "https://i.ibb.co.com/rR54L3Xn/facebook.png",
    alt: "Facebook",
  },
];

const Social = () => {
  return (
    <div>
      <ul className="flex items-center justify-center gap-3">
        {socialLinks.map(({ href, src, alt }, index) => (
          <li key={index}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={alt}
            >
              <img src={src} alt={alt} className="w-8" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Social;
