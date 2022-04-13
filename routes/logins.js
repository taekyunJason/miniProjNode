const express = require("express");
const mongoose = require("mongoose");
const User = require("../schemas/user");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const authMiddleware = require("../API_Check/authCheck/authMiddleware");
const router = express.Router(); //router라는 객체를 새롭게 만듦

router.post("/login/signUp", async (req, res) => {
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
      errorMessage: "이미 등록된 아이디 또는 닉네임입니다.",
    });
    return;
  }

  const user = new User({ userId, userNickname, password, userAge });
  await user.save();
  res.status(201).send({});
});

// router.post("/idCheck", async (req, res) => {
//   // const { userId, userNickname } = req.body;
// });

router.post("/login/reqLogin", async (req, res) => {
  const { userId, password } = req.body;
  const user = await User.findOne({ userId, password }).exec();
  console.log(user)
  if (!user) {
    res.status(401).send({
      errorMessage: "아이디 혹은 비밀번호가 잘못되었습니다.",
    });
    return;
  }
  const userNickname = user.userNickname
  const userAge = user.userAge;
  const token = jwt.sign({ userId: user.userId }, "my-secret-key");
  //console.log(user)
  res.send({token, userId, userNickname,userAge});
});

// router.get("/login/isLogin", authMiddleware, (req, res) => {
//   console.log(res.locals);
// });

// router.get("/login/getUser", authMiddleware, (req, res) => {
//   const { user } = res.locals;
//   res.send({ user });
// });

router.get("/login/logOut", (req, res) => {
  localStorage.clear();
  window.location.href = "/";
  console.log("로그아웃 되었습니다.");
});

module.exports = router;
