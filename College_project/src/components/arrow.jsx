import React from "react";
import { useNavigate } from "react-router-dom";

const Arrow = () => {
  const navigate = useNavigate();

  return <i onClick={() => navigate(-1)} class="fa-solid fa-arrow-left"></i>;
};

export default Arrow;
