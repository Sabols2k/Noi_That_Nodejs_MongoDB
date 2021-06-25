const express = require("express");
const router = express.Router();

const CheckoutController = require("../../app/controllers/pages/CheckoutController");

router.post("/create", CheckoutController.create);
router.get("/", CheckoutController.index);
router.get("/:slug", CheckoutController.notfoud);

module.exports = router;
