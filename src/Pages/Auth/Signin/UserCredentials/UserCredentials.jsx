import React from "react";

const UserCredentials = () => {
  // Demo user credentials
  const demoUsers = {
    agent: { email: "agent@example.com", password: "123456" },
    admin: { email: "admin@example.com", password: "123456" },
    user: { email: "user@example.com", password: "123456" },
  };

  const handleSelectChange = (role) => {
    if (demoUsers[role]) {
      setValue("email", demoUsers[role].email);
      setValue("password", demoUsers[role].password);
    }
  };
  return (
    <div>
      {/* Demo user selector */}
      <div className="mb-4">
        <select
          defaultValue=""
          onChange={(e) => handleSelectChange(e.target.value)}
          className="select select-sm w-6/12"
        >
          <option value="" disabled>
            Select demo user
          </option>
          <option value="agent">Agent</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
      </div>
    </div>
  );
};

export default UserCredentials;
