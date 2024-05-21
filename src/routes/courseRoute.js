const {
  postCourse__controller,
  getCourses__controller,
  getOneCourse__controller,
  deleteCourse__Controller,
} = require("../controllers/course");

const validarSesion = require("../middlewares/validarSesion");
const adminAuth = require("../middlewares/auth").adminAuth; //  importar las funciones
const teacherAuth = require("../middlewares/auth").teacherAuth;
const studentAuth = require("../middlewares/auth").studentAuth;
const teacherOrAdminAuth = require("../middlewares/auth").teacherOrAdminAuth;

const router = require("express").Router();
//revisar el middleware de teacherOrAdminAuth
// revisar id denro de body y no en la URL

router
  .route("/post-course")
  .post(validarSesion, postCourse__controller);

router
.route("/get-courses")
.get(validarSesion, getCourses__controller);

router
  .route("/get-course/:courseId")
  .get(validarSesion, getOneCourse__controller);

router
  .route("/delete/:delId")
  .delete(validarSesion, adminAuth, deleteCourse__Controller);

module.exports = router;

