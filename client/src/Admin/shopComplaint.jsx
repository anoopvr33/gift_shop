import { useEffect, useState } from "react";
import "../css/Admin/feedback.css";
import Sidebar from "../components/sideBar";
import { DeleteComplaint, GetAllShopComplaint } from "../Hooks/complaint";

const ShopComplaintList = () => {
  const [feedbacks, setUsers] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      const users = await GetAllShopComplaint();

      console.log("all shopp complaint", users);
      setUsers(users);
    };

    fetchProduct();
  }, []);

  return (
    <div className="feedback-list-container">
      <Sidebar></Sidebar>

      <h1>Shop Complaint</h1>

      <div className="feedback-cards">
        {feedbacks.length === 0
          ? "No Complaints Found"
          : feedbacks.map((item) => (
              <div className="feedback-card" key={item._id}>
                <div className="feedback-header">
                  <span className="email">{item?.seller?.email}</span>
                  <span className="stars">
                    {"★".repeat(item?.seller?.rating)}
                    {"☆".repeat(5 - item?.seller?.rating)}
                  </span>
                </div>

                <p className="message">{item?.complaint}</p>

                <button
                  className="delete"
                  onClick={() => DeleteComplaint(item._id)}
                >
                  Delete
                </button>
              </div>
            ))}
      </div>
    </div>
  );
};

export default ShopComplaintList;
