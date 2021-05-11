const { response } = require('express');
const Appointment = require('../models/Appointment');


const getAppointmentsByUser = async (req, res = response) => {

    const uid = req.uid;


    try {
        const appointments = await Appointment.find({ user: uid });

        if (!appointments) {
            res.status(404).json({
                ok: false,
                msg: 'No se encontraron turnos para éste usuario'
            });
        }

        res.json({
            ok: true,
            appointments
        })
    }

    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error del servidor'
        });
    }

}



const getAppointmentsByProfessional = async (req, res = response) => {
    const professional = req.uid;

    try {
        const appointments = await Appointment.find({professional}).populate('user')

        if (!appointments) {
            res.status(404).json({
                ok: false,
                msg: 'No se encontraron turnos para éste profesional'
            });
        }

        res.json({
            ok: true,
            appointments
        })
    }

    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error del servidor'
        });
    }
}


const getAppointmentsToConfirm = async (req, res = response) => {
    const professional = req.uid;

    try {
        const data = await Appointment.find({ professional })


        if (!data) {
            res.status(404).json({
                ok: false,
                msg: 'No se encontraron turnos por confirmar'
            });
        }

        const appointments = data.filter(appointment => !appointment.isConfirmed);


        res.json({
            ok: true,
            appointments
        })
    }

    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error del servidor'
        });
    }
}

const getAppointmentsByDate = async (req, res = response) => {
    const start = req.params.start;

    const appointment = await Appointment.find({ start });



    try {
        if (appointment.length < 1) {
            res.status(200).json({
                ok: true,
                msg: 'La fecha y hora seleccionada está disponible'
            });
        } else {
            res.status(200).json({
                ok: false,
                msg: 'La fecha y hora seleccionada no está disponible'
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error del servidor'
        });
    }

}




const createAppointments = async (req, res = response) => {

    const start = req.body.start;

    const appointmentDB = await Appointment.find({ start })

    console.log(appointmentDB)

    if (appointmentDB.length < 1) {
        try {
            const appointment = new Appointment({
                ...req.body,
                isConfirmed: false,
                accomplished: false
            });

            const appointmentDB = await appointment.save();

            res.json({
                ok: true,
                appointment: appointmentDB
            })

        } catch (error) {
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'Error del servidor'
            });
        }
    }else{
        res.status(200).json({
            ok: false,
            msg: 'La fecha y hora seleccionada no está disponible'
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
            msg: 'Error del servidor'
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
            msg: 'Error del servidor'
        });
    }

}


module.exports = {
    getAppointmentsByUser,
    getAppointmentsByProfessional,
    createAppointments,
    updateAppointment,
    deleteAppointment,
    getAppointmentsToConfirm,
    getAppointmentsByDate
}
