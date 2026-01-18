import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <>
      {" "}
      <h1
        style={{
          fontFamily: "Dancing Script",
          color: "rgba(255, 125, 125, 1)",
        }}
        className="userhome-main-title"
      >
        Strings & Tieds
      </h1>
      {/* Links */}
      <div
        style={{ backgroundColor: "rgba(239, 239, 239, 1)", color: "black" }}
        className="userhome-nav-links"
      >
        <h2 onClick={() => navigate("/profile")}>PROFILE</h2>
        <h2 onClick={() => navigate("/user_products")}>PRODUCTS</h2>
        <h2 onClick={() => navigate("/user_shop")}>SHOPS</h2>
        <h2 onClick={() => navigate("/cart")}>CART</h2>
        <h2 onClick={() => navigate("/order")}>ORDER</h2>
        <h2 onClick={() => navigate("/complaint")}>CONTACT</h2>
        <h2 onClick={() => navigate("/feedback")}>FEEDBACK</h2>
        {/* <h2>CONTACT</h2> */}
        <h2 onClick={() => navigate("/")}>LOGOUT</h2>
      </div>
    </>
  );
};

export default Header;
