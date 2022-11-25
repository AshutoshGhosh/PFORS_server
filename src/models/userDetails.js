var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  fullName: {
    type: String,
    default: "None",
    // trim: true
  },
  firstName: {
    type: String,
    default: null,
    trim: true
  },
  lastName: {
    type: String,
    default: null,
    trim: true
  },
  username: {
    type: String,
    default: "None",
    // trim: true,
    // unique: [true, "This username already exist!"],
  },
  password: {
    type: String,
    default: "None",
  },
  phoneNumber: {
    type: Number,
  },
  email: {
    type: String,
    unique: [true, "This Email already exist!"],
  },
  twoFactorAuthEnable: {
    type: Boolean,
    default: false,
  },
  active: {
    type: Boolean,
    default: true,
  },
  blocked: {
    type: Boolean,
    default: false,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  isPrivate: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ["Admin", "User", "Creator"],
    default: "User",
  },
  gender: {
    type: String,
    default: "None",
  },
  profilePicture: {
    type: String,
    default: "None",
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },

  addedOn: {
    type: Date,
    default: Date.now,
  },
  updatedOn: {
    type: Date,
  },
  addedBy: {
    type: String,
    default: "None",
  },
  updatedBy: {
    type: String,
    default: "None",
  },
});

var User = mongoose.model("User", UserSchema);
module.exports = User;
