import React from "react";
import useAuth from "../../../Hooks/useAuth";
import useRedirect from "../../../Hooks/useRedirect/useRedirect";
import { LogOut } from "lucide-react";
import { FiLogOut } from "react-icons/fi";
import Avatar from "../../../Components/Avatar/Avatar";

const SignOutButton = () => {
  const { SignOutUser } = useAuth();
  const { redirect } = useRedirect();
  const handleSignOut = () => {
    SignOutUser()
      .then(() => {
        redirect();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <button onClick={handleSignOut} className="btn btn-primary">
      Sign Out
      <LogOut className="w-4 h-4" />
    </button>
  );
};

export default SignOutButton;
