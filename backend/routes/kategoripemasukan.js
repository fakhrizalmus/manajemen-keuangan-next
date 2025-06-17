const express = require("express")
const router = express.Router()
const {getAllKategoriPemasukan, addKategoriPemasukan, updateKategoriPemasukan, deleteKategoriPemasukan} = require("../controllers/kategoripemasukan")

router.get("/", getAllKategoriPemasukan);
router.post("/", addKategoriPemasukan)
router.put("/:id", updateKategoriPemasukan)
router.delete("/:id", deleteKategoriPemasukan)

module.exports = router;