const express = require('express');
const router = express.Router();

// const adminController = require('../app/controllers/AdminController');
const RegisterController = require('../../app/controllers/pages/RegisterController');

//Authencation
router.post('/', RegisterController.register);
router.get('/', RegisterController.index);

module.exports = router;


