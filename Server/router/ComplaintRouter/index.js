import express from "express";
import Complaint from "../../db/Schemas/complaintSchema/index.js";

const router = express.Router();

router.post("/post", async (req, res) => {
  try {
    const body = { ...req.body };
    const complaint = await Complaint.create(body);

    res
      .status(201)
      .json({ success: "Product created successfully", msg: complaint });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/cus/get/", async (req, res) => {
  const complaints = await Complaint.find({
    customer: { $ne: null },
    seller: null,
  }).populate("customer");
  res.status(201).json({ success: "got complaints", alldata: complaints });
});

router.get("/sel/get", async (req, res) => {
  const complaints = await Complaint.find({
    customer: null,
    seller: { $ne: null },
  }).populate("seller");
  res.status(201).json({ success: "got complaints", alldata: complaints });
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Complaint.findByIdAndDelete(id);
  res.json({ success: "deleted", result: product });
});
export default router;
