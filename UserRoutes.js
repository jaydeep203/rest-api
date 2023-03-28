const express = require("express");

const router = express.Router();
const createProduct = require("./control");

router.route("/new").post(createProduct);

module.exports = router;