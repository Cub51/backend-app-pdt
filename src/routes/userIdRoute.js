
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

router.route("/student").get(getStudentsController);
router.route("/teacher").get(validarSesion,adminAuth,getTeachersController);
router.route("/admin").get(validarSesion,adminAuth,getAdminsController);

// acciones para el usuario, solo el admin puede hacer estas acciones
router.route("/delete/:id").delete(validarSesion , adminAuth , deleteUserController);
router.route("/add").post(validarSesion, adminAuth ,addUserController);
router.route("/update/:id").put(validarSesion, adminAuth ,updateUserController);

// test view user by id
router.route("/:id").get(getUserById);

module.exports = router;
