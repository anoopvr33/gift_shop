import express from "express";
import {
  getKey,
  processPayment,
  // paymentVerification,
  CartPaymentVerification,
  // CreateSubscription,
  // GetSubscribe,
  // DeleteSubscriber,
} from "../../controllers/productControllers.js";

const router = express.Router();

router.post("/payment/process", processPayment);
router.get("/getkey", getKey);
// router.post("/paymentVerification/:id/:customer/:seller", paymentVerification);
router.post("/paymentVerification/:customer", CartPaymentVerification);
// router.post("/subscriber/:id", CreateSubscription);
// router.get("/get/subscriber/:id", GetSubscribe);
// router.delete("/delete/subscriber/:id", DeleteSubscriber);

export default router;
