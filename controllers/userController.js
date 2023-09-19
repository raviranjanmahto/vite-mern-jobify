const User = require("../models/userModel");
const AppError = require("../utils/appError");
const { attachCookie } = require("../utils/attachCookie");
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
  attachCookie(res, user, 201);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new AppError("All fields are required!"));
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.correctPassword(password)))
    return next(new AppError("Invalid email or password!", 401));
  user.password = undefined;

  attachCookie(res, user, 200);
});
