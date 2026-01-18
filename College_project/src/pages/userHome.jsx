import { useNavigate } from "react-router-dom";
import "../css/pages/userHome.css";
import Header from "../components/header";

const UserHome = () => {
  const navigate = useNavigate();

  return (
    <div className="userhome-home">
      {/* Heading */}
      <Header></Header>

      {/* Image Section */}
      <div className="userhome-hero">
        <img src="/36190382_8312083.jpg" alt="food" />

        <div
          style={{
            fontFamily: "Dancing Script",
            color: "rgba(255, 125, 125, 1)",
          }}
          className="userhome-hero-content"
        >
          <h2>Welcome to Strings & Tieds</h2>
          <p style={{ lineHeight: "25px" }}>
            Purchase gifts for loved ones, Customise order,, purchase and Enjoy
          </p>
          <button onClick={() => navigate("/user_products")}>Order Now</button>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
