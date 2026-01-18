import Product from "../../db/Schemas/ProductSchema/index.js";
import User from "../../db/Schemas/UserSchema/index.js";
import Cart from "../../db/Schemas/CartSchema/index.js";
import express from "express";
import CheckToken from "../../middleware/checkToken.js";

const router = express.Router();

router.post("/post", async (req, res) => {
  try {
    const body = { ...req.body };
    const cart = await Cart.create(body);
    res
      .status(201)
      .json({ success: "Product created successfully", product: cart });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// get cart products by user id
router.get("/get/:id", CheckToken("USER"), async (req, res) => {
  const { id } = req.params;
  // const userid = await User.findById(id);

  const product = await Cart.find({ customer: id }).populate([
    "product",
    "customer",
  ]);
  res.json({ success: "success", allcart: product });
});

router.get("/get-one/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Cart.findById(id);
  res.json(product);
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Cart.findByIdAndDelete(id);
  res.json({ success: "deleted", result: product });
});
router.delete("/delete/many/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Cart.deleteMany({ customer: id });
  res.json({ success: "deleted", result: product });
});

router.patch("/update/:id", async (req, res) => {
  const { id } = req.params;
  const body = { ...req.body };
  console.log("quaanty", body.quantity);
  const product = await Cart.findByIdAndUpdate(
    id,
    { $set: { quantity: body.quantity } },
    { new: true }
  );
  res.json({ success: "updated", result: product });
});

export default router;
