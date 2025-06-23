const express = require("express")
const router = express.Router()
const {register, login, infoLogin} = require("../controllers/user")
const restrict = require("../misc/passport");

router.post("/register", register)
router.post("/login", login)
router.get("/infologin", restrict, infoLogin)

module.exports = router