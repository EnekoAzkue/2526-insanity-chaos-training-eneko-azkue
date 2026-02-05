const express = require('express')
const router = express.Router()

const trainingController = require('../controller/trainingsController');

router.get('/all', trainingController.getAllTrainings)

router.post('/post', trainingController.createTraining)

module.exports = router;