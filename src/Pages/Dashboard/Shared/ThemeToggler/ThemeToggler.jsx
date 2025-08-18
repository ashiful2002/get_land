import React, { useEffect, useState } from "react";

const ThemeToggler = () => {
  const [theme, setTheme] = useState("light");

  // On mount, load saved theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  // Toggle handler
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div className="place-items-center mt-4">
      <label className="swap swap-rotate">
        {/* hidden checkbox */}
        <input
          type="checkbox"
          checked={theme === "dark"}
          onChange={toggleTheme}
        />

        {/* sun icon (light mode) */}
        <svg
          className="swap-off h-10 w-10"
          style={{ color: "var(--color-secondary)" }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41...Z" />
        </svg>

        {/* moon icon (dark mode) */}
        <svg
          className="swap-on h-10 w-10 fill-current "
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M21.64,13a1,1,0,0,0-1.05-.14...Z" />
        </svg>
      </label>
    </div>
  );
};

export default ThemeToggler;
