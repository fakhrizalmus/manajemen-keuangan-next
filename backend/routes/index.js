const express = require("express")
const router = express.Router()
const pemasukan = require("./pemasukan")
const pengeluaran = require("./pengeluaran")
const kategoripengeluaran = require("./kategoripengeluaran")
const kategoripemasukan = require("./kategoripemasukan")
const dashboard = require("./dashboard")
const user = require("./user")
const restrict = require("../misc/passport");

router.use("/pemasukan", restrict, pemasukan);
router.use("/pengeluaran", restrict, pengeluaran);
router.use("/kategori-pengeluaran", restrict, kategoripengeluaran);
router.use("/kategori-pemasukan", restrict, kategoripemasukan);
router.use("/dashboard", restrict, dashboard)
router.use("/auth", user)

module.exports = router