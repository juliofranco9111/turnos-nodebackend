const { Schema, model } = require("mongoose");



const AppointmentSchema = Schema({

    date: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    professional: {
        type: Schema.Types.ObjectId,
        ref: 'Professional',
        required: true
    },
    isConfirmed: {
        type: Boolean,
        required: true
    },
    accomplished: {
        type: Boolean,
        required: true
    }
    
});

AppointmentSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})


module.exports = model('Appointment', AppointmentSchema);