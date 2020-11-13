const mongoose = require('mongoose')

const patientSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    age: {
        type: Number,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    physician: {
        type: String,
        required: true
    }

}) 

module.exports = new mongoose.model('Patient', patientSchema)