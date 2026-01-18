import Product from "../../db/Schemas/ProductSchema/index.js";
import User from "../../db/Schemas/UserSchema/index.js";
import Sold from "../../db/Schemas/SoldSchema/index.js";
import express from "express";
import CheckToken from "../../middleware/checkToken.js";

const router = express.Router();

router.post("/post", async (req, res) => {
  try {
    const body = { ...req.body };
    const cart = await Sold.create(body);

    res
      .status(201)
      .json({ message: "Product created successfully", product: cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get cart products by user id
router.get("/get/my/:id", CheckToken("USER"), async (req, res) => {
  const { id } = req.params;
  // const userid = await User.findById(id);

  const product = await Sold.find({ customer: id }).populate([
    "product",
    "customer",
  ]);
  res.json({ success: "success", orders: product });
});

router.get("/get/shop/:id", CheckToken("SELLER"), async (req, res) => {
  const { id } = req.params;
  // const userid = await User.findById(id);

  const product = await Sold.find({ seller: id }).populate([
    "product",
    "customer",
  ]);
  res.json({ success: "success", orders: product });
});

router.get("/get-one/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Sold.findById(id);
  res.json(product);
});
router.get("/get-all", async (req, res) => {
  // const { id } = req.params;
  const product = await Sold.find().populate(["customer", "product"]);
  res.json({ success: "success", orders: product });
});

router.patch("/update/:id", async (req, res) => {
  const { id } = req.params;
  const body = { ...req.body };
  const product = await Sold.findByIdAndUpdate(
    id,
    { $set: { status: body.status } },
    { new: true }
  );
  res.json({ success: "updated", result: product });
});

export default router;
