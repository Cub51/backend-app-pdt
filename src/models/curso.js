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

    createdAt: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Curso', cursoSchema);