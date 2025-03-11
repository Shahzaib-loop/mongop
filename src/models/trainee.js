const mongoose = require("mongoose")

const TraineeSchema = new mongoose.Schema({
    name: {
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
    trainer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Trainer",
    },
    workoutPlan: [{
        exercise: {
            type: String,
        },
        sets: {
            type: Number,
        },
        reps: {
            type: Number,
        },
        weight: {
            type: Number,
        },
        position: {
            type: String,
        },
        warmupTime: {
            type: Number,
        },
        notes: {
            type: String,
        },
        progress: [{
            date: {
                type: Date,
            },
            completedSets: {
                type: Number,
            },
            completedReps: {
                type: Number,
            },
            feedback: {
                type: String,
            },
        }],
    }],
    attendance: [{
        date: {
            type: Date,
        },
        status: {
            type: String,
            enum: ["Present", "Absent", "Late"],
        },
    }],
    payments: [{
        amount: {
            type: Number,
        },
        date: {
            type: Date,
        },
        status: {
            type: String,
            enum: ["Paid", "Pending"],
        },
    }],
    token: {
        type: String,
    },
    refresh_token: {
        type: String,
    },
}, {
    timestamps: true,
})

module.exports = mongoose.model("Trainee", TraineeSchema)
