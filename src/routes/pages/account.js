const express = require("express");
const router = express.Router();

const AccountController = require("../../app/controllers/pages/AccountController");

router.get("/", AccountController.index);
router.get("/:slug", AccountController.notfoud);



module.exports = router;
