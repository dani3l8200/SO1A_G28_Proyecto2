const { Router } = require('express'); 
const router = Router(); 
const {saveMsg} = require('../controllers/mensajeria');
const {get_all_registros  , get_ultimos_5 , getPie_rep3 , rangoEdades } = require('../controllers/consultas');



// r es un bojeto Router
router.route('/mongo/mensajeria/').post(saveMsg);  // http:localhost:3000/mongo/mensajeria         PARA GUARDAR EN LA BASE DE DATOS DE MONGO 


router.route('/consulta/1').get(get_all_registros);             // MONGO
router.route('/consulta/2').get(get_all_registros); // REDIS
router.route('/consulta/3').get(getPie_rep3)                // MONGO
router.route('/consulta/4').get(get_ultimos_5);             // MONGO
router.route('/consulta/5').get(rangoEdades);   //  REDIS


module.exports = {
    router,
};