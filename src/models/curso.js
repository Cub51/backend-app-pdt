const { model, Schema } = require("mongoose");

const cursoSchema = new Schema(
  {
    nombreCurso: {
      type: String,
      required: true,
    },
    cursoDescripcion: {
      type: String,
      required: true,
    },
    fechaInicio: {
      type: Date,
      required: true,
    },
    fechaFin: {
      type: Date,
      required: true,
    },
    responsable: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Curso', cursoSchema);