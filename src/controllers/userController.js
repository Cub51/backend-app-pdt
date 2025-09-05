const Usuario = require("../models/usuario");
const Profile = require("../models/perfilEstudiante");
const bcrypt = require("bcrypt");

// Lista a los estudiantes acceso por PROFESOR | ADMINISTRADOR
const getStudentsController = async (req, res) => {
  try {
    const studentInfo = await Usuario.find({
      rol: process.env.ROL_ESTUDIANTE,
      estado: process.env.ESTADO_ACTIVO,
    });
    return res
      .status(200)
      .json({ studentInfo, message: "Listado de Estudiantes Activos" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Internal server error" });
  }
};

// Lista a los profesores acceso por ADMINISTRADOR
const getTeachersController = async (req, res) => {
  try {
    const teacherInfo = await Usuario.find({
      rol: process.env.ROL_PROFESOR,
      estado: process.env.ESTADO_ACTIVO,
    });
    return res
      .status(200)
      .json({ teacherInfo, message: "Listado de Profesores Activos" });
  } catch (error) {
    console.log(error);
    return res.json({ error: "Internal server error" });
  }
};

// Lista a los administradores acceso por ADMINISTRADOR
const getAdminsController = async (req, res) => {
  try {
    const adminInfo = await Usuario.find({
      rol: process.env.ROL_ADMINISTRADOR,
      estado: process.env.ESTADO_ACTIVO,
    });
    return res
      .status(200)
      .json({ adminInfo, message: "Listado de Administradores Activos" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Internal server error" });
  }
};

// ELIMINADO LOGICO acceso por ADMINISTRADOR
const deleteUserController = async (req, res) => {
  try {
    console.log("delete ", req);
    const { id } = req.params;
    const userInfo = await Usuario.findById({ _id: id });
    userInfo.estado = process.env.ESTADO_INACTIVO;
    userInfo.fechaEliminacion = Date.now();
    // Guardar el estado actualizado en la base de datos
    await userInfo.save();
    return res
      .status(200)
      .json({ userInfo, message: "Usuario eliminado con exito!" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Internal server error" });
  }
};

//Admin puede añadir usuarios ADMIN / PROFESOR / ESTUDIANTE
const addUserController = async (req, res) => {
  try {
    // Lógica para agregar un nuevo usuario
    const { nombre, apellido, correo, contrasena, rol } = req.body;
    Usuario.findOne({ correo }).then((usuario) => {
      if (usuario) {
        return res
          .status(401)
          .json({ message: "Ya existe un usuario con ese correo" });
      } else if (!nombre || !apellido || !correo || !contrasena || !rol) {
        return res.json({ message: "Faltan campos por completar" });
      } else if (nombre.length < 3) {
        return res.json({
          message: "El nombre debe tener al menos 3 caracteres",
        });
      } else if (contrasena.length < 6) {
        return res.json({
          message: "La contraseña debe tener al menos 6 caracteres",
        });
      } else {
        bcrypt.hash(contrasena, 10, (error, contrasenaHasheada) => {
          if (error) {
            return res.json({ error: "A ocurrido un error" });
          } else {
            const nuevoUsuario = new Usuario({
              nombre,
              apellido,
              correo,
              contrasena: contrasenaHasheada,
              rol,
            });
            nuevoUsuario
              .save()
              .then((usuarioData) => {
                // crear perfil
                console.log(usuarioData._id);
                const perfil = new Profile({
                  userId: usuarioData._id,
                  cursosAsignados: [],
                  asistencia: [],
                });
                perfil
                  .save()
                  .then((result) => {
                    return res.status(201).json({
                      message: "Perfil creado exitosamente",
                      usuarioData,
                    });
                  })
                  .catch((error) => {
                    return res
                      .status(401)
                      .json({ error: "A ocurrido un error" });
                  });
              })
              .catch((error) => {
                return res.status(401).json({ error: "A ocurrido un error" });
              });
          }
        });
      }
    });
  } catch (error) {
    console.log(error);
    return res.json({ error: "Internal server error" });
  }
};

// Admin puede actualizar los datos de cualquier usuario
const updateUserController = async (req, res) => {
  try {
    const { _id } = req.body;
    //validar que el id no sea nulo
    if (!_id) {
      return res.status(400).json({ error: "Id is required" });
    }
    // Obtener el usuario a actualizar

    const userToUpdate = await Usuario.findById(_id);

    if (!userToUpdate) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    const { nombre, apellido, correo, contrasena, rol } = req.body;
    console.log("res delete, ", _id, contrasena);

    // update por campo ingresado
    if (nombre) userToUpdate.nombre = nombre;
    if (apellido) userToUpdate.apellido = apellido;
    if (correo) userToUpdate.correo = correo;

    if (rol) userToUpdate.rol = rol;

    let contrasenaHasheada;

    if (contrasena) {
      try {
        contrasenaHasheada = await bcrypt.hash(contrasena, 10);
        userToUpdate.contrasena = contrasenaHasheada;
      } catch (error) {
        return res.json({
          error: "Ha ocurrido un error al encriptar la contraseña",
        });
      }
    }

    userToUpdate.fechaActualizacion = Date.now();
    // Guardar el usuario actualizado en la base de datos
    await userToUpdate.save();
    return res
      .status(200)
      .json({ userToUpdate, message: "Usuario actualizado con exito!" });
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
