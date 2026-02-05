const trainingService = require('../service/trainingService');

const getAllTrainings = async (res) => {
  try {
    const allTrainings = await trainingService.getAllTrainings();
    if (allTrainings.length === 0) {
      return res.status(404).send({ message: "No existen trainings" })
    }
    res.send({ status: "OK", data: allTrainings })
  } catch (error) {
    res
      .status(500)
      .send({
        status: "FAILED",
        message: "Error al realizar la peticion:",
        data: { error: error?.message || error }
      });
  }
};

const createTraining = async (res) => {
  try {
    const createdQuest = await trainingService.createTraining()
    res.send({ data: createdQuest })
  } catch (error) {
    res
      .status(500)
      .send({
        status: "FAILED",
        message: "Error al realizar la peticion:",
        data: { error: error?.message || error }
      });
  }
}

module.exports = {
  getAllTrainings,
  createTraining,
}