const Curso = require("../models/curso");
//const cloudinary=require('../middlewares/cloudinary')

const postCourse__controller = async (req, res, next) => {
  try {
    const { cursoDescripcion, nombreCurso } = req.body;
    const user = req.body.createdAt;
    console.log(user);
    
    if (!cursoDescripcion || !nombreCurso ) {//|| !req.file
      return res.status(400).json({
        error: "Please Provide All Information",
      }); 
    }

    const course = new Curso({
      cursoDescripcion,
      nombreCurso,
      createdAt: req.body.createdAt,
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

const getOneCourse__controller = async (req, res, next) => {
  try {
    const  courseId  = req.params.courseId;
    console.log('IDDDD',courseId);
    const course = await Curso.findById(courseId);
    console.log('curso perro ',course);
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
    const delId  = req.params.delId;
    console.log(delId);
    const course = await Curso.findOneAndDelete({ _id: delId });
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

module.exports = { postCourse__controller, getCourses__controller, getOneCourse__controller, deleteCourse__Controller };