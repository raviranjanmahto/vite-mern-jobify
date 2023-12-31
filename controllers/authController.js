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
  const user = await User.create({ email, fName, lName, location, password });
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

exports.logout = catchAsync(async (req, res) => {
  await res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
  res.status(200).json({ status: "success" });
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }
    next();
  };
};
