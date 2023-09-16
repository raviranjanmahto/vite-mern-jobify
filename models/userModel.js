const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    fName: {
      type: String,
      trim: true,
      required: [true, "Please tell us your first name!"],
    },
    lName: {
      type: String,
      trim: true,
      default: "N/A",
    },
    email: {
      type: String,
      required: [true, "Please tell us your email"],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address",
      ],
    },
    password: {
      type: String,
      minlength: [6, "Password must be at least 6 character"],
      required: [true, "Password is required!"],
      select: false,
    },
    location: {
      type: String,
      default: "N/A",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  // Only run this function when password is actually modified!
  if (!this.isModified("password")) return next();

  // Hash the password with cost of 11
  this.password = await bcrypt.hash(this.password, 11);
  next();
});

userSchema.methods.correctPassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
