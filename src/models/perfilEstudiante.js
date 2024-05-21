const { model, Schema } = require("mongoose");

const perfilEstudianteSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
    },
    cursosAsignados: [
      {
        type: Schema.Types.ObjectId,
        ref: "Curso",
      },
    ],
    asistencia: [
      {
        type: Schema.Types.ObjectId,
        ref: "Curso",
      },
      {
        estado: [
          {
            type: String,
            default: "no registrado",
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = model('PerfilEstudiante', perfilEstudianteSchema);
