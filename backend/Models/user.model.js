import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
    unique: true,
    min: [6, "Password is too short"],
  },
  phoneNumber: {
    type: Number,
    min: [10, "Number is not valid"],
    max: [12, "Number is not valid"],
  },
});

const User = model("User", userSchema);

export default User;
