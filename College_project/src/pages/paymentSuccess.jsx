import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/pages/paymentSuccess.css";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  const reference = query.get("reference");

  return (
    <div className="payment-success-container">
      <div className="payment-card">
        <div className="success-icon">✓</div>

        <h1>Payment Successful</h1>
        <p>Your payment has been processed successfully.</p>

        {reference && (
          <div className="reference-box">
            <span>Reference ID</span>
            <strong>{reference}</strong>
          </div>
        )}

        <button className="success-btn" onClick={() => navigate("/home")}>
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
