const express = require("express");
const router = express.Router();

const homeController = require("../../app/controllers/pages/HomeController");

router.get("/", homeController.index);
router.get("/:slug", homeController.notfoud);





module.exports = router;
