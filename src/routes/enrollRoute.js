const {Router} = require('express');
const router = Router();
const  {matricularCurso, getEnrolledCourses, }  = require('../controllers/matricularCurso');

const validarSesion  = require('../middlewares/validarSesion');

//cursoId es el id del curso que se quiere matricular
//personId es el id de la persona que se quiere matricular
//router.route('/:personId/:cursoId').put( validarSesion ,matricularCurso);

//smatricula
router.route('/mat/').put( matricularCurso);

//listar cursos matriculados por un usuario
router.route('/listarMat').get(getEnrolledCourses,validarSesion);


module.exports=router