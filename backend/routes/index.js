const express = require("express")
const router = express.Router()
const pemasukan = require("./pemasukan")
const pengeluaran = require("./pengeluaran")
const kategoripengeluaran = require("./kategoripengeluaran")
const kategoripemasukan = require("./kategoripemasukan")

router.use("/pemasukan", pemasukan);
router.use("/pengeluaran", pengeluaran);
router.use("/kategori-pengeluaran", kategoripengeluaran);
router.use("/kategori-pemasukan", kategoripemasukan);

module.exports = router