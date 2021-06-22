const express = require('express');
const router = express.Router();

const adminController = require('../../app/controllers/admin/AdminController');

router.get('/test/:page', adminController.page);
// router.get('/show', adminController.show);
router.get('/create', adminController.create);
router.post('/store', adminController.store);
router.get('/:id/edit', adminController.edit);
router.put('/:id', adminController.update);
router.delete('/:id', adminController.destroy);
router.get('/', adminController.index);
// router.get('/:slug', adminController.show); login




module.exports = router;


