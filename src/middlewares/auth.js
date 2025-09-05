//<summary>  Middleware para verificar el rol del usuario que realiza la petición</summary>
//#region Autenticaciones por roles
module.exports.adminAuth = (req, res, next) => {
    if (req.usuario.rol !== process.env.ROL_ADMINISTRADOR) {
        return res.status(403).json({ message: "No autorizado" });
    }
    next();
}

module.exports.teacherOrAdminAuth = (req, res, next) => {
    if (req.usuario.rol !== process.env.ROL_PROFESOR || req.usuario.rol !== process.env.ROL_ADMINISTRADOR) {
        res.status(403).send('Acceso denegado. Debes ser un profesor o un administrador para realizar esta acción.');
    } 
    next();
    }

module.exports.teacherAuth = (req, res, next) => {
    console.log("LOG", req.usuario)
    if (req.usuario.rol !== process.env.ROL_PROFESOR) {
        return res.status(403).json({ message: "No autorizado" });
    }
    next();
}

module.exports.studentAuth = (req, res, next) => {
    if (req.usuario.rol !== process.env.ROL_ESTUDIANTE) {
        return res.status(403).json({ message: "No autorizado" });
    }
    next();
}
//#region 