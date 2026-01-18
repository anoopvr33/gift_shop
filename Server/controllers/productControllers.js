import { instance } from "../server.js";
import crypto from "crypto";
import Sold from "../db/Schemas/SoldSchema/index.js";
import Cart from "../db/Schemas/CartSchema/index.js";

export const processPayment = async (req, res) => {
  const options = {
    amount: Number(req.body.amount * 100),
    currency: "INR",
  };

  const order = await instance.orders.create(options);

  res.status(200).json({
    message: "Payment Processed Successfully",
    order: order,
  });
};

export const getKey = (req, res) => {
  res.status(200).json({
    key: process.env.RAZORPAY_API_KEY,
  });
};

// ----------------------------------------------------------payment for purchase

// export const paymentVerification = async (req, res) => {
//   console.log(req.body);
//   const { id } = req.params;
//   const { customer } = req.params;
//   const { seller } = req.params;
//   // console.log("my details", detail.customerId);

//   const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
//     req.body;
//   const body = razorpay_order_id + "|" + razorpay_payment_id;

//   const extendedSignature = crypto
//     .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
//     .update(body.toString())
//     .digest("hex");

//   const isAuthentic = extendedSignature === razorpay_signature;
//   if (isAuthentic) {

//     return res.redirect(
//       `http://localhost:5173/payment-success?reference=${razorpay_payment_id}`
//     );
//   } else {
//     res.status(404).json({
//       message: "Payment failed",
//     });
//   }
// };

//----------------------------------------------------------cart payment

export const CartPaymentVerification = async (req, res) => {
  // console.log("my details", detail.customerId);

  // const { id } = req.params;
  // const { id } = req.params;
  const { customer } = req.params;
  // const { seller } = req.params;

  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;
  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const extendedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = extendedSignature === razorpay_signature;
  if (isAuthentic) {
    // console.log("jaaaa");
    const Carted_items = await Cart.find({ customer: customer });

    if (!Carted_items) return res.redirect(`http://localhost:5173/error`);

    console.log("cartedd", Carted_items);

    await Promise.all(
      Carted_items.map((i, index) => {
        return Sold.create({
          customer: i.customer,
          product: i.product,
          seller: i.seller,
          quantity: i.quantity,
        });
      })
    );

    return res.status(200).json({
      success: true,
      reference: razorpay_payment_id,
    });
  } else {
    res.status(404).json({
      message: "Payment failed",
    });
  }
};
