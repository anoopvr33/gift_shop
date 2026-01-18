import { model, Schema } from "mongoose";
import { type } from "os";

// userid,userproof,image,productname,price,brand,description,color

const CartSchema = Schema({
  customer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref: "Seller",
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

const Cart = model("Cart", CartSchema);

export default Cart;
