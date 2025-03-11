const mongoose = require("mongoose")

const TrainerSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    phone: {
        type: String,
    },
    password: {
        type: String,
    },
    gym: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Gym",
    },
    trainees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Trainee",
    }],
    schedule: [{
        day: String,
        startTime: String,
        endTime: String,
    }],
    rating: { // Average rating from trainees
        type: Number,
        default: 0,
    },
    token: {
        type: String,
    },
    refresh_token: {
        type: String,
    },
}, {
    timestamps: true,
})


TrainerSchema.index({
    firstName: 'text',
    lastName: 'text',
})

module.exports = mongoose.model("Trainer", TrainerSchema)