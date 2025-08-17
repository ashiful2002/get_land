import React, { useEffect, useState } from "react";
import useAuth from "../../../../Hooks/useAuth";
import {
  FaUserEdit,
  FaKey,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../../Components/Loading/Loading";
import Section from "../../../../Components/Section/Section";
import UpdateProfile from "../../../../Components/Shared/Modal/UpdateProfile/UpdateProfile";
import ChangePasswordModal from "../../../../Components/Shared/Modal/ChangePasswordModal/ChangePasswordModal";

const Profile = () => {
  const { user: authUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [updateModal, setUpdateModal] = useState(false);
  const [changeUserPass, setChangeUserPass] = useState(false);
  const {
    data: userProfile,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await axiosSecure.get(`users/${authUser?.email}`);
      return res.data;
    },
  });
  // console.log(userProfile);

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <p>something is wrror</p>;
  }
  if (!userProfile) {
    return (
      <div className="text-center text-gray-500 p-8">
        No user data available.
      </div>
    );
  }

  return (
    <Section
      title="My Profile"
      className="w-xs md:w-xl xl:w-2xl mx-auto bg-white dark:bg-gray-700  shadow-lg rounded-lg p-6 mt-6"
    >
      <div className="flex flex-col items-center space-y-4">
        <img
          src={userProfile.photoURL}
          alt={`${userProfile.name}'s avatar`}
          className="w-32 h-32 rounded-full object-cover border-2 border-primary"
        />
        <div>
          <span className="badge badge-soft badge-primary dark:outline dark:text-white capitalize">
            {userProfile.role}
          </span>
        </div>
        <div className="flex flex-wrap gap-3 items-center justify-center space-x-3.5">
          <button
            onClick={() => setUpdateModal(true)}
            className="btn btn-primary flex items-center gap-2"
          >
            <FaUserEdit /> Update Profile
          </button>
          {updateModal && (
            <UpdateProfile
              showModal={updateModal}
              setShowModal={setUpdateModal}
              userProfile={userProfile}
            />
          )}
          <button
            onClick={() => setChangeUserPass(true)}
            className="btn btn-success flex items-center gap-2 text-white"
          >
            <FaKey /> Change Password
          </button>
          {changeUserPass && (
            <ChangePasswordModal
              isOpen={changeUserPass}
              onClose={() => setChangeUserPass(false)}
              currentUser={userProfile}
            />
          )}
        </div>
        <div className="w-full space-y-2">
          <div className="flex items-center">
            <label className="font-semibold text-gray-700 dark:text-gray-200"></label>

            <p className="text-lg">
              <strong> Name: </strong>
              {userProfile.name}
            </p>
          </div>
          <div className="flex items-center ">
            <p className="text-lg">
              {" "}
              <strong> Email: </strong>
              {userProfile.email}
            </p>
          </div>
          <div className="flex items-center">
            <p className="text-lg">
              <strong> Account created: </strong>
              {new Date(userProfile.created_at).toLocaleDateString("en-UK", {
                day: "2-digit",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </p>
          </div>
          <div className="flex items-center">
            <p className="text-lg">
              <strong>Last log in: </strong>

              {new Date(userProfile.last_log_in).toLocaleDateString("en-UK", {
                day: "2-digit",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </p>
          </div>
          {/* socials */}
          <div className="flex items-center">
            <span className="text-lg">
              <span className="flex gap-4 text-3xl">
                <a target="_blank" href={userProfile.facebookUrl}>
                  <FaFacebook />
                </a>
                <a target="_blank" href={userProfile.instagramUrl}>
                  <FaInstagram />
                </a>
                <a target="_blank" href={userProfile.linkedinUrl}>
                  <FaLinkedin />
                </a>
              </span>
            </span>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Profile;
