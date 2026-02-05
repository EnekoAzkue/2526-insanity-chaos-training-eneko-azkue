const Training = require('../models/trainingModel')

const getAllTrainings = async() => {
    try {
        const quests = await Training.find();
        return quests
    } catch(error) {
        throw error
    }
}

const createTraining = async(newTraining) => {
    try {
        let trainingToInsert = new Training(newTraining);
        const createdTrainimg = await trainingToInsert.save();
        return createdTrainimg;
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllTrainings,
    createTraining,
}