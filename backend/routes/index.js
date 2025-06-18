const express = require("express")
const router = express.Router()
const pemasukan = require("./pemasukan")
const pengeluaran = require("./pengeluaran")
const kategoripengeluaran = require("./kategoripengeluaran")
const kategoripemasukan = require("./kategoripemasukan")
const dashboard = require("./dashboard")
const user = require("./user")

router.use("/pemasukan", pemasukan);
router.use("/pengeluaran", pengeluaran);
router.use("/kategori-pengeluaran", kategoripengeluaran);
router.use("/kategori-pemasukan", kategoripemasukan);
router.use("/dashboard", dashboard)
router.use("/auth", user)

module.exports = router