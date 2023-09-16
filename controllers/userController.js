const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.signup = catchAsync(async (req, res, next) => {
  const { email, fName, lName, password, location } = req.body;
  const exUser = await User.findOne({ email });
  if (exUser)
    return next(new AppError("Email already in use, Please login.", 400));

  if (!email || !fName || !password)
    return next(new AppError("All fields are required!"));
  const user = await User.create({ email, fName, password });
  user.password = undefined;
  res.status(201).json({ status: "success", user });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new AppError("All fields are required!"));
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.correctPassword(password)))
    return next(new AppError("Invalid email or password!", 401));
  user.password = undefined;

  res.status(200).json({ status: "success", user });
});
