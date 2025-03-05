const mongoose = require('mongoose')

// const mongoosePaginate = require('mongoose-paginate-v2')

const trainerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    default: false
  },
  lastName: {
    type: String,
    default: false
  },
  age: {
    type: Number,
    default: false
  },
  weight: {
    type: Number,
    default: false
  },
  medicalCondition: {
    type: String,
    default: false
  },
  height: {
    type: Number,
    default: false
  },
  job: {
    type: String,
    default: false
  },

}, {
  timestamps: true
})

trainerSchema.index({
  fname: 'text',
  lname: 'text',
})
// trainerSchema.paginate({}, { page: 1, limit: 10 })

const Trainer = mongoose.model('trainers', trainerSchema)
module.exports = Trainer