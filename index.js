const express = require("express");
const { body, validationResult } = require("express-validator");

const app = express();
// middleware called body parser
app.use(express.json());

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
app.post(
  "/api/courses/",
  [
    body("title")
      .notEmpty()
      .withMessage("Title is required")
      .isLength({ min: 2 })
      .withMessage("Title is at least 2 charachters"),
    body("price").notEmpty().withMessage("Price is required"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }
    const course = { id: courses.length + 1, ...req.body };
    courses.push(course);
    res.status(201).json(course);
  },
);

app.listen(5000, () => {
  console.log("listening on port 5000");
});
