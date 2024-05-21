const {model, Schema} = require('mongoose');

const usuarioSchema = new Schema({     
  nombre: {type: String, required: true},
  apellido: {type: String, required: true},
  correo: {type: String, required: true, unique: true},
  contrasena: {type: String, required: true},
  
  rol: {type: String, required: true, default: 'Estudiante'},
  estado: {type: String, required: true, default: 'activo'},
  fechaRegistro: {type: Date, required: true, default: Date.now},
  fechaActualizacion: {type: Date, required: true, default: Date.now},
  fechaEliminacion: {type: Date,required: false, default: null}
});

module.exports = model('Usuario', usuarioSchema);