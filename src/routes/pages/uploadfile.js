const express = require("express");
const router = express.Router();

const uploadController = require("../../app/controllers/pages/UploadController");

router.post("/", uploadController.index);
// router.get('/:slug', productController.show);



module.exports = router;
