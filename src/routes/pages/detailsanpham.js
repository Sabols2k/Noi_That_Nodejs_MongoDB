const express = require("express");
const router = express.Router();

const DetailsanphamController = require("../../app/controllers/pages/DetailsanphamController");

router.get("/:id", DetailsanphamController.index);
router.get("/", DetailsanphamController.notfoud);

module.exports = router;
