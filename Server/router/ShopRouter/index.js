import Seller from "../../db/Schemas/SellerSchema/index.js";
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { error } from "node:console";
import CheckToken from "../../middleware/checkToken.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const body = { ...req.body };

  const findEmail = await Seller.findOne({ email: body.email });

  if (findEmail) {
    return res.json({ error: "email already taken" });
  }

  const hashedpassword = await bcrypt.hash(body.password, 3);
  body.password = hashedpassword;

  const userData = await Seller.create(body);
  if (userData) {
    return res.status(200).json({ success: "successfully signup" });
  }
  return res.status(200).json({ error: "signup failed" });
});

router.post("/login", async (req, res) => {
  const body = { ...req.body };

  const userlog = await Seller.findOne({ email: body.email });
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
      role: "SELLER",
    },
    process.env.SECRET_KEY,
    { expiresIn: "7d" }
  );
  return res.json({ success: "successfully login", token: token });
});

router.get("/get/:id", CheckToken(["SELLER", "USER"]), async (req, res) => {
  const { id } = req.params;
  const userData = await Seller.findById(id);
  return res.json({ success: "success", myshop: userData });
});
router.get("/get", async (req, res) => {
  // const { id } = req.params;
  const userData = await Seller.find();
  return res.json({ success: "success", allshop: userData });
});

router.post("/get/filter", async (req, res) => {
  const body = { ...req.body };
  console.log("arrrrrarararar", body.name);
  const prefix = body.name.trim(); // e.g. "ap" or "app"

  const shop = await Seller.find({
    name: { $regex: `^${prefix}`, $options: "i" },
  });

  if (!shop) {
    return res.json({ error: "not found" });
  }
  return res.json({ success: "success", allshop: shop });
  // -------------------------------------------------------------
});

router.patch("/update/:id", CheckToken(["SELLER", "ADMIN"]), async (req, res) => {
  const { id } = req.params;
  const body = { ...req.body };
  const product = await Seller.findByIdAndUpdate(id, body);
  res.json({ success: "updated", result: product });
});

export default router;
