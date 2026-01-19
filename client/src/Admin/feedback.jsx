import { useEffect, useState } from "react";
import "../css/Admin/feedback.css";
import Sidebar from "../components/sideBar";
import { DeleteFeedback, GetAllFeedback } from "../Hooks/feedback";

const FeedbackList = () => {
  const [feedbacks, setUsers] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      const users = await GetAllFeedback();

      console.log("all feedback", users);
      setUsers(users);
    };

    fetchProduct();
  }, []);
  return (
    <div className="feedback-list-container">
      <Sidebar></Sidebar>

      <h1>User Feedback</h1>

      <div className="feedback-cards">
        {feedbacks.length === 0 ? (
          <p>No feedbacks</p>
        ) : (
          feedbacks.map((item) => (
            <div className="feedback-card" key={item._id}>
              <div className="feedback-header">
                <span className="email">Email : {item?.customer?.email}</span>{" "}
                <br />
                <span className="email">Name : {item?.customer?.name}</span>
                <span className="stars">
                  {"★".repeat(item.rating)}

                  {"☆".repeat(5 - item.rating)}
                </span>
              </div>

              <p className="message">Feedback: {item.feedback}</p>

              <button
                className="delete"
                onClick={() => DeleteFeedback(item._id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FeedbackList;
