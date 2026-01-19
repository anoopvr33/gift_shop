// import Admin from "../../db/Schemas/SellerSchema/index.js";
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { error } from "node:console";
import Admin from "../../db/Schemas/AdminSchema/index.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const body = { ...req.body };

  const findEmail = await Admin.findOne({ email: body.email });

  if (findEmail) {
    return res.json({ error: "email already taken" });
  }

  const hashedpassword = await bcrypt.hash(body.password, 3);
  body.password = hashedpassword;

  const userData = await Admin.create(body);
  if (userData) {
    return res.status(200).json({ success: "successfully signup" });
  }
  return res.status(200).json({ error: "signup failed" });
});

router.post("/login", async (req, res) => {
  const body = { ...req.body };

  const userlog = await Admin.findOne({ email: body.email });
  if (!userlog) {
    return res.json({ error: "Email not found" });
  }

  const isMatch = await bcrypt.compare(body.password, userlog.password);
  if (!isMatch) {
    return res.json({ error: "Incorrect email or password" });
  }

  const token = jwt.sign(
    {
      id: userlog._id,
      role: "ADMIN",
    },
    process.env.SECRET_KEY,
    { expiresIn: "7d" }
  );
  return res.json({ success: "successfully login", token: token });
});

router.get("/get/:id", async (req, res) => {
  const { id } = req.params;
  const userData = await Admin.findById(id);
  return res.json({ success: "success", myshop: userData });
});

export default router;
