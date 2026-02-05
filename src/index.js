const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cron = require('node-cron');
// const mongodbRoute = "mongodb+srv://enekoazkue:passwd@cluster0.hjijrfb.mongodb.net/Quest?retryWrites=true&w=majority&appName=Cluster0"
const mongodbRoute = "mongodb+srv://enekoazkue:enekoazkue@cluster0.0itplxv.mongodb.net/insanity"

const trainingRouter = require('./router/trainingRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/', trainingRouter);

async function start() {
  try {
    await mongoose.connect(mongodbRoute);
    app.listen(PORT, () => {
      console.log(`API is listening on port ${PORT}`)
    });
    console.log('Conexion con mongo correcta.')
  }
  catch (error) {
    console.log(`Error al conectar a la base de datos: ${error.message}`)
  }

  // cron.schedule('* * * * * *', () => {
  //   console.log('running a task every s');
  // });

  // cron.schedule('*/5 * * * * *', () => {
  //   console.log('running a task every 5s');
  // });
}

start()