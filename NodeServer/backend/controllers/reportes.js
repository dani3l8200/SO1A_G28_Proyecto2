const reporte = {};
const fs = require('fs');

reporte.getRam = (req,res) =>{
    try {
        let ram;
        fs.readFile('/proc/ram_module.json', (err, data) => {
            if (err) throw err;
            ram = JSON.parse(data);
            res.send(ram);
        });
    } catch (error) {
        console.log(error);
    }
}

reporte.getProcs = (req,res) =>{
    try {
        let ram;
        fs.readFile('/proc/process_module.json', (err, data) => {
            if (err) throw err;
            ram = JSON.parse(data);
            res.send(ram);
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = reporte;