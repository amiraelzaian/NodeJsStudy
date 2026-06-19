const { body } = require("express-validator");
const express = require("express");
const router = express.Router();
const coursesController = require("../controllers/courses.controller");
const validationSchema = require("../middlewares/validationSchema");
const verifyToken = require("../middlewares/verifyToken");
router
  .route("/")
  .get(coursesController.getAllCourses)
  .post(verfiyToken, validationSchema(), coursesController.addCourse);

router
  .route("/:courseId")
  .get(coursesController.getCourse)
  .patch(coursesController.updateCourse)
  .delete(coursesController.deleteCourse);

module.exports = router;
