import { useState } from "react";
import "../css/pages/userFeedback.css";
import Header from "../components/header";
import { useNavigate } from "react-router-dom";
import { AddFeedback } from "../Hooks/feedback";

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const submitFeedback = () => {
    if (!rating || !message.trim()) {
      alert("Please give rating and feedback");
      return;
    }

    console.log({
      rating,
      message,
    });

    AddFeedback(message);

    alert("Thank you for your feedback!");
    setRating(0);
    setMessage("");
  };

  return (
    <div className="feedback-container">
      {/* <Header></Header> */}
      <i onClick={() => navigate(-1)} class="fa-solid fa-arrow-left"></i>

      <h1>Feedback</h1>

      {/* Rating */}
      <div className="stars">
        {[1, 2, 3, 4, 5].map((num) => (
          <span
            key={num}
            className={rating >= num ? "active" : ""}
            onClick={() => setRating(num)}
          >
            ★
          </span>
        ))}
      </div>

      {/* Message */}
      <textarea
        placeholder="Write your feedback..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      {/* Submit */}
      <button onClick={submitFeedback}>Submit</button>
    </div>
  );
};

export default Feedback;
