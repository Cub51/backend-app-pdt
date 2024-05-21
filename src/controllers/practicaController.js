// Crear practica por el profesor en un curso | Asignar practica a un estudiante por medio del curso | Calificar practica de un estudiante
const getEnrolledUsers = require("../controllers/matricularCurso");
const Practica = require("../models/practica");
const PracticaEstado = require("../models/practicaEstado");

const postPractica__controller = async (req, res) => {
  try {
    const { titulo, objetivo, actividad, estado, curso, createdAt } = req.body;
    if (!titulo || !objetivo || !actividad || !estado || !curso || !createdAt) {
      return res.status(400).json({
        error: "Please Provide All Information",
      });
    }
    const practica = new Practica({
      titulo,
      objetivo,
      actividad,
      estado,
      curso,
      createdAt,
    });
    const savedPractica = await practica.save();
    //Llamo a listado de usuario matriculados en el curso | se pasa el id del curso de la practica

    const userList = await getEnrolledUsers.getEnrolledUsers(curso);
    console.log("userlist", userList);

    //PRACTICAESTADO
    // Crear practicaEstado por cada usuario en la userList
    // loading en front
    const practicaEstadoPromises = userList.map((user) => {
      const practicaEstado = new PracticaEstado({
        practicaAsignada: savedPractica._id,
        userId: user.userId,
        estado: savedPractica.estado,
        comentario: "",
        calificacion: 0,
      });
      return practicaEstado.save();
    });
    const practicaEstadoResult = await Promise.all(practicaEstadoPromises);

    return res.status(200).json({
      // savedPractica,
      practicaEstadoResult,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "Something went wrong",
    });
  }
};


// Obtener todas las practicas 
const getPracticas__controller = async (req, res) => {
  try {
    const practicas = await Practica.find().populate("curso", "nombreCurso");
    return res.status(200).json({
      practicas,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "Something went wrong",
    });
  }
};

// Obtener todas las practicas de un curso
const getPracticasByCurso__controller = async (req, res) => {
  try {
    const practicas = await Practica.find({ curso: req.params.cursoId }).populate(
      "curso",
      "nombreCurso"
    );
  //  console.log('pr curso ',req.params.cursoId );
   // console.log('pr ',practicas);
    return res.status(200).json({
      practicas,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "Something went wrong", 
    });
  }
}

// Obtener todas las practicas creadas por un profesor
// FUNCION para ADMIN y PROFESOR
const getPracticasByProfesor__controller = async (req, res) => {
  try {
    const practicas = await Practica.find({ createdAt: req.params.profesorId })
    .populate(
      "curso",
      "nombreCurso"
    ).populate(
      "createdAt", 
      "nombre apellido correo rol")
      .lean();

          console.log('pr curso ',req.params.profesorId );
    console.log('pr ',practicas);
    return res.status(200).json({
      practicas,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "Something went wrong",
    });
  }
}


// Obtener una practica por id 
// Validar que el usuario sea el profesor del curso
// Validar que el usuario sea en que creo la practica
const getOnePractica__controller = async (req, res) => {
  try {
    const practica = await Practica.findById(req.params.practicaId).populate(
      "curso",
      "nombreCurso"
    ).populate("createdAt", "nombre apellido correo rol");
    return res.status(200).json({
      practica,
    }).lean();
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "Something went wrong",
    });
  }
};

const deletePractica__controller = async (req, res) => {
  try {
    const practica = await Practica.findByIdAndDelete(req.params.delId);
    return res.status(200).json({
      practica,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "Something went wrong",
    });
  }
};

module.exports = {
  postPractica__controller,
  getPracticas__controller,
  getOnePractica__controller,
  deletePractica__controller,
  getPracticasByCurso__controller,
  getPracticasByProfesor__controller
};
