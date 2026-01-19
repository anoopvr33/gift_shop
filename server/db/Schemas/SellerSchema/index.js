import { model, Schema } from "mongoose";
// import { type } from "node:os";
// import { type } from "node:os";
// import { type } from "os";

const SellerSchema = Schema({
  profilepic: {
    type: String,
    trim: true,
  },
  owner: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    trim: true,
  },
  approve: {
    type: String,
    trim: true,
  },
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  location: {
    type: String,
  },
  phone: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
  },
});

const Seller = model("Seller", SellerSchema);

export default Seller;
