
const {model, Schema} = require('mongoose');

const practicaEstadoSchema = new Schema({
    practicaAsignada: {
        type: Schema.Types.ObjectId,
        ref: 'Practica'
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'//usuario que realizo la practica ESTUDIANTE
    },
    estado: {
        type: Object, // JSON
        required: true
    },
    comentario: {// comentario del profesor a la practica
        type: String,
        required: false
    },
    calificacion: { //calificacion del profesor a la practica
        type: Number,
        required: false
    },

}, {
    timestamps: true
});

module.exports = model('PracticaEstado', practicaEstadoSchema);