const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const path = require("path");
const cloudinary = require("cloudinary").v2;

const AppError = require("./utils/appError");
const errorGlobalMiddleware = require("./middlewares/errorMiddleware");
const authRoutes = require("./routes/userRoutes");
const jobRouter = require("./routes/jobRoutes");

const app = express();
// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

// CLOUDINARY
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

// Development logging
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

// Serving static file
app.use(express.static(path.join(__dirname, "public")));

mongoose
  .connect(process.env.DATABASE_URI)
  .then(() => console.log(`Database connected successful🥰💚🥰`))
  .catch(err => console.log(`ERROR🎇💣💣💣🎇=>`, err.message));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/jobs", jobRouter);

app.all("*", (req, res, next) =>
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404))
);

app.use(errorGlobalMiddleware);

const port = process.env.PORT || 7005;
app.listen(port, () => console.log(`Server is listening on port ${port}...`));
