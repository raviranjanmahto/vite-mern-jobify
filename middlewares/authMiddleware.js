const jwt = require("jsonwebtoken");

const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.protect = catchAsync(async (req, res, next) => {
  const token = req.cookies.token;

  if (!token)
    return next(new AppError("Unauthorize, Please log in to get access!", 401));

  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  const currentUser = await User.findById(decoded.uuid);
  if (!currentUser)
    return next(
      new AppError(
        "The user belonging to this token does no longer exist!",
        401
      )
    );
  req.user = currentUser;
  next();
});

exports.testUser = (req, res, next) => {
  if (req.user._id.toString() === "651186b2dac488877512d62d")
    return next(new AppError("Test user Read only!..."));

  next();
};
