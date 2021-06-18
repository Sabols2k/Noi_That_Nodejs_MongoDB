const express = require('express');
const router = express.Router();

const adminlogoutController = require('../../app/controllers/admin/AdminLogoutController');

router.get('/', adminlogoutController.index);




module.exports = router;


