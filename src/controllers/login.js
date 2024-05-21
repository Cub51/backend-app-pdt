const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Usuario = require("../models/usuario");


let failedAttempts = 0;

const login = async (req, res) => {
  try {
    const { correo, contrasena } = req.body;
    const usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      return res.json({ message: "Usuario no registrado" });
    }

    bcrypt.compare(contrasena, usuario.contrasena, (error, resultado) => {
      if (error) {
        return res.json({ error: error.message });
      } else if (!resultado) {
        if (failedAttempts >= 3) {
          setTimeout(() => {
            failedAttempts = 0;
          }, 60000);
          return res.json({
            message:
              "Demasiados intentos fallidos, espere un minuto para volver a intentarlo",
          });
        }
        failedAttempts++;
        return res.json({ message: "Contraseña incorrecta" });
      } else {
        // Aquí es donde enviarías la respuesta final
        // Eliminamos la contraseña del usuario para no enviarla en la respuesta
        usuario.contrasena = undefined;
        // Creamos un token con la información del usuario
        const token = jwt.sign({ usuario }, process.env.SECRET_KEY, {
          expiresIn: "1h",
        });

        //crear perfil si no existe y enviarlo en la respuesta
        res
          .status(200)
          .json({ message: "Inicio de sesión exitoso ", token, usuario });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error del servidor" });
  }
};

module.exports = login;
