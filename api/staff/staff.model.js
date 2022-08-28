import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const emailREGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const StaffSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    default: "Not provided",
    required: true,
  },
  firstName: {
    type: String,
    default: "Not provided",
    required: [true, "Please provide firstname"],
  },
  middleName: {
    type: String,
    default: "Not provided",
  },
  lastName: {
    type: String,
    default: "Not provided",
  },
  ClassAssigned: {
    type: String,
    default: "Not provided",
  },
  email: {
    type: String,
    default: "Not provided",
    required: [true, "Please provide email address"],
    unique: true,
    match: [emailREGEX, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: 6,
  },
  role: {
    type: String,
    default: "Not provided",
    required: [true, "Enter a role"],
  },
  ClassAssigned: {
    type: String,
    default: "Not provided",
    required: [true, "Enter a role"],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  fathers_Name: {
    type: String,
    default: "Not provided",
  },
  mothers_Name: {
    type: String,

    default: "Not provided",
  },
  qualification: {
    type: String,
    default: "Not provided",
  },
  work_experience: {
    type: Number,
  },
  contact_Number: {
    type: Number,
    required: true,
    minlength: 10,
  },
  Emergency_Contact_Name: {
    type: String,
    default: "Not provided",
  },
  emergency_Contact_Number: {
    type: Number,
    minlength: 10,
  },
  Next_of_Kin: {
    type: String,
    default: "Not provided",
  },
  Next_of_Kin_Contact_Number: {
    type: Number,
    minlength: 10,
  },
  Date_of_Birth: {
    type: String,
    default: "Not provided",
  },
  marital_Status: {
    type: String,
    default: "Not provided",
  },
  Date_of_Joining: {
    type: String,
    default: "Not provided",
  },
  Date_of_Leaving: {
    type: String,
    default: "Not provided",
  },
  Local_Address: {
    type: String,
    default: "Not provided",
    required: [true, "Provide an address"],
  },
  Permanent_Address: {
    type: String,
    default: "Not provided",
  },
  Note: {
    type: String,
    default: "Not provided",
  },
  Image: {
    type: String,

    default: "Not provided",
  },
  Gender: {
    type: String,

    default: "Not provided",
  },
  Bank_Account_Name: {
    type: String,

    default: "Not provided",
  },
  Bank_Account_Number: {
    type: String,

    default: "Not provided",
  },
  Bank_Name: {
    type: String,
    default: "Not provided",
  },
  Bank_Branch: {
    type: String,
    default: "Not provided",
  },

  Payscale: {
    type: String,
    default: "Not provided",
  },

  Basic_Salary: {
    type: String,
    default: "Not provided",
  },
  Gross_Salary: {
    type: String,
    default: "Not provided",
  },

  Net_Salary: {
    type: String,
    default: "Not provided",
  },
  Tier_Two_Deduction: {
    type: String,
    default: "Not provided",
  },

  Contract_Type: {
    type: String,
    default: "Not provided",
  },
  SSNIT_Number: {
    type: String,
    default: "Not provided",
  },
  Facebook: {
    type: String,
    default: "Not provided",
  },
  Twitter: {
    type: String,
    default: "Not provided",
  },
  LinkedIn: {
    type: String,
    default: "Not provided",
  },
  Instagram: {
    type: String,
    default: "Not provided",
  },
  Resume: {
    type: String,
    default: "Not provided",
  },
  Joining_Letter: {
    type: String,
    default: "Not provided",
  },
  Resignation_Letter: {
    type: String,
    default: "Not provided",
  },
  Other_Document: {
    type: String,
    default: "Not provided",
  },
  created_At: {
    type: Date,
    default: Date.now(),
  },
  updated_At: {
    type: Date,
    default: Date.now(),
  },
  created_By: {
    type: String,
    required: [true, "Name required"],
  },
  updated_By: {
    type: String,
  },
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
export const Staff = mongoose.model("User", StaffSchema);
