const express = require('express');
const mongoose = require('mongoose');
const {logErrors, errorsHandlers, boomErrorsHandlers} = require('./src/middlewares/handlers/errors.handlers');
require('dotenv').config();

const app = express();
const routerApi = require('./src/routes');

const port = process.env.PORT;

/* Ocupamos el puerto por el cual corre el proyecto */
app.listen(port, () => {
  console.log("Active port ", port);
});


/* conectamos con base de datos */
mongoose
    .connect(process.env.MONGODB_CONNECTION_STRING)
    .then(() => console.log('Success connection with mongo'))
    .catch((error) => console.error(error));

/* ======================== TWILIO ========================*/
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
    body: 'Prueba del uso de Twilio',
    from: '+19548839155',
    to: '+573136414255'
  })
  .then(message => console.log(message.sid));
/* ======================== TWILIO ========================*/


/* ======================== SENDGRID ========================*/
const api_key = process.env.SENDGRID_API_KEY;
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(api_key);

const message = {
  to: 'sebastian.echeverry@autonoma.edu.co',
  from: 'sebastian.echeverry@autonoma.edu.co',
  subject: 'Prueba del uso de SendGrid',
  text: '!Hola mundo¡',
};

sgMail.send(message)
  .then(() => console.log('Emal enviado'))
  .catch((error) => console.log(error.message));
/* ======================== SENDGRID ========================*/


app.use(logErrors);
app.use(errorsHandlers);
app.use(boomErrorsHandlers);

app.use(express.json());
routerApi(app);