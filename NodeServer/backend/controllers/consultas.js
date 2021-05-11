const consulta = {};
const registroSchema = require('../models/registro');
/*

aca va toda la logica que solicitara el front , para poder realizar los reportes solicitados

*/


/*
- Datos almacenados en la base de datos, en MongoDB.
- Los diez países con más vacunados, en Redis.
- Personas vacunadas por cada país, en Redis.
- Gráfica de pie de los géneros de los vacunados por país, en MongoDB.
- Los últimos cinco vacunados almacenados por país, en MongoDB.

- Gráfica de barras del rango de edades (de diez en diez) por cada país, en
Redis.

- Mapa interactivo que muestre estos reportes.

*/
consulta.get_all_registros = async(req,res) => {// sin filtro alguno
    try {
        const registros = await registroSchema.find().sort({fecha:-1}).limit(50); // LOS DEVUELVE DESCENDENTE
        res.send(registros);// devuelve todos los mensajes
    } catch (error) {
        console.log(error);
    }
}

consulta.get_ultimos_5 = async(req,res) => {// sin filtro alguno
    try {
        const {pais} = req.params;
        console.log("PAIS: ", pais)
        const registros = await registroSchema.find({location: pais}).sort({fecha:-1}).limit(5); // LOS DEVUELVE DESCENDENTE
        res.send(registros);// devuelve todos los mensajes
  
    } catch (error) {
        console.log(error);
    }
}



consulta.getPie_rep3= async(req,res) =>{
    try{
        const {pais} = req.params;
       console.log("pais",pais)
        const all_ = await registroSchema.aggregate([   {$match: { "location": { $eq: pais } }},{ "$group": {_id: "$gender",count: {$sum:1}}} , {$sort: {"count": -1} }  ]  ) ;
        console.log(all_)
        res.send(all_)
    }catch(error){
        console.log("error GET DATA GRAFICA PIE");
    }
}



consulta.rangoEdades= async(req,res) =>{
    try{
        const all_ = await registroSchema.aggregate([{ "$group": {_id: "$age", count: {$sum:1}}} , {$sort: {"count": -1}}]);
        res.send(all_);
        console.log(all_)
    }catch(error){
        console.log("error getPorInfectedType");
    }
}







consulta.get_for_channel = async(req,res) => {
    try {
        const mensajesFiltrados = await registroSchema.find({canal: req.params.canal}).sort({fecha:-1}).limit(50); // LOS DEVUELVE DESCENDENTE
        res.send(mensajesFiltrados);
    } catch (error) {
        console.log(error);
    }
}


consulta.getTop5DerpartamentosInfectados = async(req,res) =>{
    try{
        const top5 = await registroSchema.aggregate([{ "$group": {_id: "$location", count: {$sum:1}}} , {$sort: {"count": -1}} , {$limit: 5}]);
        res.send(top5)
    }catch(error){
        console.log("error en el TOP 5 de departamentos infectados");
    }
}
consulta.regionMasInfectada = async(req,res) =>{
    try{
        const all_ = await registroSchema.aggregate([{ "$group": {_id: "$location", count: {$sum:1}}} , {$sort: {"count": -1}}]);
        res.send(all_)
    }catch(error){
        console.log("error regionMasInfectada");
    }
}

consulta.getForState = async(req,res) =>{
    try{
        const all_ = await registroSchema.aggregate([{ "$group": {_id: "$state", count: {$sum:1}}} , {$sort: {"count": -1}}]);
        res.send(all_)
    }catch(error){
        console.log("error getPorState");
    }
}



consulta.ultimos5casos= async(req,res) =>{
    try {
        const infectados = await registroSchema.find().sort({fecha:-1}).limit(5); // LOS DEVUELVE DESCENDENTE
        res.send(infectados);// devuelve todos los mensajes
    } catch (error) {
        console.log(error);
    }
}




module.exports =  consulta;
