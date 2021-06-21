const express = require("express");
const router = express.Router();

const LienheController = require("../../app/controllers/pages/LienheController");

router.get("/", LienheController.index);
router.get("/:slug", LienheController.notfoud);





module.exports = router;
