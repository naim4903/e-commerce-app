import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const { Schema, model } = mongoose;

const addressSchema = new Schema({
  houseNumber: { type: String },
  city: { type: String },
  country: { type: String }
});

const userSchema = new Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
    min: [6, "Password is too short"],
  },
  phoneNumber: {
    type: Number,
    min: [10, "Number is not valid"],
    max: [12, "Number is not valid"],
  },
  addresses: { type: [addressSchema], default: [] }
});

// Hash password before saving the user document
userSchema.pre("save", async function (next) {
  let user = this;

  if (!user.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);

    user.password = hashedPassword;
    next();
  } catch (error) {
    next(error); // Pass error to the next middleware
  }
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error("Error comparing passwords");
  }
};

// Generate JWT token method
userSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id, email: this.email }, process.env.PRIVATE_KEY, {
    expiresIn: "1h" // Optional: Set an expiration time for the token
  });
};

const User = model("User", userSchema);

export default User;
