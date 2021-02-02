const { validationResult } = require('express-validator');


const fetch = require('node-fetch');

exports.sendSMS = async (req, res) => {
   //SI EXISTEN ERRORES
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }

   //EXTRAER EL NUMERO Y EL MENSAJE
   const { to_number, message } = req.body;

   const URL = `${process.env.API_QUIUBAS}`
   const AUTHORIZATION = `Basic ${process.env.BASIC_AUTHORIZATION}`
   try {

      const resp = await fetch(URL,
         {
            method: 'POST',
            body: JSON.stringify({ to_number, message }),
            headers: {
               'Content-Type': 'application/json',
               'Authorization': AUTHORIZATION
            }
         });
      const response = await resp.json();
      if (!response.error) {
         return res.json({ msg: "SMS Enviado exitosamente", ...response });
      } else return res.json({ msg: "Ha ocurrido un error", ...response });
   } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Ha ocurrido un error" });
   }
}