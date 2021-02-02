//RUTAS PARA AUTENTICAR USUARIOS
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const smsController = require('../controllers/smsController');

//ENVIA SMS
// api/sms
router.post('/',
   [
      check('message', 'Agrega un mensaje').not().isEmpty(),
      check('to_number', 'Agrega un número valido').isLength({ min: 10, max: 14 })
   ],
   smsController.sendSMS
)

module.exports = router;