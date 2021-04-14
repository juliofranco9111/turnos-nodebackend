/* 
    Rutas de eventos:

    host + /api/events
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { verifyToken } = require('../middlewares/verify-token');
const { validateFields } = require('../middlewares/validate-fields');
const { getAppointments,
    createAppointments,
    updateAppointment,
    deleteAppointment } = require('../controllers/appointments');
const { isDate } = require('../helpers/isDate');


const router = Router();

//Use middleware for all calls: 
router.use(verifyToken);


// get all Events
router.get('/', getAppointments);

// create Event
router.post('/', [
    check('title', 'El título es obligatorio').not().isEmpty(),
    check('start', 'La fecha de inicio es obligatoria').custom(isDate),
    check('end', 'La fecha de finalización es obligatoria').custom(isDate),
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







