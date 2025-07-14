import React from "react";
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router";

const Avatar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const handleAvatarClick = () => {
    navigate("/dashboard/profile");
  };
  return (
    <>
      {user && (
        <div>
          {/* new avatar */}

          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
            onClick={handleAvatarClick}
          >
            <div className="w-10 rounded-full">
              <img
                alt={user?.displayName}
                src={
                  user
                    ? user.photoURL
                    : "https://img.daisyui.com/images/profile/demo/yellingcat@192.webp"
                }
              />
            </div>
          </div>
          {/* new ends */}

          {/* <div className="avatar me-3">
            <div className="w-12 rounded-full">
              <img
                src={
                  user
                    ? user.photoURL
                    : "https://img.daisyui.com/images/profile/demo/yellingcat@192.webp"
                }
              />
            </div>
          </div> */}
        </div>
      )}
    </>
  );
};

export default Avatar;
