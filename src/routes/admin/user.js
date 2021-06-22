const express = require('express');
const router = express.Router();

const adminuserController = require('../../app/controllers/admin/AdminUserController');

router.get('/test/:page', adminuserController.page);
// router.get('/show', adminuserController.show);
router.get('/create', adminuserController.create);
router.post('/store', adminuserController.store);
router.get('/:id/edit', adminuserController.edit);
router.put('/:id', adminuserController.update);
router.delete('/:id', adminuserController.destroy);
router.get('/', adminuserController.index);
// router.get('/:slug', adminuserController.show); login




module.exports = router;


