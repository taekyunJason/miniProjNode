const express = require("express");
const mongoose = require("mongoose");
const User = require("../schemas/user");
const router = express.Router(); //router라는 객체를 새롭게 만듦

router.get("/", (req, res) => {});

module.exports = router;
