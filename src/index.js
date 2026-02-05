const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cron = require('node-cron');
const trainingService = require('./service/trainingService');
const helpers = require('./helpers/functions')
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
    });
  }
  catch (error) {
    console.log(`Error al conectar a la base de datos: ${error.message}`)
  }

  helpers.initialMessage()
  const warriorsAfterEquip = helpers.asignWeapons()
  
  let roundData = {
    roundNum: 1,
    month: "Frostmarch",
    day: 30,
    hour: 13,
  }

  let trainingState = {
    epicDate: '',
    warriors: []
  }
  const round = cron.schedule('*/4 * * * * *', () => {
    trainingState = helpers.createRound(roundData, warriorsAfterEquip)
    
  });

  cron.schedule('*/30 * * * * *', () => {
    if(trainingState) {
      console.log('Training state saved in DB at', trainingState.epicDate);
      trainingService.createTraining(trainingState)
    }
  });

  
}

start()