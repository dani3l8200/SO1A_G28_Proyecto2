const { Router } = require('express'); 
const router = Router(); 
const {saveMsg , test} = require('../controllers/mensajeria');
const {get_All_msg , get_for_channel , getTop5DerpartamentosInfectados,regionMasInfectada,getForState ,getForInfectedType,ultimos5casos ,rangoEdades} = require('../controllers/consultas');

const {getProcs,getRam} = require('../controllers/reportes');

// r es un bojeto Router
router.route('/mensajeria/').post(saveMsg);
router.route('/test/').post(test);
router.route('/consulta/getAllMsg').get(get_All_msg);
router.route('/consulta/getAllMsg/:canal').get(get_for_channel);
router.route('/consulta/ultimos5casos').get(ultimos5casos);
router.route('/consulta/getTop5DerpartamentosInfectados').get(getTop5DerpartamentosInfectados);
router.route('/consulta/regionMasInfectada').get(regionMasInfectada);
router.route('/consulta/getForState').get(getForState);
router.route('/consulta/getForInfectedType').get(getForInfectedType);
router.route('/consulta/rangoEdades').get(rangoEdades);

router.route('/prueba1').get(getRam);
router.route('/prueba2').get(getProcs);
module.exports = {
    router,
};