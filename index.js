const express = require("express");

const app = express();

const mongoose = require("mongoose");

const url =
  "mongodb+srv://amiraalzaian247_db_user:V0P01yY2bpJDRW8K@learn-nodejs.bj16x4o.mongodb.net/learn_nodejs?appName=learn-nodejs";
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

app.listen(5000, () => {
  console.log("listening on port 5000");
});
