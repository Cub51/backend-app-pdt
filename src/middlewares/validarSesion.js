const Usuario = require('../models/usuario');
var jwt = require('jsonwebtoken');
const SECRET_KEY_JWT = process.env.SECRET_KEY;

// Middleware para validar la sesión del usuario
const validarSesion = async (req, res, next) => {
    try {
      //  console.log('req.headers.authorization',req.headers.authorization);

        if (!req.headers.authorization) {
            return res.status(401).json({ message: 'No autorizado null' });
        }
        
        const token = req.headers.authorization.split(' ')[1];
        let decoded;
        try {
            decoded = jwt.verify(token, SECRET_KEY_JWT);
        } catch (error) {
            return res.status(401).json({ message: 'Token invalido' });//podria ser forbidden?  403
        }
        console.log('decoded',decoded);
        const usuario = await Usuario.findById(decoded.usuario._id);
        if (!usuario) {
            return res.status(401).json({ message: 'Deberias estar registrado' });
        }
        req.usuario = usuario;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: 'No autorizado es' });
    }
}

/* Función para generar un token
const generarToken = (usuario) => {
    return jwt.sign({usuario}, SECRET_KEY_JWT, {expiresIn: '1h'});
}*/

module.exports = validarSesion;