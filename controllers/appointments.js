const { response } = require('express');
const Appointment = require('../models/Appointment');

const getAppointments = async (req, res = response) => {

    const appointments = await Appointment.find().populate('user', 'name');


    res.json({
        ok: true,
        appointments
    })
}

const createAppointments = async (req, res = response) => {

    const appointment = new Appointment(req.body);
    appointment.user = req.uid;

    try {

        const appointmentDB = await appointment.save();

        res.json({
            ok: true,
            appointment: appointmentDB

        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const updateAppointment = async (req, res = response) => {

    const appointmentId = req.params.id;
    const uid = req.uid;


    try {

        const appointmentDB = await Appointment.findById(eventId);

        if (!appointmentDB) {
            res.status(404).json({
                ok: false,
                msg: 'Turno no encontrado'
            });
        };

        if (appointmentDB.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene permisos para editar este turno'
            });
        }

        const newAppointment = {
            ...req.body,
            user: uid
        }

        const appointmentUpdated = await Appointment.findByIdAndUpdate(appointmentId, newAppointment, {
            new: true,
            useFindAndModify: false
        })

        res.json({
            ok: true,
            appointment: appointmentUpdated
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }


}

const deleteAppointment = async (req, res = response) => {

    const appointmentId = req.params.id;
    const uid = req.uid
    
    try {
        const appointmentDB = await Appointment.findById(appointmentId);

        if (!appointmentDB) {
            res.status(404).json({
                ok: false,
                msg: 'Turno no encontrado'
            });
        };
    
        if (appointmentDB.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene permisos para editar este evento'
            });
        }
        
        await Appointment.findByIdAndDelete(appointmentDB.id);

        res.json({
            ok: true,
            msg: 'Turno eliminado satisfactoriamente'
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}


module.exports = {
    getAppointments,
    createAppointments,
updateAppointment,
deleteAppointment
}
