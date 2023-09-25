const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const sharp = require("sharp");
const fs = require("fs/promises");

const Job = require("../models/jobModel");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// IMAGE UPLOAD USING MULTER
// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/uploads");
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split("/")[1];
//     cb(null, `user-${req.user._id}-${Date.now()}.${ext}`);
//   },
// });
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserAvatar = upload.single("avatar");

exports.resizeUserAvatar = (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user._id}-${Date.now()}.jpeg`;

  sharp(req.file.buffer)
    .resize(400, 400)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/uploads/${req.file.filename}`);

  req.file.path = `public\\uploads\\${req.file.filename}`;

  next();
};

exports.getCurrentUser = catchAsync(async (req, res) => {
  res.status(200).json({ status: "success", user: req.user });
});

exports.updateUser = catchAsync(async (req, res) => {
  const { fName, lName, location, avatar, avatarPublicId } = req.body;
  if (fName) req.user.fName = fName;
  if (lName) req.user.lName = lName;
  if (location) req.user.location = location;

  if (req.file && req.user.avatarPublicId)
    await cloudinary.uploader.destroy(req.user.avatarPublicId);

  if (req.file) {
    const res = await cloudinary.uploader.upload(req.file.path);
    await fs.unlink(req.file.path);

    req.user.avatar = res.secure_url;
    req.user.avatarPublicId = res.public_id;
  }

  await req.user.save();

  res.status(200).json({ status: "success" });
});

exports.applicationStats = catchAsync(async (req, res, next) => {
  const users = await User.countDocuments();
  const jobs = await Job.countDocuments();
  res.status(200).json({ status: "success", users, jobs });
});
