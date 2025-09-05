const {Router} = require('express');
const router = Router();
const { 
    postPractica__controller,
    getPracticas__controller,
    getOnePractica__controller,
    deletePractica__controller,
    getPracticasByCurso__controller,
    getPracticasByProfesor__controller } = require('../controllers/practicaController');
const validarSesion  = require('../middlewares/validarSesion');
const teacherAuth = require("../middlewares/auth").teacherAuth;

// Ruta para crear estado de la practica asignada a un estudiante por el PROFESOR
router.route('/create-practica-for-curse').post( postPractica__controller);

// Ruta para obtener todas las practicas
router.route('/get-all-pr/').get( getPracticas__controller);

// Ruta para obtener todas las practicas de un curso
router.route('/get-pr-by-curso/:cursoId').get( getPracticasByCurso__controller);

// Ruta para obtener todas las practicas creadas por un profesor
router.route('/get-pr-by-profesor/:profesorId').get( getPracticasByProfesor__controller);


// Ruta para obtener una practica por id
router.route('/get-one-pr/:practicaId').get( getOnePractica__controller);

// Ruta para eliminar una practica por id
router.route('/delete-pr/:practicaId').delete( deletePractica__controller);
module.exports = router;