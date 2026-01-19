// import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../css/pages/userProfile.css";
import { GetOneShopHook } from "../Hooks/shopHook";
import { useEffect, useState } from "react";
import { getId } from "../utils";

const ShopProfile = () => {
  const [user, setData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      const data = await GetOneShopHook(getId());

      console.log("Shop profile", data);
      setData(data);
    };

    fetchEmployees();
  }, []);
  return (
    <div className="profile-container">
      <i onClick={() => navigate(-1)} class="fa-solid fa-arrow-left"></i>

      <div className="profile-card">
        {" "}
        <h1>Shop Profile</h1>
        <img
          src={user?.profilepic ? user.profilepic : ""}
          alt="Profile"
          className="profile-img"
        />
        <h2>{user.name}</h2>
        <p>
          {" "}
          <b>Owner</b>:{user.owner}{" "}
        </p>
        <p>
          <b>Email:</b> {user.email}
        </p>
        <p>
          <b>Location:</b> {user.location}
        </p>
        <p>
          <b>Mobile:</b> {user.phone}
        </p>
        <div className="btn-group">
          <button onClick={() => navigate("/edit-shop")} className="edit">
            Edit
          </button>
          <button onClick={() => navigate("/shop-products")} className="home">
            Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopProfile;
