const Curso = require("../models/curso");
const CursoAsignado = require("../models/cursoAsignado");
//const cloudinary=require('../middlewares/cloudinary')

const postCourse__controller = async (req, res, next) => {
  try {
    console.log("add", req.body);
    const { cursoDescripcion, nombreCurso, fechaInicio, fechaFin } =  req.body.body;
    const user = req.body.responsable;
    console.log(user);

    if (!cursoDescripcion || !nombreCurso || !fechaInicio || !fechaFin) {
      //|| !req.file
      return res.status(400).json({
        error: "Please Provide All Information",
      });
    }

    const course = new Curso({
      cursoDescripcion,
      nombreCurso,
      fechaInicio,
      fechaFin,
      responsable: req.body.body.responsable,
    });
    course
      .save()
      .then((result) => {
        //console.log(result)
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
};

const getCourses__controller = async (req, res, next) => {
  try {
    const courses = await Curso.find().populate(
      "createdAt",
      "rol _id nombre correo"
    );
    return res.status(200).json({
      courses,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "Something went wrong",
    });
  }
};

const getCoursesTeacher_Controller = async (req, res, next) => {
  try {
    const teacherId = req.params.teacherId;
    console.log("ID del profesor", teacherId);
    const courses = await Curso.find({ responsable: req.params.teacherId });
    console.log("Cursos del profesor", courses);
    return res.status(200).json({
      courses,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "Something went wrong",
    });
  }
};

const getOneCourse__controller = async (req, res, next) => {
  try {
    const courseId = req.params.courseId;
    console.log("IDDDD", courseId);
    const course = await Curso.findById(courseId);
    console.log("curso perro ", course);
    return res.status(200).json({
      course,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "Something went wrong",
    });
  }
};

const deleteCourse__Controller = async (req, res) => {
  try {
    const delId = req.params.delId;
    console.log(delId);

    const course = await Curso.findById({ _id: delId });
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    } else {
      const course = await Curso.findOneAndDelete({ _id: delId });
      // Actualizar los documentos en CursoAsignado eliminando la referencia al curso
      await CursoAsignado.updateMany(
        { cursosAsignados: delId },
        { $pull: { cursosAsignados: delId } }
      );
      return res
        .status(200)
        .json({ course, message: "Course deleted successfully" });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "Something went wrong",
    });
  }
};

const updateCourse__Controller = async (req, res, next) => {
  try {
    console.log("update USER", req.body);
    const { _id, cursoDescripcion, nombreCurso, fechaInicio, fechaFin } = req.body;
    if (!_id) {
      return res.status(400).json({
        error: "Please provide  ID",
      });
    }

    const courseUpdate = await Curso.findById(_id);
    if (!courseUpdate) {
      return res.status(404).json({ error: "Curso no encontrado" });
    }

    //update
    if (nombreCurso) courseUpdate.nombreCurso = nombreCurso;
    if (cursoDescripcion) courseUpdate.cursoDescripcion = cursoDescripcion;
    if (fechaInicio) courseUpdate.fechaInicio = fechaInicio;
    if (fechaFin) courseUpdate.fechaFin = fechaFin;
    courseUpdate.updatedAt = Date.now();

    await courseUpdate.save();
    return res.status(200).json({
      courseUpdate,
      message: "Curso actualizado con éxito",
    });
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        error: "Internal Server Error",
      });
    }
};

module.exports = {
  postCourse__controller,
  getCourses__controller,
  getCoursesTeacher_Controller,
  getOneCourse__controller,
  deleteCourse__Controller,
  updateCourse__Controller,
};
