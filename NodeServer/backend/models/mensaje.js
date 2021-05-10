const {Schema , model } = require('mongoose');


const mensajeSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        age: {
            type: Number
        },
        infectedtype: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        canal: {
            type: String,
            required: true,
        },
        fecha:{ // para ordenarlos por fecha y traer los ultimos en las consultas
            type: Date,
            default : Date.now
        }
    }
);

module.exports =  model('Mensaje', mensajeSchema)
