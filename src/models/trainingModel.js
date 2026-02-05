const mongoose = require("mongoose")

const { Schema } = mongoose

const warriorSchema = new Schema({
  name: String,
  weaponName: String,
  durability: Number,
  gold: Number,
  state: String,
});

const trainingSchema = new Schema({
  epicDate: String,
  warriors: [warriorSchema],
});


module.exports = mongoose.model('training', trainingSchema);