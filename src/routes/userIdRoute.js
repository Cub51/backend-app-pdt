
const getUserById = require("../controllers/getUserById");
const {
  getStudentsController,
  getTeachersController,
  getAdminsController,
  deleteUserController,
  addUserController,
  updateUserController,
} = require("../controllers/userController");
const  validarSesion  = require("../middlewares/validarSesion");
const adminAuth  = require("../middlewares/auth").adminAuth;//  importar las funciones 
const teacherAuth  = require("../middlewares/auth").teacherAuth;//  importar las funciones
const studentAuth  = require("../middlewares/auth").studentAuth;//  importar las funciones
const teacherOrAdminAuth  = require("../middlewares/auth").teacherOrAdminAuth;//  importar las funciones
//const { validarPermisos } = require("../middlewares/validarPermisos");
const router = require('express').Router();

router.route("/student").get( getStudentsController, validarSesion, teacherOrAdminAuth); //obitene lista de estudiantes
router.route("/teacher").get(getTeachersController, validarSesion, teacherOrAdminAuth);//obitene lista de profesores
router.route("/admin").get(  getAdminsController, validarSesion, adminAuth);//obitene lista de admins

// acciones para el usuario, solo el admin puede hacer estas acciones
router.route("/delete/:id").delete(deleteUserController,validarSesion, adminAuth);
router.route("/add").post(addUserController,validarSesion, adminAuth);
router.route("/update").put(updateUserController,validarSesion, adminAuth);

// test view user by id
router.route("/:id").get( getUserById, validarSesion);

module.exports = router;
