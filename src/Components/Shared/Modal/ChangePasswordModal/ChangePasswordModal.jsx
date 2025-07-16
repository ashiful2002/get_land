import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import useAuth from "../../../../Hooks/useAuth";
import Swal from "sweetalert2";

const ChangePasswordModal = ({ isOpen, onClose, currentUser }) => {
  const { updateUserPassword } = useAuth();

 const handleChangePassword = async () => {
  const { value: formValues } = await Swal.fire({
    title: "Change Password",
    html: `
      <div style="position: relative;">
        <input type="password" id="newPassword" class="swal2-input" placeholder="New Password" />
        <span id="toggleNewPass" style="position: absolute; top: 35%; right: 10px; cursor: pointer;">👁️</span>
      </div>
      <div style="position: relative;">
        <input type="password" id="confirmPassword" class="swal2-input" placeholder="Confirm Password" />
        <span id="toggleConfirmPass" style="position: absolute; top: 35%; right: 10px; cursor: pointer;">👁️</span>
      </div>
      ${
        currentUser?.password
          ? `<p style="font-size:12px;color:gray;">Old Password: <b>${currentUser.password}</b></p>`
          : ""
      }
    `,
    didOpen: () => {
      const newPass = document.getElementById("newPassword");
      const confirmPass = document.getElementById("confirmPassword");
      const toggleNew = document.getElementById("toggleNewPass");
      const toggleConfirm = document.getElementById("toggleConfirmPass");

      toggleNew.addEventListener("click", () => {
        newPass.type = newPass.type === "password" ? "text" : "password";
        toggleNew.textContent = newPass.type === "password" ? "👁️" : "🙈";
      });

      toggleConfirm.addEventListener("click", () => {
        confirmPass.type = confirmPass.type === "password" ? "text" : "password";
        toggleConfirm.textContent = confirmPass.type === "password" ? "👁️" : "🙈";
      });
    },
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: "Change",
    preConfirm: () => {
      const newPassword = document.getElementById("newPassword").value;
      const confirmPassword = document.getElementById("confirmPassword").value;

      if (!newPassword || !confirmPassword) {
        Swal.showValidationMessage("Both fields are required.");
        return false;
      }

      if (newPassword !== confirmPassword) {
        Swal.showValidationMessage("Passwords do not match.");
        return false;
      }

      return newPassword;
    },
  });

  if (formValues) {
    try {
      await updateUserPassword(formValues);
      Swal.fire("Success", "Password updated successfully!", "success");
      onClose();
    } catch (err) {
      Swal.fire("Error", "Failed to update password", "error");
    }
  }
};


  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
          <DialogTitle className="text-lg font-semibold text-gray-900">
            Change Password
          </DialogTitle>
          <p className="mt-2 text-sm text-gray-600">
            Click the button below to enter and confirm your new password.
          </p>
          <div className="mt-6 flex justify-between">
            <button
              onClick={handleChangePassword}
              className="rounded bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700"
            >
              Change Password
            </button>
            <button
              onClick={onClose}
              className="rounded bg-gray-500 px-4 py-2 text-sm text-white hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default ChangePasswordModal;
