const express = require("express");
const router = express.Router()
const {postSignup, getSignup} = require ("../controllers/user.controller")

router.get("/signup", getSignup)
router.post("/register", postSignup)


module.exports = router;