const express = require("express")
const router = express.Router()
const {getAllPemasukan, addPemasukan, updatePemasukan, deletePemasukan} = require("../controllers/pemasukan")

router.get("/", getAllPemasukan);
router.post("/", addPemasukan)
router.put("/:id", updatePemasukan)
router.delete("/:id", deletePemasukan)

module.exports = router;