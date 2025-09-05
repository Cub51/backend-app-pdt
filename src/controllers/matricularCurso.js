const MatricularCurso = require("../models/cursoAsignado");

// Matricularse en un curso
const matricularCurso = async (req, res, next) => {
  try {
    const { userId, cursoId, rol } = req.body;
    console.log("userId", req.body);
    // Validar si el usuario es profesor que no se matricule en el curso
    if (!(rol === process.env.ROL_ESTUDIANTE)) {
      return res.status(403).json({
        text: "No se puede matricular en el curso, solo los estudiantes pueden hacerlo",
      });
    }

    // Usa `findOneAndUpdate` para agregar el curso si no está ya matriculado
    const updatedEnroll = await MatricularCurso.findOneAndUpdate(
      { userId: userId },
      { $addToSet: { cursosAsignados: cursoId } },
      { new: true, upsert: true } // `upsert` crea el documento si no existe
    );

    if (updatedEnroll) {
      return res.status(200).json({
        text: "Curso Matriculado",
        result: updatedEnroll,
      });
    } else {
      return res.status(400).json({
        text: "No se pudo matricular en el curso",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

// Listar cursos matriculados por un usuario
const getEnrolledCourses = async (req, res, next) => {
  try {
    const { userId } = req.query;
    console.log("uuuuuu", userId);
    const enrolledCourses = await MatricularCurso.find({
      userId: userId, 
    }).populate(
      "cursosAsignados",
      "nombreCurso cursoDescripcion fechaInicio fechaFin responsable createdAt updatedAt"
    ).lean();
    return res.status(200).json({
      enrolledCourses,
    });
  } catch (err) { 
    console.log(err);
  }
};

// Listar usuarios matriculados en un curso
// USO DIRECTO EN practicaController
const getEnrolledUsers = async (curso) => {
  try {
    //obtengo el id del curso desde practicaController y lo paso a la ruta de matricularCurso para obtener los usuarios matriculados
    //const courseId = req.params.cursoId;
    const courseId = curso;
    console.log("courseId", courseId);

    const enrolledUsers = await MatricularCurso.find({
      cursosAsignados: courseId,
    })
      .populate("userId", "nombre apellido correo")
      .lean();
    console.log("enrolledUsers", enrolledUsers);
    return enrolledUsers;
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong");
  }
};

module.exports = { matricularCurso, getEnrolledCourses, getEnrolledUsers };
