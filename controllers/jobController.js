const Job = require("../models/jobModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.createJob = catchAsync(async (req, res, next) => {
  const { company, position, jobStatus, jobTypes, jobLocation } = req.body;
  if (!company || !position)
    return next(new AppError("All fields are required!", 400));

  const job = await Job.create({
    company,
    position,
    jobStatus,
    jobTypes,
    jobLocation,
    createdBy: req.user._id,
  });
  res.status(201).json({ status: "success" });
});

exports.getJob = catchAsync(async (req, res, next) => {
  const job = await Job.findById({ _id: req.params.id });
  if (!job) return next(new AppError(`No Job found with id ${req.params.id}`));

  if (!req.user._id.equals(job.createdBy))
    return next(
      new AppError("You don't have permission to view other job!", 401)
    );

  res.status(200).json({ status: "success", job });
});

exports.getAllJob = catchAsync(async (req, res, next) => {
  const jobs = await Job.find({ createdBy: req.user._id });
  if (jobs.length < 1) return next(new AppError("No Jobs found", 404));

  res.status(200).json({ status: "success", jobs });
});

exports.UpdateJob = catchAsync(async (req, res, next) => {
  const { company, position } = req.body;

  const job = await Job.findById({ _id: req.params.id });
  if (!job) return next(new AppError(`No Job found with id ${req.params.id}`));

  if (!req.user._id.equals(job.createdBy))
    return next(
      new AppError("You don't have permission to update other job!", 401)
    );

  if (company) job.company = company;
  if (position) job.position = position;
  await job.save();

  res.status(200).json({ status: "success", job });
});

exports.deleteJob = catchAsync(async (req, res, next) => {
  const job = await Job.findByIdAndDelete({ _id: req.params.id });
  if (!job)
    return next(new AppError(`No Job found with id ${req.params.id}`, 404));

  if (!req.user._id.equals(job.createdBy))
    return next(
      new AppError("You don't have permission to delete other job!", 401)
    );

  res.status(200).json({ status: "success" });
});
