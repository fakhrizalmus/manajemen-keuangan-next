const express = require("express")
const router = express.Router()
const {getAllKategoriPengeluaran, addKategoriPengeluaran, updateKategoriPengeluaran, deleteKategoriPengeluaran} = require("../controllers/kategoripengeluaran")

router.get("/", getAllKategoriPengeluaran);
router.post("/", addKategoriPengeluaran)
router.put("/", updateKategoriPengeluaran)
router.delete("/", deleteKategoriPengeluaran)

module.exports = router;