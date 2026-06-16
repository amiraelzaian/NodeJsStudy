const express = require("express");

const app = express();
// middleware called body parser
app.use(express.json());
const coursesRouter = require("./routes/courses.route");
app.use("/api/courses", coursesRouter);

app.listen(5000, () => {
  console.log("listening on port 5000");
});
