const express = require("express");
const router = express.Router();

const cartController = require("../../app/controllers/pages/CartController");

router.get("/", cartController.index);
router.get("/:slug", cartController.notfoud);





module.exports = router;
