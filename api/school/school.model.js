import mongoose from "mongoose";
const emailREGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const SectionsSchema = new mongoose.Schema({
  section: { type: String, required: [true, "Enter the section name"] },
  created_by: { type: String, required: true },
  newSection: { type: String },
  updatedBy: { type: String },
  updatedAt: { type: String },
  oldSection: { type: String },
});

const ClassSchema = new mongoose.Schema({
  class: { type: String, required: [true, "Enter a class Name"] },
  created_by: { type: String, required: true },
});

const schoolDetailsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone_number: { type: Number, required: true, minlength: 10 },
  email: {
    type: String,
    required: [true, "Please provide email address"],
    unique: true,
    match: [emailREGEX, "Please provide a valid email"],
  },
  logo_small: { type: String },
  logo_long: { type: String },
  created_by: { type: String, required: true },
  access_code: { type: String, required: true },
  created_at: { type: Date, default: Date.now() },
});

const Section = mongoose.model("section", SectionsSchema);
const School = mongoose.model("School", schoolDetailsSchema);
const Class = mongoose.model("class", ClassSchema);
export { School, Section, Class };
