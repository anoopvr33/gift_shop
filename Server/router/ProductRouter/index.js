import Product from "../../db/Schemas/ProductSchema/index.js";
import User from "../../db/Schemas/UserSchema/index.js";
import express from "express";
import CheckToken from "../../middleware/checkToken.js";

const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    const body = { ...req.body };
    const product = await Product.create(body);

    return res
      .status(201)
      .json({ success: "Product created successfully", product: product });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.get("/get/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const userid = await User.findById(id);
    const product = await Product.find({ user: userid._id });
    res.json({ success: "successfully ", product: product });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.post("/get/filter", async (req, res) => {
  const body = { ...req.body };
  // console.log("arrrrrarararar", body.price, body.brand);

  const prefix = body.productname.trim(); // e.g. "ap" or "app"

  const product = await Product.find({
    productname: { $regex: `^${prefix}`, $options: "i" },
  }).populate("seller");

  if (!product) {
    return res.json({ error: "success" });
  }
  return res.json({ success: "success", allproduct: product });
  // -------------------------------------------------------------
});
router.post("/get/filter/:id", async (req, res) => {
  const { id } = req.params;
  const body = { ...req.body };
  // console.log("arrrrrarararar", body.price, body.brand);

  const prefix = body.productname.trim(); // e.g. "ap" or "app"

  const product = await Product.find({
    seller: id,
    productname: { $regex: `^${prefix}`, $options: "i" },
  }).populate("seller");

  if (!product) {
    return res.json({ error: "success" });
  }
  return res.json({ success: "success", allproduct: product });
  // -------------------------------------------------------------
});

router.get("/get", async (req, res) => {
  const product = await Product.find().populate(["seller"]);
  return res.json({ success: "success", allproduct: product });
});
router.get("/get/my/:id", CheckToken(["SELLER", "USER"]), async (req, res) => {
  const { id } = req.params;
  const MyPro = await Product.find({ seller: id }).populate("seller");

  // const product = await Product.find().populate(["seller"]);
  return res.json({ success: "success", allproduct: MyPro });
});

router.get("/get-one/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  return res.json({ success: "success", allproduct: product });
});

router.delete("/delete-one/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);
  res.json({ message: "deleted", result: product });
});

router.patch("/update/:id", CheckToken("SELLER"), async (req, res) => {
  const { id } = req.params;
  const body = { ...req.body };
  const product = await Product.findByIdAndUpdate(id, body);
  res.json({ success: "updated", result: product });
});

export default router;
