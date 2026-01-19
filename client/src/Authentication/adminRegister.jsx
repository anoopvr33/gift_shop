import { useEffect, useState } from "react";
import "../css/Authentication/userRegister.css";
import { RegisterUser } from "../Hooks/userHook";
import CustomAxios from "../utils/axios";
import { RegisterAdmin } from "../Hooks/adminHook";
import { Link } from "react-router-dom";

const AdminRegister = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    profilepic: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const onImage = (e) => {
    const file = e.target.files[0];

    const formData = new FormData();

    formData.append("file", file);
    setForm({ ...form, profilepic: formData });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const ImageUrl = await CustomAxios.post("/image/upload", form.profilepic);

    const newform = Object.assign({}, form, { profilepic: ImageUrl.data.url });

    RegisterAdmin(newform);
    console.log("my register form", newform);
    // alert("Registration Successful!");
  };

  useEffect(() => {
    console.log("register user", form);
  }, [form]);

  return (
    <div className="register-page">
      <div className="register-container">
        <h1>Admin Register</h1>

        <form className="register-form" onSubmit={onSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={onChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={onChange}
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Mobile Number"
            value={form.mobile}
            onChange={onChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={onChange}
            required
          />
          <label style={{ width: "100%", textAlign: "start" }} htmlFor="">
            Profile Image <br />
            <input
              style={{ width: "90%", marginTop: "5px" }}
              type="file"
              name="profilepic"
              placeholder="image"
              // value={form.profilepic}
              onChange={onImage}
              required
            />
          </label>

          <button type="submit">Register</button>
        </form>

        <p className="login-link">
          Already have an account? <Link to="/admin-login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default AdminRegister;
