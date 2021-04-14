const { Router } = require('express');
const { getUserByDocument, getUserById } = require('../controllers/user');
const { verifyToken } = require('../middlewares/verify-token');

const router = Router();

router.get('/documento/:document',[] , getUserByDocument);
router.get('/id/:id', verifyToken , getUserById);


 module.exports = router;