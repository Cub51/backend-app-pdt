const { Router } = require("express");
const router = Router();
const {
    getPracticasEstado__controller,
    getOnePracticaEstado__controller,
    calificarPracticaEstado__controller,
    getPracticasEstadoByCurso__controller,
    updatePracticaEstado__controller,
    getPracticasEstadoByUserId__controller,
    addComentarioPracticaEstado__controller
} = require("../controllers/practicaEstadoController");

const validarSesion  = require ("../middlewares/validarSesion");
const  teacherAuth  = require ("../middlewares/auth").teacherAuth;

router.route('/get-all-pr/').get( getPracticasEstado__controller);

router.route('/get-one-pr/:practicaEstadoId').get( getOnePracticaEstado__controller);

router.route('/get-pr-by-curso/:cursoId').get( getPracticasEstadoByCurso__controller);


router.route('/get-pr-by-user/:estudianteId').get(  getPracticasEstadoByUserId__controller);


//ESTUDIANTE
router.route('/update-pr/').put( updatePracticaEstado__controller, validarSesion);

//PROFESOR
router.route('/add-comentario-pr/').put( addComentarioPracticaEstado__controller, validarSesion,teacherAuth);
router.route('/add-calificar-pr/').put( calificarPracticaEstado__controller, validarSesion, teacherAuth);

module.exports = router;