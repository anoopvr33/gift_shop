import { model, Schema } from "mongoose";

const AdminSchema = Schema({
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
});

const Admin = model("Admin", AdminSchema);

export default Admin;
