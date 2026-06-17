require("dotenv").config();
const express = require("express");

const app = express();

const mongoose = require("mongoose");

const url = process.env.MONGO_URL;
mongoose
  .connect(url)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error(err);
  });

// middleware called body parser
app.use(express.json());
const coursesRouter = require("./routes/courses.route");
app.use("/api/courses", coursesRouter);

app.listen(process.env.PORT, () => {
  console.log("listening on port 5000");
});
