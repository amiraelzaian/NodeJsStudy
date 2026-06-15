const express = require("express");
const app = express();
const courses = [
  {
    id: 1,
    title: "js course",
    price: 1000,
  },
  {
    id: 2,
    title: "react course",
    price: 800,
  },
];
//get all courses
app.get("/api/courses", (req, res) => {
  res.json(courses);
});
// get single course
app.get("/api/courses/:courseId", (req, res) => {
  const courseId = +req.params.courseId;
  const course = courses.find((c) => c.id === courseId);
  if (!course) {
    return res.status(404).json({ msg: "not found" });
  }
  res.json(course);
});
// create new course

app.post("/api/courses/", (req, res) => {
  res.json();
});

app.listen(5000, () => {
  console.log("listening on port 5000");
});
