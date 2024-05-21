// Objetivo: Definir el modelo de la coleccion cursoAsignado
const { model, Schema } = require("mongoose");

const cursoAsignadoSchema=new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref:"Usuario"
    },
    
    cursosAsignados:[
        {
            type: Schema.Types.ObjectId,
            ref:"Curso"
        }
    ],
    /*
        cursoId:{
        type: Schema.Types.ObjectId,
        ref:"Curso"
    },
    
    usuariosAsignados:[
        {
            type: Schema.Types.ObjectId,
            ref:"Usuario"
             */
    
},{
    timestamps:true
})

module.exports=model('CursoAsignado',cursoAsignadoSchema);