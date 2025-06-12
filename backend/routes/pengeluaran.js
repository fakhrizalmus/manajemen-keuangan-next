const express = require("express")
const router = express.Router()
const {getAllPengeluaran, addPengeluaran, updatePengeluaran, deletePengeluaran} = require("../controllers/pengeluaran")

router.get("/", getAllPengeluaran);
router.post("/", addPengeluaran)
router.put("/:id", updatePengeluaran)
router.delete("/:id", deletePengeluaran)

module.exports = router;