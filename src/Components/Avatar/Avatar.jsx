import React from "react";
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router";

const Avatar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAvatarClick = () => {
    navigate("/dashboard/profile");
  };

  if (!user) return null; // No avatar if not logged in

  return (
    <div
      tabIndex={0}
      role="button"
      title={user.displayName || "Profile"}
      className="btn btn-ghost btn-circle avatar"
      onClick={handleAvatarClick}
    >
      <div className="w-10 rounded-full overflow-hidden">
        <img
          alt={user.displayName || "User Avatar"}
          src={
            user.photoURL ||
            "https://img.daisyui.com/images/profile/demo/yellingcat@192.webp"
          }
        />
      </div>
    </div>
  );
};

export default Avatar;
