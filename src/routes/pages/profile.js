const express = require("express");
const router = express.Router();

const DetailuserController = require("../../app/controllers/pages/DetailuserController");

router.get("/", DetailuserController.index);
router.get("/", DetailuserController.notfoud);

module.exports = router;
