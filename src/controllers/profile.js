// Perfil
const Perfil = require('../models/perfilEstudiante');
const Usuario = require('../models/usuario');
const profile = (req, res) => {
    res.json({ message: "Perfil" });
    }


//crear perfil
const createProfile = async (req, res) => {
    try {
        const { userId, cursosAsignados, asistencia } = req.body;
        let profileCheck = await Perfil.findOne
        ({ userId });
        if (profileCheck) {
        return res.status(400).json({
            error: "Profile Already Exists",
        });
        }
console.log(userId);
        if (!userId) {
        return res.status(400).json({
            error: "Please Provide All Information",
        });
        }
        const perfil = new Perfil({
        userId,
        cursosAsignados,
        asistencia,
        });
        perfil
        .save()
        .then((result) => {
            return res.status(201).json({
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
}



const getProfile = async (req, res) => {
    try {
        const perfil = await Perfil.findOne({ userId: req.params.userId });
        {console.log(perfil);}
console.log('aaa ',req.params.userId);
        return res.status(200).json({
        perfil,

        });
    } catch (err) {
        console.log(err);
        return res.status(400).json({
        error: "Something went wrong",
        });
    }
    } 

const updateProfile = async (req, res) => {
    try {
        const { userId, cursosAsignados, asistencia } = req.body;
        if (!userId || !cursosAsignados || !asistencia) {
        return res.status(400).json({
            error: "Please Provide All Information",
        });
        }
        const perfil = await Perfil.findOne({ userId });
        perfil.cursosAsignados = cursosAsignados;
        perfil.asistencia = asistencia;
        perfil
        .save()
        .then((result) => {
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
    }

const updateAsistencia = async (req, res) => {
    try {
        const { userId, asistencia } = req.body;
        if (!userId || !asistencia) {
        return res.status(400).json({
            error: "Please Provide All Information",
        });
        }
        const perfil = await Perfil.findOne({ userId });
        perfil.asistencia = asistencia;
        perfil
        .save()
        .then((result) => {
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
    }


module.exports ={ profile, getProfile, updateProfile, updateAsistencia, createProfile};