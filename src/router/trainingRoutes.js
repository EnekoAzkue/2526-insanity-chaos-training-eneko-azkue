const express = require('express')
const router = express.Router()

const trainingController = require('../controller/trainingsController');

router.get('/all', trainingController.getAllTrainings)

module.exports = router;