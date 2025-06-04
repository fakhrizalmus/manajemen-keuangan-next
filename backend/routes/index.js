const express = require("express")
const router = express.Router()
const pemasukan = require("./pemasukan")
const pengeluaran = require("./pengeluaran")
const kategoripengeluaran = require("./kategoripengeluaran")

router.use("/pemasukan", pemasukan);
router.use("/pengeluaran", pengeluaran);
router.use("/kategori-pengeluaran", kategoripengeluaran);

module.exports = router