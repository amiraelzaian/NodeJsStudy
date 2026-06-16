const { body } = require("express-validator");
const express = require("express");
const router = express.router();
const coursesController = require("./controllers/courses.controller");
const validationSchema = require("../middlewares/validationSchema");
router
  .route("/")
  .get(coursesController.getAllCourses)
  .post(validationSchema(), coursesController.addCourse);

router
  .route("/:courseId")
  .get(coursesController.getCourse)
  .patch("/:courseId", coursesController.updateCourse)
  .delete("/:courseId", coursesController.deleteCourse);

module.exports = router;
