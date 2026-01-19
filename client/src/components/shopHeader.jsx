import { useNavigate } from "react-router-dom";

const ShopHeader = () => {
  const navigate = useNavigate();

  return (
    <>
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
        <h2 onClick={() => navigate("/shop-products")}>MY PRODUCTS</h2>
        <h2 onClick={() => navigate("/shop-add")}>ADD PRODUCT</h2>
        <h2 onClick={() => navigate("/shop-profile")}>PROFILE</h2>
        <h2 onClick={() => navigate("/order-shop")}>ORDERS</h2>
        <h2 onClick={() => navigate("/complaint-shop")}>CONTACT</h2>

        {/* <h2>CONTACT</h2> */}
        <h2 onClick={() => navigate("/")}>LOGOUT</h2>
      </div>
    </>
  );
};

export default ShopHeader;
