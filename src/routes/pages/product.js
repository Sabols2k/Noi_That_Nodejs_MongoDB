const express = require("express");
const router = express.Router();

const productController = require("../../app/controllers/pages/ProductController");

router.get("/test/:page", productController.page);
router.get("/testview", productController.test);
router.get("/testview1", productController.card);
// router.get("/upload", productController.upload);test
// router.post("/uploadfile", productController.uploadfile);allsp


router.get("/all", productController.allsp);
router.get("/show", productController.show);
router.get("/create", productController.create);
router.post("/store", productController.store);
router.get("/:id/edit", productController.edit);
router.put("/:id", productController.update);
router.delete("/:id", productController.destroy);
router.get("/", productController.index);
// router.get('/:slug', productController.show);



module.exports = router;
