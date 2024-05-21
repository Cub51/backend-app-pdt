const Usuario = require("../models/usuario");

// Da acceso a los estudiantes
const getStudentsController = async (req, res) => {
  try {
    const studentInfo = await Usuario.find({ rol: process.env.ROL_ESTUDIANTE });
    return res.status(200).json({ studentInfo });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Internal server error" });
  }
};

// Da acceso a los profesores
const getTeachersController = async (req, res) => {
  try {
    const teacherInfo = await Usuario.find({ rol: process.env.ROL_PROFESOR });
    return res.status(200).json({ teacherInfo });
  } catch (error) {
    console.log(error);
    return res.json({ error: "Internal server error" });
  }
};

// Da acceso a los administradores
const getAdminsController = async (req, res) => {
  try {
    const adminInfo = await Usuario.find({
      rol: process.env.ROL_ADMINISTRADOR,
    });
    return res.status(200).json({ adminInfo });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Internal server error" });
  }
};

// REVISAR ESTA FUNCION - hacer eliminado logico en vez de eliminado fisico
const deleteUserController = async (req, res) => {
  try {
    const { id } = req.params;
    const userInfo = await Usuario.findByIdAndDelete({ _id: id });
    return res
      .status(200)
      .json({ userInfo, message: "Usuario eliminado con exito!" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Internal server error" });
  }
};


const addUserController = async (req, res) => {// Revisar y añadir controles para que los usuarios no se repitan con los ya creados
  try {
    // Lógica para agregar un nuevo usuario
    const { nombre, apellido, correo, contrasena, rol } = req.body;
    const newUser = new Usuario({
      nombre,
      apellido,
      correo,
      contrasena,
      rol,
    });
    newUser.save();
    return res.status(200).json({ message: "Usuario agregado con exito!" });
  } catch (error) {
    console.log(error);
    return res.json({ error: "Internal server error" });
  }
};

const updateUserController = async (req, res) => {
  try {
    // Lógica para actualizar un usuario existente
    const { id } = req.params;
    const { nombre, apellido, correo, contrasena, rol } = req.body;
    const updatedUser = await Usuario.findByIdAndUpdate(
      { _id: id },
      { nombre, apellido, correo, contrasena, rol }
    );
    return res
      .status(200)
      .json({ updatedUser, message: "Usuario actualizado con exito!" });
  } catch (error) {
    console.log(error);
    return res.json({ error: "Internal server error" });
  }
};

module.exports = {
  getStudentsController,
  getTeachersController,
  getAdminsController,
  deleteUserController,
  addUserController,
  updateUserController,
};
//
