const express = require('express');
const router = express.Router();

const adminController = require('../app/controllers/AdminController');

//Authencation
router.use('/login', adminController.login_UI);
router.use('/login1', adminController.login);
router.post('/authenticate', adminController.authenticateSchema, adminController.authenticate);
router.post('/refresh-token',adminController.refreshToken);

// router.get('/show', adminController.show);
router.get('/create', adminController.create);
router.post('/store', adminController.store);
router.get('/:id/edit', adminController.edit);
router.put('/:id', adminController.update);
// router.get('/:id', adminController.showuser);
router.get('/abctest', adminController.showuser);
router.delete('/:id', adminController.destroy);
router.get('/', adminController.index);
// router.get('/:slug', adminController.show); login



module.exports = router;


