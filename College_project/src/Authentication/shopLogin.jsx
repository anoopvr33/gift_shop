import React, { useEffect, useState } from "react";
import "../css/Authentication/userLogin.css";
import { Link, useNavigate } from "react-router-dom";
import { LoginShop } from "../Hooks/shopHook";

const ShopLogin = () => {
  const [data, setData] = useState({ email: "", password: "" });
  // const navigate=useNavigate()

  const handleLogin = (e) => {
    e.preventDefault();

    LoginShop(data);
    // add API call here
  };

  useEffect(() => {
    console.log("login data", data);
  }, [data]);
  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleLogin}>
        <h2>Shop Login</h2>

        <input
          type="text"
          placeholder="Username"
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
          Don’t have an account? <Link to="/shop-register">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default ShopLogin;
