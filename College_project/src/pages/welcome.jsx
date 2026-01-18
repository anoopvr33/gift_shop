import { useNavigate } from "react-router-dom";
import "../css/pages/welcome.css";
import { useState } from "react";

const WelcomePage = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <div className="home">
      {/* Heading */}
      <h1 className="main-title">
        Gift Lab
        {/* <i onClick={() => setOpen(!open)} class="fa-solid fa-bars"></i>{" "} */}
      </h1>

      {/* Links */}
      <div className={` ${open ? "open" : "nav-links"}`}>
        {/* <i class="fa-solid fa-circle-xmark"></i> */}
        <h2 onClick={() => navigate("/user_login")}>
          <i class="fa-solid fa-user"></i>User Login
        </h2>
        <h2 onClick={() => navigate("/shop-login")}>
          {" "}
          <i class="fa fa-shopping-cart" aria-hidden="true"></i> Shop Login
        </h2>
        <h2 onClick={() => navigate("/admin-login")}>
          {" "}
          <i class="fa fa-user-secret" aria-hidden="true"></i> Admin Login
        </h2>
        {/* <h2>Feedback</h2> */}
      </div>

      {/* Image Section */}
      <div className="hero">
        <img src="/36190382_8312083.jpg" alt="food" />

        <div className="hero-content">
          <h2>Create Memorable Gifts</h2>
          <p style={{ lineHeight: "25px", fontSize: "18px" }}>
            Personalize your perfect gift with our easy-to-use designer and
            surprise your loved ones with something your truly special
          </p>
          <button onClick={() => setOpen(!open)}>
            Get Started <i class="fa fa-arrow-right" aria-hidden="true"></i>{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
