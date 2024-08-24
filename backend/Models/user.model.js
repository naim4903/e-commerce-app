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

// Hash password
userSchema.pre("save", async function (next) {
  let user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) {
    return next();
  }

  try {
    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(user.password, salt)

    user.password = hashedPassword;

    next();
  } catch (error) {
    console.log("Bcrypt error: ", error.message)
  }

})

userSchema.methods.comparePassword = async function (candidatePassword, cb) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id, email: this.email }, process.env.PRIVATE_KEY);
};


const User = model("User", userSchema);

export default User;
