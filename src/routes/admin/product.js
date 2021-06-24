const express = require('express');
const router = express.Router();

const adminproductController = require('../../app/controllers/admin/AdminProductController');

router.post('/create', adminproductController.create);
// router.get('/:id/edit', adminproductController.edit);
router.put('/:id', adminproductController.update);
router.delete('/:id', adminproductController.delete);
router.get('/', adminproductController.index);
// router.get('/:slug', adminproductController.show); login




module.exports = router;


