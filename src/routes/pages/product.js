const express = require("express");
const router = express.Router();

const productController = require("../../app/controllers/pages/ProductController");

router.get("/test/:page", productController.page);
router.get("/upload", productController.upload);
router.post("/uploadfile", productController.uploadfile);

router.get("/show", productController.show);
router.get("/create", productController.create);
router.post("/store", productController.store);
router.get("/:id/edit", productController.edit);
router.put("/:id", productController.update);
router.delete("/:id", productController.destroy);
router.get("/", productController.index);
// router.get('/:slug', productController.show);



module.exports = router;