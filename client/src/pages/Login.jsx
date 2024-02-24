import React, { useState, useContext} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/authContext";

function Login() {
    const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const {setAuthState}  = useContext(AuthContext)

  const login = () => {
    if (isLoggingIn) return; // If login request is already in progress, do nothing

    setIsLoggingIn(true); // Set login request in progress
    const data = { username: username, password: password };
    axios.post("http://localhost:3001/auth/login", data)
      .then((response) => {
        console.log(response.data);
        if(response.data.error){
            alert(response.data.error)}
            else{
                localStorage.setItem("accessToken",response.data)
                setAuthState(true)
                navigate('/')
            }
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
