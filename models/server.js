import mongoose from "mongoose";
export default mongoose.model(
  "servers",
  new mongoose.Schema({
    _id: { type: String, require: true, unique: true },
    prefijo: { type: String, default: "p!" },
    premium: { type: Boolean, default: false },
  })
);
