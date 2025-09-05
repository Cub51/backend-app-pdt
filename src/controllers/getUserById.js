const Usuario = require("../models/usuario");

const getUserById = async (req, res) => {
  const userId = req.params.id;
  console.log(userId);
  if (userId.length === 24) {
    Usuario.findById(userId).then((usuario) => {
      if (usuario) {
        const { _id, contrasena, __v, ...resto } = usuario._doc;
        res.json({ resto });
      } else {
        return res.json({ message: "Usuario no encontrado" });
      }
    });
  } else {
    return res.json({ message: "El usuario que buscas no es valido" }); //Id inválido
  }
};

module.exports = getUserById;
