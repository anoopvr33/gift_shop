import React, { useEffect, useState } from "react";
import "../css/Authentication/userLogin.css";
import { Link } from "react-router-dom";
import { LoginAdmin } from "../Hooks/adminHook";

const AdminLogin = () => {
  const [data, setData] = useState({ email: "", password: "" });

  const handleLogin = (e) => {
    e.preventDefault();

    LoginAdmin(data);
    // add API call here
  };

  useEffect(() => {
    console.log("login data", data);
  }, [data]);

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleLogin}>
        <h2>Admin Login</h2>

        <input
          type="text"
          placeholder="Email"
          name="email"
          value={data.email}
          onChange={(e) =>
            setData({ ...data, [e.target.name]: e.target.value })
          }
          required
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          value={data.password}
          onChange={(e) =>
            setData({ ...data, [e.target.name]: e.target.value })
          }
          required
        />

        <label For="check">
          <input
            style={{ backgroundColor: "red", width: "10px" }}
            type="checkbox"
            name=""
            id="check"
          />{" "}
          Remember me
        </label>

        <button type="submit">Login</button>

        <p className="register-text">
          Don’t have an account? <Link to="/admin-register">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default AdminLogin;
