const bcrypt = require("bcrypt");
const Usuario = require("../models/usuario");
const Profile = require("../models/perfilEstudiante");

// Registrar un usuario
const register = async (req, res) => {
  try {
    const { nombre, apellido, correo, contrasena, rol } = req.body;
    Usuario.findOne({ correo }).then((usuario) => {
      if (usuario) {
        return res.status(401).json({ message: "Ya existe un usuario con ese correo" });
      } else if (!nombre || !apellido || !correo || !contrasena) {
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
            nuevoUsuario.save().then((usuarioData) => {
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
                  return res.status(401).json({ error: "A ocurrido un error" });
                });
            }).catch((error) => {
              return res.status(401).json({ error: "A ocurrido un error" });
            });
          }
        });
      }
    });
  } catch (error) {
    return res.status(401).json({ error: "A ocurrido un error" });
  }
};

module.exports = register;