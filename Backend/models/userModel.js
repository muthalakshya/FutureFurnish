import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userType: { type: String, required: true, enum: ["customer", "consultant", "industry"] },

    // Common Fields
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true },

    // Customer Fields
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zipCode: { type: String },
      additionalDetails: { type: String },
    },

    // Consultant Fields
    expertise: [{ type: String }], // List of expertise
    yearsOfExperience: { type: Number },
    linkedInProfile: { type: String },
    introduction: { type: String },
    resume: { type: String }, // Path to the uploaded resume file

    // Industry Fields
    // businessOwner: {
    //   firstName: { type: String },
    //   lastName: { type: String },
    // },
    businessName: { type: String },
    businessType: { type: String },
    addressDetails: {
      addressLine1: { type: String },
      addressLine2: { type: String },
      city: { type: String },
      state: { type: String },
      postalCode: { type: String },
    },
    additionalInfo: { type: String },
    message: { type: String },

    cartData: { type: Object, default: {} }
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);

export default UserModel;
