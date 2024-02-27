import axios from 'axios';
import React, { useState } from 'react';

function ChangePassword() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [error, setError] = useState("");

    const changePassword = () => {
        axios
          .put(
            "http://localhost:3001/auth/changepassword",
            {
              oldPassword: oldPassword,
              newPassword: newPassword,
            },
            {
              headers: {
                accessToken: localStorage.getItem("accessToken"),
              },
            }
          )
          .then((response) => {
            if (response.data.error) {
              setError(response.data.error);
            } else {
              // Password changed successfully
              setError("");
              // Optionally, you might want to clear the input fields here
            }
          })
          .catch((error) => {
            console.error("Error occurred:", error);
            setError("An error occurred while changing password.");
          });
          setOldPassword("")
          setNewPassword("");
          alert("Login Now")
      };

  return (
    <div>
        <h3>Change Your Password</h3>
        {error && <div>{error}</div>}
        <input 
          type='password'
          placeholder='Old Password'
          value={oldPassword}
          onChange={(event) => setOldPassword(event.target.value)}
        />
        <input 
          type='password'
          placeholder='New Password'
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
        />
        <button onClick={changePassword}>Save Changes</button>
    </div>
  );
}

export default ChangePassword;
