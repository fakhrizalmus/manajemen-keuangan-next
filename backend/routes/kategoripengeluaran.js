const express = require("express")
const router = express.Router()
const {getAllKategoriPengeluaran, addKategoriPengeluaran, updateKategoriPengeluaran, deleteKategoriPengeluaran} = require("../controllers/kategoripengeluaran")

router.get("/", getAllKategoriPengeluaran);
router.post("/", addKategoriPengeluaran)
router.put("/:id", updateKategoriPengeluaran)
router.delete("/:id", deleteKategoriPengeluaran)

module.exports = router;