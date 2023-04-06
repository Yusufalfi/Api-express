const express = require('express');

const router = express.Router();
const authController = require('../controllers/authCtr')

router.post('/register', authController.register )

module.exports = router;