import { model, Schema } from "mongoose";
import { type } from "os";

// userid,userproof,image,productname,price,brand,description,color

const ComplaintSchema = Schema({
  customer: {
    type: Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref: "Seller",
    default: null,
  },
  complaint: {
    type: String,
  },
});

const Complaint = model("Complaint", ComplaintSchema);

export default Complaint;
