const Training = require('../database/trainings');

const getAllTrainings = async() => {
    try {
        const allTrainings = Training.getAllTrainings();
        return allTrainings
    } catch (error) {
        throw error
    }
}

// const createTraining = async(newTraining) => {
//     try {
//         const createdTraining = Training.createTraining(newTraining);
//         return createdTraining;
//     } catch (error) {
//         throw error
//     }
// }

module.exports = {
    getAllTrainings,
    // createTraining,
}