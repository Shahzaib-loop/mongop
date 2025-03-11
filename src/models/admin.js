const mongoose = require("mongoose")

const AdminSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
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

module.exports = mongoose.model("Admin", AdminSchema)
