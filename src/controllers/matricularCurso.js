const MatricularCurso=require('../models/cursoAsignado')

const matricularCurso = async (req, res, next) => {
  try {
    const {userId, cursoId} = req.body
    console.log('userId',req.body);
    // Busca si el usuario ya tiene un curso matriculado
    const enroll = await MatricularCurso.findOne({ 
        userId: userId,
        cursosAsignados: cursoId,
    });
   
    // Valida si ya tiene un curso matriculado, ya no puede volverse a matricular en el mismo curso
    if (enroll) {
      console.log(enroll)
      return res.status(200).json({
        text: "Course already enrolled", 
        enroll
      });
        
    } else {
      // Si no tiene un curso matriculado, se matricula en el curso
      const enroll_course= new MatricularCurso({
       // userId: req.params.personId,
       userId: userId,
        cursosAsignados: cursoId
      })
    enroll_course.save()
    .then(result=>{
      return res.status(200).json({
        text:"Curso Matriculado",
        result
      })
    })
    .catch(err=>{
      console.log(err)
    })
    }
  } catch (err) {
    console.log(err);
  }
};

// Listar cursos matriculados por un usuario
const getEnrolledCourses = async (req, res, next) => {
  try {
    const userId = req.params.id;
    console.log('uuuuuu',userId);
    const enrolledCourses = await MatricularCurso.find({ userId: userId }).populate(
      "cursosAsignados",
      "nombreCurso cursoDescripcion createdAt"
    );
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
    console.log('courseId',courseId);

    const enrolledUsers = await MatricularCurso.find({ cursosAsignados: courseId }).populate(
      "userId",
      "nombre apellido correo"
    ).lean(); 
    console.log('enrolledUsers',enrolledUsers);
    return  enrolledUsers;
  
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong");
  }
};


module.exports = {matricularCurso, getEnrolledCourses, getEnrolledUsers};
