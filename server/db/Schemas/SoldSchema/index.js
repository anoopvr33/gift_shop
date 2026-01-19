import { model, Schema } from "mongoose";
import { type } from "os";

const SoldProduct = Schema({
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
  status: {
    type: String,
    default: "pending",
  },
  quantity: {
    type: Number,
  },
});

const Sold = model("Sold", SoldProduct);

export default Sold;
