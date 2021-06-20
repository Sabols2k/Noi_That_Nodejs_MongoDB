const express = require('express');
const router = express.Router();

// const adminController = require('../app/controllers/AdminController');
const adminController = require('../../app/controllers/admin/AdminLoginController');

//Authencation
router.post('/', adminController.login);
router.get('/logout', adminController.logout);
router.get('/', adminController.index);

module.exports = router;


