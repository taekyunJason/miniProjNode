const express = require("express");
const mongoose = require("mongoose");
const User = require("../schemas/user");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const authMiddleware = require("../API_Check/authCheck/authMiddleware");
const router = express.Router(); //router라는 객체를 새롭게 만듦

router.post("/signUp", async (req, res) => {
  const { userId, password, passwordCheck, userNickname, userAge } = req.body;
  console.log(req.body);
  // const salt = crypto.randomBytes(128).toString("base64");
  // const pwHash = crypto
  //   .createHash("sha512")
  //   .update(password + salt)
  //   .digest("hex");

  if (password !== passwordCheck) {
    res.status(400).send({
      errorMessage: "비밀번호가 일치하지 않습니다.",
    });
    return;
  }

  const existUser = await User.find({
    $or: [{ userId }, { userNickname }],
  });
  if (existUser.length) {
    res.status(400).send({
      errorMessage: "이미 등록된 아이디입니다.",
    });
    return;
  }

  const user = new User({ userId, userNickname, password, userAge });
  await user.save();
  res.status(201).send({});
});

router.post("/idCheck", async (req, res) => {
  // const { userId, userNickname } = req.body;
});

router.post("/reqLogin", async (req, res) => {
  const { userId, password } = req.body;

  const token = jwt.sign({ test: true }, "my-secret-key");
  // console.log(token);
});

router.get("/isLogin", authMiddleware, (req, res) => {});

router.get("/getUser", authMiddleware, (req, res) => {
  const { user } = res.locals;

  res.send({ user });
});

router.get("/logOut", (req, res) => {
  localStorage.clear();
  window.location.href = "/";
  console.log("로그아웃 되었습니다.");
});

module.exports = router;
