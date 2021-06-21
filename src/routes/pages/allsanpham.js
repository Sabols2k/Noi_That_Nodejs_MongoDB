const express = require("express");
const router = express.Router();

const AllsanphamController = require("../../app/controllers/pages/AllsanphamController");

router.get("/", AllsanphamController.allsp);
router.get("/:slug", AllsanphamController.notfoud);

module.exports = router;
