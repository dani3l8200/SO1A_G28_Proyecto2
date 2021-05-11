const {Schema , model } = require('mongoose');


const registroSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
            required: true,
        },
        vaccine_type: {
            type: String,
            required: true,
        },
        canal: { // por si acaso aunque no creo que lo use
            type: String,
            required: false,
        },
        fecha:{ // para ordenarlos por fecha y traer los ultimos en las consultas
            type: Date,
            default : Date.now
        }
    }
);

module.exports =  model('registros', registroSchema)
