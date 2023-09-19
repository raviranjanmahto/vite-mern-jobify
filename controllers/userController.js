const Job = require("../models/jobModel");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");

exports.getCurrentUser = catchAsync(async (req, res) => {
  res.status(200).json({ status: "success", user: req.user });
});

exports.updateUser = catchAsync(async (req, res) => {
  const { fName, lName, location } = req.body;
  if (fName) req.user.fName = fName;
  if (lName) req.user.lName = lName;
  if (location) req.user.location = location;
  await req.user.save();
  res.status(200).json({ status: "success" });
});

exports.applicationStats = catchAsync(async (req, res, next) => {
  const users = await User.countDocuments();
  const jobs = await Job.countDocuments();
  res.status(200).json({ status: "success", users, jobs });
});
