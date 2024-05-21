const {Router} = require('express');
const router = Router();
const {profile, getProfile, updateProfile, updateAsistencia} = require('../controllers/profile');

const validarSesion  = require('../middlewares/validarSesion');
const teacherAuth = require("../middlewares/auth").teacherAuth;

// Ruta para obtener el perfil | Solo estudiantes
router.route('/getProfile/:userId').get(  getProfile);
// Ruta para actualizar el perfil | Solo estudiantes
router.route('/updateProfile').put( validarSesion , updateProfile);
// Ruta para actualizar la asistencia | Solo profesores
router.route('/updateAsistencia').put(validarSesion, teacherAuth, updateAsistencia);

module.exports = router;
