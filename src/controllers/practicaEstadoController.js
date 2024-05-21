// Practica estado por practica asignada a un estudiante | Calificar practica de un estudiante | Ver practicas asignadas a un estudiante por curso | Estudiante ve practica asignada por curso | Estudiante modifica practica 
const PracticaEstado = require("../models/practicaEstado");
const Practica = require("../models/practica");

// Crear estado de la practica asignada a un estudiante por el PROFESOR
// LA practicaEstado se crea automaticamente al crear una practica
/*
const postPracticaEstado__controller = async (req, res) => {
    try {
        const { practicaAsignada, userId, estado, comentario, calificacion } = req.body;
        if (!practicaAsignada || !userId || !estado) {
        return res.status(400).json({
            error: "Please Provide All Information",
        });
        }
        const practicaEstado = new PracticaEstado({
        practicaAsignada,
        userId,
        estado,
        comentario,
        calificacion,
        });
        practicaEstado
        .save()
        .then((result) => {
            return res.status(200).json({
            result,
            });
        })
        .catch((err) => {
            console.log(err);
            return res.status(400).json({
            error: "Something went wrong",
            });
        });
    } catch (err) {
        console.log(err);
        return res.status(400).json({
        error: "Something went wrong",
        });
    }
    }*/

// Obtener todos las practicaEstado
const getPracticasEstado__controller = async (req, res) => {
    try {
        const practicasEstado = await PracticaEstado.find().populate(
        "practicaAsignada",
        "titulo"
        ).lean();
        return res.status(200).json({
        practicasEstado,
        });
    } catch (err) {
        console.log(err);
        return res.status(400).json({
        error: "Something went wrong",
        });
    }
    }

// Obtener una practicaEstado por idde practicaEstado
const getOnePracticaEstado__controller = async (req, res) => {
    try {
        const practicaEstado = await PracticaEstado.findById(req.params.practicaEstadoId).populate(
        "practicaAsignada",
        "titulo"
        );
        return res.status(200).json({
        practicaEstado,
        });
    } catch (err) {
        console.log(err);
        return res.status(400).json({
        error: "Something went wrong",
        });
    }
    }


// Listado de practicaEstado por ID Estudiante
const getPracticasEstadoByUserId__controller = async (req, res) => {
    try {
        const practicasEstado = await PracticaEstado.find({ userId: req.params.estudianteId }).populate(
        "practicaAsignada",
        "titulo objetivo actividad estado curso"
        ).lean();
        console.log('pr id user ',req.params.estudianteId);
        console.log('pr estado ',practicasEstado);
        return res.status(200).json({
        practicasEstado,
        });
    } catch (err) {
        console.log(err);
        return res.status(400).json({
        error: "Something went wrong",
        });
    }
    }

// PARA EL PROFESOR
// Listado de practicaEstado por ID Curso
const getPracticasEstadoByCurso__controller = async (req, res) => {
    try {
        const practicaPrincipal = await Practica.find({ curso: req.params.cursoId }).lean();

       const practicasCurso = await PracticaEstado.find({ practicaAsignada: { $in: practicaPrincipal.map((practica) => practica._id) } }).populate(
        "practicaAsignada",
        "titulo" 
        ).lean();
        //
        return res.status(200).json({
            practicaPrincipal,
            practicasCurso,
            
        });
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            error: "Something went wrong",
        });
    }
}



//Estudiante modifica practica
const updatePracticaEstado__controller = async (req, res) => {
    try {
        const { practicaEstadoId, estado } = req.body;
        if (!practicaEstadoId || !estado) {
        return res.status(400).json({
            error: "Please Provide All Information",
        });
        }
        const practicaEstado = await PracticaEstado.findById(practicaEstadoId);
        practicaEstado.estado = estado;
        practicaEstado
        .save()
        .then((result) => {
            return res.status(200).json({
            result,
            });
        })
        .catch((err) => {
            console.log(err);
            return res.status(400).json({
            error: "Something went wrong",
            });
        });
    } catch (err) {
        console.log(err);
        return res.status(400).json({
        error: "Something went wrong",
        });
    }
    }



//Agregar comentario a la practica de un estudiante
const addComentarioPracticaEstado__controller = async (req, res) => {
    try {
        const { practicaEstadoId, comentario } = req.body;
        if (!practicaEstadoId || !comentario) {
        return res.status(400).json({
            error: "Please Provide All Information",
        });
        }
        const practicaEstado = await PracticaEstado.findById(practicaEstadoId);
        practicaEstado.comentario = comentario;
        practicaEstado
        .save()
        .then((result) => {
            return res.status(200).json({
            result,
            });
        })
        .catch((err) => {
            console.log(err);
            return res.status(400).json({
            error: "Something went wrong",
            });
        });
    } catch (err) {
        console.log(err);
        return res.status(400).json({
        error: "Something went wrong",
        });
    }
    }



// Calificar practica de un estudiante
const calificarPracticaEstado__controller = async (req, res) => {
    try {
        const { practicaEstadoId, calificacion } = req.body;
        if (!practicaEstadoId || !calificacion) {
        return res.status(400).json({
            error: "Please Provide All Information",
        });
        }
        const practicaEstado = await PracticaEstado.findById(practicaEstadoId);
        practicaEstado.calificacion = calificacion;
        practicaEstado
        .save()
        .then((result) => {
            return res.status(200).json({
            result,
            });
        })
        .catch((err) => {
            console.log(err);
            return res.status(400).json({
            error: "Something went wrong",
            });
        });
    } catch (err) {
        console.log(err);
        return res.status(400).json({
        error: "Something went wrong",
        });
    }
    }


module.exports = {
   // postPracticaEstado__controller,
    getPracticasEstado__controller,
    getOnePracticaEstado__controller,
    calificarPracticaEstado__controller,
    getPracticasEstadoByCurso__controller,
    updatePracticaEstado__controller,
    getPracticasEstadoByUserId__controller,
    addComentarioPracticaEstado__controller


};