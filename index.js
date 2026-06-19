require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const mongoose = require("mongoose");
const httpStatusText = require("./utils/httpStatusText");

const url = process.env.MONGO_URL;
mongoose
  .connect(url)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error(err);
  });

app.use(cors()); //It's a browser security mechanism that controls whether a web page from one origin can access resources from another origin.
// middleware called body parser
app.use(express.json());
const coursesRouter = require("./routes/courses.route");
const usersRouter = require("./routes/users.route");
app.use("/api/courses", coursesRouter);
app.use("/api/users", usersRouter);

// global  middleware for not found router
app.all("/*splat", (req, res) => {
  res.status(404).json({
    status: httpStatusText.ERROR,
    message: "This resource is not available",
  });
});
// global error handler
// error is the paremeter i sent in middleware file
app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).json({
    status: error.statusText || httpStatusText.ERROR,
    message: error.message,
    code: error.statusCode || 500,
    data: null,
  });
});

app.listen(process.env.PORT, () => {
  console.log("listening on port 5000");
});
