import React from "react";
import useAuth from "../../Hooks/useAuth";

const Avatar = () => {
  const { user } = useAuth();
  return (
    <>
      {user && (
        <div>
          <div className="avatar me-3">
            <div className="w-12 rounded-full">
              <img
                src={
                  user
                    ? user.photoURL
                    : "https://img.daisyui.com/images/profile/demo/yellingcat@192.webp"
                }
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Avatar;
