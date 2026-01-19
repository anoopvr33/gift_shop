import express from "express";
import UserRouter from "./UserRouter/index.js";
import ProductRouter from "./ProductRouter/index.js";
import ImageRouter from "./ImageRouter/index.js";
// import DeliverRouter from "./DeliveryRouter/index.js";
// import FavoriteRouter from "./FavoriteRouter/index.js";
import SoldRouter from "./SoldRouter/index.js";
// import NotifyRouter from "./NotifyRouter/index.js";
import payment from "./PaymentRouter/index.js";
import CartRouter from "./CartRouter/index.js";
import ShopROuter from "./ShopRouter/index.js";
import AdminRouter from "./AdminRouter/index.js";
import ComplaintRouter from "./ComplaintRouter/index.js";
import FeedbackRouter from "./FeedbackRouter/index.js";

const router = express.Router();

router.use("/user", UserRouter);
router.use("/shop", ShopROuter);
router.use("/admin", AdminRouter);
router.use("/product", ProductRouter);
router.use("/image", ImageRouter);
router.use("/complaint", ComplaintRouter);
router.use("/feedback", FeedbackRouter);
// router.use("/delivery", DeliverRouter);
// router.use("/favorite", FavoriteRouter);
router.use("/cart", CartRouter);
router.use("/sold", SoldRouter);
// router.use("/notify", NotifyRouter);
router.use("/api/v1", payment);

export default router;
