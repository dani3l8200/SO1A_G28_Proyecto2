const controller_mensajeria= {};
const  registroSchema = require('../models/registro');

controller_mensajeria.saveMsg = async (req,res)=>{
    const nuevo = new registroSchema(req.body);
    console.log(nuevo)
    try {
        await nuevo.save();
         res.status(200).json({text: 'registro almacenado'});// aca seria de hacer el filtrado
     } catch (error) {
         res.status(500).json({Error: error});
     }
}

controller_mensajeria.test = async(req,res)=>{
    console.log(req.body);
    res.status(200).json({text: 'mensaje almacenado'});
}

/*
// para ver los datos
registroSchema.find(function (err, mensajitos) {
    if (err) return console.error(err)
    console.log(mensajitos)
});
*/

module.exports = controller_mensajeria;
