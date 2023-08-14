import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  status: { type: Boolean, default: false },
  active: { type: Date, default: new Date() },
  roles: { type: [String], enum: ["user", "admin"], default: ["user"] },
});

const User = mongoose.model("User", userSchema);

export default User;
