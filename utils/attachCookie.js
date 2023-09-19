const jwt = require("jsonwebtoken");
const catchAsync = require("./catchAsync");

exports.attachCookie = catchAsync(async (res, user, statusCode) => {
  const token = jwt.sign({ uuid: user._id }, process.env.SECRET_KEY, {
    expiresIn: "30d",
  });
  await res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
  res.status(statusCode).json({
    status: "success",
  });
});
