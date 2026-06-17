const { validationResult } = require("express-validator");

const Course = require("../models/course.model");

const httpStatusText = require("../utils/httpStatusText");

const getAllCourses = async (req, res) => {
  const query = req.query;

  const limit = query.limit || 10;
  const page = query.page || 1;

  const skip = (page - 1) * limit;

  // get all courses from DB using Course Model
  const courses = await Course.find({}, { __v: false }).limit(limit).skip(skip);

  res.json({
    status: httpStatusText.SUCCESS,
    data: {
      courses,
    },
  });
};

const getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({
        status: httpStatusText.FAIL,
        data: { course: null },
      });
    }
    res.json({
      status: httpStatusText.SUCCESS,
      data: {
        course,
      },
    });
  } catch (err) {
    return res
      .status(400)
      .json({ status: httpStatusText.ERROR, message: err.message, data: null });
  }
};

const addCourse = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ status: httpStatusText.FAIL, data: errors.array() });
  }

  const newCourse = new Course(req.body);
  const course = await newCourse.save();
  res.status(201).json({ status: httpStatusText.SUCCESS, data: course });
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
      return res.status(404).json({ status: httpStatusText.FAIL, data: null });
    }

    res
      .status(200)
      .json({ status: httpStatusText.SUCCESS, data: updatedCourse });
  } catch (e) {
    return res
      .status(400)
      .json({ statsu: httpStatusText.ERROR, data: null, message: e.message });
  }
};

const deleteCourse = async (req, res) => {
  const data = await Course.deleteOne({ _id: req.params.courseId });

  res.status(200).json({ status: httpStatusText.SUCCESS, data: null });
};

module.exports = {
  getAllCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
};
