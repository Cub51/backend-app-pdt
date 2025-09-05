const {
  postCourse__controller,
  getCourses__controller,
  getCoursesTeacher_Controller,
  getOneCourse__controller,
  deleteCourse__Controller,
  updateCourse__Controller,
} = require("../controllers/course");

const validarSesion = require("../middlewares/validarSesion");
const adminAuth = require("../middlewares/auth").adminAuth; //  importar las funciones
const teacherAuth = require("../middlewares/auth").teacherAuth;
const studentAuth = require("../middlewares/auth").studentAuth;
const teacherOrAdminAuth = require("../middlewares/auth").teacherOrAdminAuth;

const router = require("express").Router();

router
  .route("/post-course")
  .post( postCourse__controller, validarSesion,teacherOrAdminAuth);

router
.route("/get-courses")
.get( getCourses__controller,validarSesion);

router
  .route("/get-course/:courseId")
  .get( getOneCourse__controller,validarSesion,);

router
  .route("/get-courses-teacher/:teacherId")
  .get( getCoursesTeacher_Controller,validarSesion);

router
  .route("/delete/:delId")
  .delete( deleteCourse__Controller,validarSesion);

router
  .route("/update")
  .put( updateCourse__Controller,validarSesion);

module.exports = router;

