import { useEffect, useState } from "react";
import "../css/Admin/feedback.css";
import Sidebar from "../components/sideBar";
import {
  DeleteComplaint,
  GetAllComplaint,
  GetAllShopComplaint,
} from "../Hooks/complaint";

const UserComplaintList = () => {
  const [feedbacks, setUsers] = useState([]);
  const [shops, setShops] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      const users = await GetAllComplaint();
      const shopData = await GetAllShopComplaint();

      console.log("all user complaint", users);

      setUsers(users);
      setShops(shopData);
    };

    fetchProduct();
  }, []);

  return (
    <div className="feedback-list-container">
      <Sidebar></Sidebar>

      <h1>User Complaint</h1>

      <div className="feedback-cards">
        <div className="user-msg">
          <h2>user message</h2>
          {feedbacks.length === 0
            ? "No Complaints Found"
            : feedbacks.map((item) => (
                <div className="feedback-card" key={item._id}>
                  <div className="feedback-header">
                    <span className="email">{item.customer.email}</span>
                    <span className="email">{item.customer.name}</span>
                    <span className="stars">
                      {"★".repeat(item.rating)}
                      {"☆".repeat(5 - item.rating)}
                    </span>
                  </div>

                  <p className="message">{item.complaint}</p>

                  <button
                    className="delete"
                    onClick={() => DeleteComplaint(item._id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
          <h2>Shop Message</h2>
          {shops.length === 0
            ? "No Complaints Found"
            : shops.map((item) => (
                <div className="feedback-card" key={item._id}>
                  <div className="feedback-header">
                    <span className="email">{item.seller.email}</span>
                    <span className="email">{item.seller.name}</span>
                    <span className="stars">
                      {"★".repeat(item.rating)}
                      {"☆".repeat(5 - item.rating)}
                    </span>
                  </div>

                  <p className="message">{item.complaint}</p>

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
    </div>
  );
};

export default UserComplaintList;
