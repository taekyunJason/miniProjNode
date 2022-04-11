const express = require("express");
const Posts = require("../schemas/posts");
const router = express.Router(); //router라는 객체를 새롭게 만듦

router.get("/", (req, res) => {
  console.log("로그인 화면입니다");
  const path = require("path");
  res.sendFile(path.join(__dirname + "/templates/login.html"));
});
