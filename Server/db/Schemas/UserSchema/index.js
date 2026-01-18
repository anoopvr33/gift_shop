import { model, Schema } from "mongoose";
// import { type } from "os";

const UserSchema = Schema({
  profilepic: {
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
  phone: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
  },
  location: {
    type: String,
    trim: true,
  },
  block: {
    type: String,
    trim: true,
  },
});

const User = model("User", UserSchema);

export default User;
