const express = require("express")
const router = express.Router()
const pemasukan = require("./pemasukan")

router.use("/pemasukan", pemasukan);

module.exports = router