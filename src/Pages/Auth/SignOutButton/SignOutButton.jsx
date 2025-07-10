import React from "react";
import useAuth from "../../../Hooks/useAuth";
import { LogOut } from "lucide-react";
import { FiLogOut } from "react-icons/fi";
import Avatar from "../../../Components/Avatar/Avatar";
import Swal from "sweetalert2";

const SignOutButton = () => {
  const { SignOutUser } = useAuth();
  const handleSignOut = () => {
    SignOutUser()
      .then(() => {
        Swal.fire("are you sure? ", "", "question");
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
