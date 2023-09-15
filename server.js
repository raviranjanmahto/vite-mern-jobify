const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

const app = express();
app.use(express.json());

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

mongoose
  .connect(process.env.DATABASE_URI)
  .then(() => console.log(`Database connected successful🥰💚🥰`))
  .catch(err => console.log(`ERROR🎇💣💣💣🎇=>`, err.message));

const port = process.env.PORT || 7005;
app.listen(port, () => console.log(`Server is listening on port ${port}...`));
