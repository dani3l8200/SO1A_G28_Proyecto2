const cors = require('cors'); // para la comunicacion con react
const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const morgan = require('morgan');

const { router } = require('./rutas/rutas');

//modulo de express
app = express();


//conexion a la base de datos 
dbConnection();



app.set('port', process.env.PORT || 3000)

//middlawares 
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


// rutas
app.use('/',router);


//levanton del servidor 
app.listen(app.get('port'),()=>{
    console.log(`Servidor en el puerto: ${app.get('port')}`);
})