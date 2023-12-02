import React, { useState } from "react";
import styles from "./login.module.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  console.log("username password", username, password);

  async function handleSignIn(event) {
    event.preventDefault();
    if (username.length === 0) {
      setError("User name can't be empty");
      return;
    }
    if (password.length < 8) {
      setError("Please ensure password has at least 8 characters");
      return;
    }
    if (username.length > 0 && password.length > 0) {
      const requestBody = {
        username: username,
        password: password,
      };
      const response = await fetch(
        "https://stg.dhunjam.in/account/admin/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );
      const loginResponse = await response.json();
      console.log("loginResponse :", loginResponse);

      if (loginResponse.status === 200 && loginResponse.data?.token) {
        localStorage.setItem("authToken", loginResponse.data.token);
        console.log("Token saved!", loginResponse.data.token);
        navigate(`/admin-dashboard?id=${loginResponse.data.id}`);
        setError("");
      } else {
        console.log("loginResponse.ui_err_msg");
        setError(loginResponse.ui_err_msg);
      }
    }
  }
  return (
    <div className="container">
      <h1>Venue Admin Login</h1>
      <div className={styles.login}>
        <input
          type="text"
          placeholder="Username"
          className={styles.input}
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className={styles.input}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <span
          style={{
            color: "red",
          }}
        >
          {error}
        </span>
        <button className={styles.loginBtn} onClick={handleSignIn}>
          Sign In
        </button>
      </div>
      <div className={styles.pTag}>
        <p>New Registration?</p>
      </div>
    </div>
  );
};

export default Login;
