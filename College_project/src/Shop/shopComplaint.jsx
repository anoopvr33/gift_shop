import React, { useState } from "react";
import "../css/pages/userComplaint.css";
import Header from "../components/header";
import { AddComplaint, AddShopComplaint } from "../Hooks/complaint";
import ShopHeader from "../components/shopHeader";

const ShopComplaintPage = () => {
  const [complaint, setComplaint] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!complaint.trim()) {
      alert("Please enter your complaint");
      return;
    }

    console.log("Complaint Submitted:", complaint);
    // alert("Complaint submitted successfully");
    AddShopComplaint(complaint);
  };

  return (
    <div className="complaint-container">
      <ShopHeader></ShopHeader>

      <h1 className="complaint-title"></h1>

      {/* Service Center Card */}
      <div className="service-card">
        <h3>Service Center</h3>
        <p>Need immediate assistance?</p>
        <p className="phone">📞 +91 98765 43210</p>
        <a href="tel:+919876543210" className="call-btn">
          Call Now
        </a>
      </div>

      {/* Complaint Form */}
      <form className="complaint-form" onSubmit={handleSubmit}>
        <label>Send Message to Admin</label>
        <textarea
          placeholder="Enter your complaint here..."
          value={complaint}
          onChange={(e) => setComplaint(e.target.value)}
        ></textarea>

        <button type="submit">Submit Complaint</button>
      </form>
    </div>
  );
};

export default ShopComplaintPage;
