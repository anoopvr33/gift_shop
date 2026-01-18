import mongoose from "./db/db.js";
import express from "express";
import cors from "cors";
import routes from "./router/index.js";
import dotenv from "dotenv";
import http from "http";
// import InitSocket from "./socketio.js";
import Razorpay from "razorpay";
// import { processPayment } from "./controllers/productControllers.js";

dotenv.config({ path: "./.env" });

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3004;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());
app.use(routes);

// InitSocket(server);

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
  // data: "123",
});

app.get((req, res) => {
  res.json({ message: "router not found" });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
