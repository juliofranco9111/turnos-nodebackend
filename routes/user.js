/* 

/api/usuario

 */


const { Router } = require('express');
const { getUserByDocument, getUserById, getProfessionals } = require('../controllers/user');
const { verifyToken } = require('../middlewares/verify-token');

const router = Router();

router.get('/documento/:document',[] , getUserByDocument);
router.get('/id/:id', verifyToken , getUserById);
router.get('/profesionales', getProfessionals);


 module.exports = router;