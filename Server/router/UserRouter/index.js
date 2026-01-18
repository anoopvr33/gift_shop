import User from "../../db/Schemas/UserSchema/index.js";
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { error } from "node:console";
import CheckToken from "../../middleware/checkToken.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const body = { ...req.body };

  const findEmail = await User.findOne({ email: body.email });

  if (findEmail) {
    return res.json({ error: "email already taken" });
  }

  const hashedpassword = await bcrypt.hash(body.password, 3);
  body.password = hashedpassword;

  const userData = await User.create(body);
  if (userData) {
    return res.status(200).json({ success: "successfully signup" });
  }
});

router.post("/login", async (req, res) => {
  const body = { ...req.body };

  const userlog = await User.findOne({ email: body.email });
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
      role: "USER",
    },
    process.env.SECRET_KEY,
    { expiresIn: "7d" }
  );
  return res.json({ success: "successfully login", token: token });
});

router.get("/get/:id", CheckToken("USER"), async (req, res) => {
  const { id } = req.params;
  const userData = await User.findById(id);
  return res.json({ success: "success", myuser: userData });
});

router.get("/get", CheckToken("ADMIN"), async (req, res) => {
  const { id } = req.params;
  const userData = await User.find();
  return res.json({ success: "success", alluser: userData });
});

router.patch("/update/:id", CheckToken(["USER", "ADMIN"]), async (req, res) => {
  const { id } = req.params;
  const body = { ...req.body };
  const product = await User.findByIdAndUpdate(id, body);
  res.json({ success: "updated", result: product });
});

export default router;
