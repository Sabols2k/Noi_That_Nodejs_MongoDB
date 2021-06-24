const express = require('express');
const router = express.Router();

const adminuserController = require('../../app/controllers/admin/AdminUserController');

router.post('/create', adminuserController.create);
// router.get('/:id/edit', adminuserController.edit);
router.put('/:id', adminuserController.update);
router.delete('/:id', adminuserController.delete);
router.get('/', adminuserController.index);
// router.get('/:slug', adminuserController.show); login




module.exports = router;


