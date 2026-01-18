// import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../css/pages/userProfile.css";
import { useEffect, useState } from "react";
import { GetUser } from "../Hooks/userHook";
import { getId } from "../utils";

const UserProfile = () => {
  const [user, setData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      const data = await GetUser(getId());

      console.log("Shop profile", data);
      setData(data);
    };

    fetchEmployees();
  }, []);

  return (
    <div className="profile-container">
      <i onClick={() => navigate(-1)} class="fa-solid fa-arrow-left"></i>

      <div className="profile-card">
        <h2>User Profile</h2>
        <img src={user.profilepic} alt="Profile" className="profile-img" />

        <h2>Name:{user.name}</h2>
        <p>
          <b>Email:</b> {user.email}
        </p>
        <p>{/* <b>Location:</b> {user.location} */}</p>
        <p>
          <b>Mobile:</b> {user.phone}
        </p>
        <p>
          <b>Location:</b> {user.location}
        </p>

        <div className="btn-group">
          <button onClick={() => navigate("/edit-profile")} className="edit">
            Edit
          </button>
          <button onClick={() => navigate("/user_products")} className="home">
            Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
