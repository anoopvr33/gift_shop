import { model, Schema } from "mongoose";
import { type } from "os";

// userid,userproof,image,productname,price,brand,description,color

const FeedbackSchema = Schema({
  customer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  feedback: {
    type: String,
  },
});

const Feedback = model("Feedback", FeedbackSchema);

export default Feedback;
