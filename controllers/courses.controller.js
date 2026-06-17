const { validationResult } = require("express-validator");

const Course = require("../models/course.model");
const { FormData } = require("undici-types");
const getAllCourses = async (req, res) => {
  // get all courses from DB using Course Model
  const courses = await Course.find();

  res.json(courses);
};

const getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ msg: "object is not found" });
    }
    res.json(course);
  } catch (err) {
    return res.status(400).json({ msg: "object is not found" });
  }
};

const addCourse = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }

  const newCourse = new Course(req.body);
  const course = await newCourse.save();
  res.status(201).json(course);
};

const updateCourse = async (req, res) => {
  const courseId = req.params.courseId;

  try {
    const updatedCourse = await Course.updateOne(
      { _id: courseId },
      {
        $set: { ...req.body },
      },
    );

    if (!updatedCourse) {
      return res.status(404).json({ msg: "not found" });
    }

    res.status(200).json(updatedCourse);
  } catch (e) {
    return res.status(400).json({ error: e });
  }
};

const deleteCourse = async (req, res) => {
  const data = await Course.deleteOne({ _id: req.params.courseId });

  res.status(200).json({ sucess: true, msg: FormData });
};

module.exports = {
  getAllCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
};
