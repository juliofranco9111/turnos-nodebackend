const { Schema, model } = require("mongoose");


const UserSchema = Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    document:{
        type: String,
        required: true
    },
    img:{
        type: String,
        
    },
    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        required: true
    }

});


module.exports = model( 'User', UserSchema, 'users'  );


