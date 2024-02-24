import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false); // State to track login status

  const login = () => {
    if (isLoggingIn) return; // If login request is already in progress, do nothing

    setIsLoggingIn(true); // Set login request in progress
    const data = { username: username, password: password };
    axios.post("http://localhost:3001/auth/login", data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error during login:", error);
      })
      .finally(() => {
        setIsLoggingIn(false); // Reset login status after request completes
      });
  };

  return (
    <div className="loginContainer">
      <label>Username:</label>
      <input
        type="text"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <label>Password:</label>
      <input
        type="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />

      <button onClick={login}> {isLoggingIn ? "Logging in..." : "Login"} </button>
    </div>
  );
}

export default Login;
