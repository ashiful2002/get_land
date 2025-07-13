import React from "react";
import useAuth from "../../../Hooks/useAuth";
import { LogOut } from "lucide-react";
import Avatar from "../../../Components/Avatar/Avatar";
import Swal from "sweetalert2";

const SignOutButton = () => {
  const { SignOutUser } = useAuth();
  const handleSignOut = () => {
    Swal.fire({
      title: "Are you sure you want to sign out?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, sign out",
      cancelButtonText: "Cancel",
    }).then((res) => {
      if (res.isConfirmed) {
        SignOutUser()
          .then(() => {
            Swal.fire("Signed out!", "", "success");
          })
          .catch((err) => {
            console.log(err);
            Swal.fire("Error", "Failed to sign out", "error");
          });
      }
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
