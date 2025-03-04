const mongoose = require('mongoose');

// const mongoosePaginate = require('mongoose-paginate-v2');

const trainerSchema = new mongoose.Schema({
  fname: {
    type: String,
    default: false
  },
  lname: {
    type: String,
    default: false
  },
  age: {
    type: Number,
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

const Trainer = mongoose.model('trainers', trainerSchema);
module.exports = Trainer