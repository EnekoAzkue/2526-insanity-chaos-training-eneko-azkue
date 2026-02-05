const Training = require('../database/trainings');


const getAllTrainings = async () => {
  try {
    const allTrainings = Training.getAllTrainings();
    return allTrainings
  } catch (error) {
    throw error
  }
}

const createTraining = async (trainingState) => {
  try {
    const training = Training.createTraining(trainingState);
    return training
  } catch (error) {
    throw error
  }
}

module.exports = {
  getAllTrainings,
  createTraining,
}