import React, { useState } from "react";
import "../css/pages/userComplaint.css";
import Header from "../components/header";
import { AddComplaint } from "../Hooks/complaint";
import { useNavigate } from "react-router-dom";

const ComplaintPage = () => {
  const [complaint, setComplaint] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!complaint.trim()) {
      alert("Please enter your complaint");
      return;
    }

    console.log("Complaint Submitted:", complaint);
    // alert("Complaint submitted successfully");
    AddComplaint(complaint);
  };

  return (
    <div className="complaint-container">
      {/* <Header></Header> */}

      <h1 className="complaint-title">Message to Admin</h1>

      {/* Service Center Card */}

      {/* Complaint Form */}
      <form className="complaint-form" onSubmit={handleSubmit}>
        <label>Your Message</label>
        <textarea
          placeholder="Enter your complaint here..."
          value={complaint}
          onChange={(e) => setComplaint(e.target.value)}
        ></textarea>
        <button style={{ backgroundColor: "blue" }} type="submit">
          Send Message
        </button>{" "}
        <br />
        <button
          style={{ backgroundColor: "rgba(128, 174, 255, 1)" }}
          onClick={() => navigate("/home")}
          type="button"
        >
          Back to home
        </button>
      </form>
    </div>
  );
};

export default ComplaintPage;
