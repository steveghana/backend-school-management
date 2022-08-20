import crypto from "crypto";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const StaffSchema = new mongoose.Schema({
  employee_id: {
    type: string,
  },
  firstname: {
    type: String,
    required: [true, "Please provide username"],
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Please provide email address"],
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: 6,
    select: false,
  },
  role: {
    type: string,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

const Sections = new mongoose.Schema({});

const schoolDetailsSchema = new mongoose.Schema({
  name: { type: string, required: true },
  address: { type: string, required: true },
  phone_number: { type: string, required: true },
  email: {
    type: String,
    required: [true, "Please provide email address"],
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
  },
  logo_small: { type: string },
  logo_long: { type: string },
  created_by: { type: string, required: true },
  access_code: { type: string, required: true },
  created_at: { default: new Date() },

  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

StaffSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

StaffSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

StaffSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.SECRET, {
    expiresIn: "2hrs",
  });
};

StaffSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hash token (private key) and save to database
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Set token expire date
  this.resetPasswordExpire = Date.now() + 10 * (60 * 1000); // Ten Minutes

  return resetToken;
};

const Staff = mongoose.model("User", StaffSchema);
const School = mongoose.model("School", schoolDetailsSchema);

export { Staff, School };
