const controller_mensajeria= {};
const  registroSchema = require('../models/registro');
const redis = require("redis");


const client = redis.createClient({
    host: "34.70.185.180",
    port: 6379,
    auth_pass:
      "rZC8P/36pkIx24KRrDE7L8DeyFAqBK3MZ9F+SHqJpUQExLTvAfTZ0zeMDxkIDSp2UhdAwOJvCaebNY0S",
  });

  const getValueOfKey = (key) => {
    return new Promise((resolve, reject) => {
      client.get(key, (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(data);
      });
    });
};

async function guardarRegistro(req, res) {

    let indice = 0;

    await getValueOfKey('indice').then((resp) => {
        if (resp !== null) {
            indice = resp;
        }else{
            indice = 0;
            client.setex('indice', 3600, '0', (err, resp) => {
                if (err) {
                  return res.send('NO SE CREÓ EL INDICE');
                }
                console.log('indice creado')
              });
        }
    });

    let data = req.body;
    //TODO agregar el valor de key 
    const data_json = JSON.stringify(data);
    client.setex(indice.toString(), 3600, data_json, (err, resp) => {
      if (err) {
        return res.send('NO SE PUDO INSERTAR');
      }
      client.incr('indice', (err,id)=>{
          if(err){
              console.log(err)
          }
      })
      return res.send(resp);
    });

  }


controller_mensajeria.saveMsg = async (req,res)=>{
    const nuevo = new registroSchema(req.body);
    console.log("llego " , req.body)
    try {
       await nuevo.save();// lo guarda en mongo
       guardarRegistro(req,res);// LO GUARDA EN REDIS
     } catch (error) {
        res.status(505).json({Error: error});
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
