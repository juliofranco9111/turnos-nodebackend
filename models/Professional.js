const { Schema, model } = require("mongoose");


const ProfessionalSchema = Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        required: true
    },

    specialty: {
        type: String,
    }


});


module.exports = model('Professional', ProfessionalSchema, 'users');