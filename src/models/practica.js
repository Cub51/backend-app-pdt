const { model, Schema } = require("mongoose");

const practicaSchema = new Schema(
  {
    titulo: {
      type: String,
      required: true,
    },
    objetivo: [
      {
        type: String,
        required: true,
      },
    ],
    actividad: [
      {
        type: String,
        required: true,
      },
    ],
    estado: {
      //estado inicial de la practica creada por el profesor
      type: Object, //JSON
      required: true,
    },
    // cursoId es el id del curso al que pertenece la practica
    curso: {
      type: Schema.Types.ObjectId,
      ref: "Curso",
    },
    createdAt: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
    },
    /*  fechaInicio: {
        type: Date,
        required: true
    },
    fechaFin: {
        type: Date,
        required: true
    },
    entregas: [{
        type: Schema.Types.ObjectId,
        ref: 'Entrega'
    }]*/
  },
  {
    timestamps: true,
  }
);

module.exports = model("Practica", practicaSchema);
