import express from "express";
import Feedback from "../../db/Schemas/FeedbackShema/index.js";

const router = express.Router();

router.post("/post", async (req, res) => {
  try {
    const body = { ...req.body };
    const feedback = await Feedback.create(body);

    res
      .status(201)
      .json({ success: "Product created successfully", msg: feedback });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/get", async (req, res) => {
  const data = await Feedback.find().populate(["customer"]);
  res
    .status(201)
    .json({ success: "Product created successfully", alldata: data });
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  const feed = await Feedback.findByIdAndDelete(id);
  res.json({ success: "deleted", result: feed });
});
export default router;
