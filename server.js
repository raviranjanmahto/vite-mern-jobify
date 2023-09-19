const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const AppError = require("./utils/appError");
const errorGlobalMiddleware = require("./middlewares/errorMiddleware");
const authRoutes = require("./routes/userRoutes");
const jobRouter = require("./routes/jobRoutes");

const app = express();
app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

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
