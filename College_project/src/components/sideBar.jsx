import { useNavigate } from "react-router-dom";
import "../css/components/sideBar.css";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <h2 className="logo">MyApp</h2>

      <ul className="menu">
        <li onClick={() => navigate("/admin-dashboard")}>Dashboard</li>
        <li onClick={() => navigate("/admin-userlist")}>Users</li>
        <li onClick={() => navigate("/admin-shoplist")}>Shops</li>
        <li onClick={() => navigate("/admin-feedbacklist")}>Feedbacks</li>
        <li onClick={() => navigate("/admin-user-enquiry")}>
          User/Shop Enquires
        </li>
        <li onClick={() => navigate("/admin-products")}>Products</li>
        <li onClick={() => navigate("/")} className="logout">
          Logout
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
