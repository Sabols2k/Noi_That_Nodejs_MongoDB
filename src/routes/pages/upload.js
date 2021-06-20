const express = require("express");
const router = express.Router();

const uploadController = require("../../app/controllers/pages/UploadController");

router.post("/uploadfile", uploadController.uploadfile);
router.get("/", uploadController.index);
// router.get('/:slug', productController.show);



module.exports = router;
