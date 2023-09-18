const Job = require("../models/jobModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.createJob = catchAsync(async (req, res, next) => {
  const { company, position } = req.body;
  if (!company || !position)
    return next(new AppError("All fields are required!", 400));
  const job = await Job.create({ company, position });
  res.status(201).json({ status: "success", job });
});

exports.getJob = catchAsync(async (req, res, next) => {
  const job = await Job.findById({ _id: req.params.id });
  if (!job) return next(new AppError(`No Job found with id ${req.params.id}`));
  res.status(200).json({ status: "success", job });
});

exports.getAllJob = catchAsync(async (req, res, next) => {
  const jobs = await Job.find();
  if (jobs.length < 1) return next(new AppError("No Jobs found", 404));

  res.status(200).json({ status: "success", jobs });
});

exports.UpdateJob = catchAsync(async (req, res, next) => {
  const { company, position } = req.body;

  const job = await Job.findById({ _id: req.params.id });
  if (!job) return next(new AppError(`No Job found with id ${req.params.id}`));

  if (company) job.company = company;
  if (position) job.position = position;
  await job.save();

  res.status(200).json({ status: "success", job });
});

exports.deleteJob = catchAsync(async (req, res, next) => {
  const job = await Job.findByIdAndDelete({ _id: req.params.id });
  if (!job)
    return next(new AppError(`No Job found with id ${req.params.id}`, 404));
  res.status(200).json({ status: "success" });
});
