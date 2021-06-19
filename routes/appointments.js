/* 
    Rutas de eventos:

    host + /api/turnos
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { verifyToken } = require('../middlewares/verify-token');
const { validateFields } = require('../middlewares/validate-fields');
const { getAppointmentsByUser,
    getAppointmentsByProfessional,
    getAppointmentsToConfirm,
    createAppointments,
    updateAppointment,
    getAppointmentsByDate,
    deleteAppointment, 
    getAppointmentsByMonth} = require('../controllers/appointments');
const { isDate } = require('../helpers/isDate');


const router = Router();

//Use middleware for all calls: 
router.use(verifyToken);


// get Events
router.get('/usuario/', verifyToken, getAppointmentsByUser);
router.get('/date/:start', verifyToken, getAppointmentsByDate);
router.get('/profesional/', verifyToken, getAppointmentsByProfessional);
router.get('/profesional-pending', verifyToken, getAppointmentsToConfirm);
router.get('/profesional/:month', verifyToken, getAppointmentsByMonth);

// create Event
/* router.post('/', [
    check('title', 'El título es obligatorio').not().isEmpty(),
    check('start', 'La fecha de inicio es obligatoria').custom(isDate),
    check('end', 'La fecha de finalización es obligatoria').custom(isDate),
    validateFields
], createAppointments); */
router.post('/', [
    check('professional', 'El profesional es obligatorio').not().isEmpty(),
    check('user', 'El usuario es obligatorio').not().isEmpty(),
    check('start', 'La fecha incial es obligatoria').custom(isDate),
    check('end', 'La fecha final es obligatoria').custom(isDate),
    validateFields
], createAppointments);

// update Event
router.put('/:id', [
    check('title', 'El título es obligatorio').not().isEmpty(),
    check('start', 'La fecha de inicio es obligatoria').custom(isDate),
    check('end', 'La fecha de finalización es obligatoria').custom(isDate),
    validateFields
], updateAppointment);

// delete Event
router.delete('/:id', deleteAppointment);











module.exports = router;







