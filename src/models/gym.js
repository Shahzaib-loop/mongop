const mongoose = require("mongoose")

const GymSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    address: {
        type: String,
    },
    phone: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    trainers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Trainer",
    }],
    trainees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Trainee",
    }],
    subscriptionPlan: { // Could be "monthly", "yearly", etc.
        type: String,
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

module.exports = mongoose.model("Gym", GymSchema)
