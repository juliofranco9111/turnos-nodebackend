/* 
    Rutas de usuarios:

    host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { createUser, createUserProfessional, renewToken, loginUser } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-fields');
const { verifyToken } = require('../middlewares/verify-token');

const router = Router();

router.post('/',[
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
    validateFields,
], loginUser );

router.post('/new-user', [ 
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
    check('document', 'El documento debe tener al menos 6 caracteres').isLength({ min: 5 }),
    check('role', 'El role es necesario, y debe ser de tipo USER_ROLE').not().isEmpty().equals('USER_ROLE'),
    validateFields
 ] , createUser );

 router.post('/new-professional', [ 
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
    check('role', 'El role es necesario, y debe ser de tipo PROFESSIONAL_ROLE').not().isEmpty().equals('PROFESSIONAL_ROLE'),
    check('specialty', 'La especialidad ofrecida es necesaria').not().isEmpty(),
    validateFields
 ] , createUserProfessional );

 

router.get('/renew', verifyToken ,renewToken );


module.exports = router;

