const express = require('express');
const router = express.Router();

const AdminadminController = require('../../app/controllers/admin/AdminadminController');

router.post('/create', AdminadminController.create);
// router.get('/:id/edit', AdminadminController.edit);
router.put('/:id', AdminadminController.update);
router.delete('/:id', AdminadminController.delete);
router.get('/', AdminadminController.index);
// router.get('/:slug', AdminadminController.show); login


module.exports = router;


