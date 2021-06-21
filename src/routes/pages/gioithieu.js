const express = require("express");
const router = express.Router();

const GioithieuController = require("../../app/controllers/pages/GioithieuController");

router.get("/", GioithieuController.index);
router.get("/:slug", GioithieuController.notfoud);





module.exports = router;
