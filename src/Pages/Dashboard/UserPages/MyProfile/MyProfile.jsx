import React, { useEffect, useState } from "react";
import useAuth from "../../../../Hooks/useAuth";
import { FaUserEdit, FaKey } from "react-icons/fa";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure/UseAxiosSecure";
import axios from "axios";

const MyProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [loggeninUser, setLoggedinUser] = useState();

  if (user?.email) {
    useEffect(() => {
      axios
        .get(`http://localhost:3000/users/${user.email}`)
        .then((res) => setLoggedinUser(res.data))
        .catch((err) => {
          console.log(err);
        });
    }, [user?.email]);
  }

  if (!user) {
    return (
      <div className="text-center text-gray-500 p-8">
        No user data available.
      </div>
    );
  }

  return (
    <div className="w-xs md:w-xl xl:w-2xl mx-auto bg-white dark:bg-gray-700  shadow-lg rounded-lg p-6 mt-6">
      <h2 className="text-2xl font-semibold mb-4 text-center">My Profile</h2>

      <div className="flex flex-col items-center space-y-4">
        <img
          src={user.photoURL}
          alt={`${user.name}'s avatar`}
          className="w-32 h-32 rounded-full object-cover border-2 border-primary"
        />
        <div className=" flex  items-center justify-between space-x-3.5">
          <button className="btn btn-primary flex items-center gap-2">
            <FaUserEdit /> Update Profile
          </button>

          <button className="btn btn-success flex items-center gap-2 text-white">
            <FaKey /> Change Password
          </button>
        </div>
        <div className="w-full space-y-2">
          <div className="flex items-center">
            <label className="font-semibold text-gray-700 dark:text-gray-200">
              Name:
            </label>
            <p className="text-lg">{user.displayName}</p>
          </div>

          <div className="flex items-center ">
            <label className="font-semibold text-gray-700 dark:text-gray-200">
              Email:
            </label>
            <p className="text-lg">{user.email}</p>
          </div>

          <div className="flex items-center">
            <label className="font-semibold text-gray-700 dark:text-gray-200">
              Role:
            </label>
            <p className="text-lg capitalize">{user.role}</p>
          </div>

          <div className="flex items-center">
            <label className="font-semibold text-gray-700 dark:text-gray-200">
              Account Created:
            </label>
            <p className="text-lg">
              {new Date(user.created_at).toLocaleDateString()}
            </p>
          </div>

          <div className="flex items-center">
            <label className="font-semibold text-gray-700 dark:text-gray-200">
              Last Logged In:
            </label>
            <p className="text-lg">
              {new Date(user.last_log_in).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
