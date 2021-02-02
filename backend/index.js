
const app = require('./app');

//INICIAR LA APP
app.listen(app.get('port'), '0.0.0.0', () => {
   console.log(`Server is working in port ${app.get('port')}`);
})

module.exports = app;