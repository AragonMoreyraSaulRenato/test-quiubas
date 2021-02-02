const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: 'variables.env' });
//SE CREAL EL SERIVODR
const app = express();

//HABILITAR EXPRESS.JSON
app.use(express.json({ extended: true }));

//PUERTO DE LA APP
app.set('port', process.env.PORT || 4000);

//PERMITE ACCESOS CRUZADO
app.use(cors());

//IMPORTAR USUARIOS
app.use('/api/sms', require('./routes/sms'));

module.exports = app;