import { model, Schema } from "mongoose";

// userid,userproof,image,productname,price,brand,description,color

const ProductSchema = Schema({
  seller: {
    type: Schema.Types.ObjectId,
    ref: "Seller",
  },

  image: {
    type: String,
  },
  category: {
    type: String,
  },
  productname: {
    type: String,
  },
  price: {
    type: String,
  },
  description: {
    type: String,
  },
  location: {
    type: String,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
});

const Product = model("Product", ProductSchema);

export default Product;
