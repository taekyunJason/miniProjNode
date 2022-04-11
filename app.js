//express 모듈 불러오기
const express = require("express");
const mongoose = require("mongoose");
const connect = require("./schemas/index");
const app = express();
const port = 3000;

connect();

//접속 로그
const requestMiddleware = (req, res, next) => {
  console.log("request Url : ", req.originalUrl, "-", new Date());
  next();
};

//라우터 불러오기
const loginRouter = require("./routes/logins");

//미들웨어
app.use(express.json());
app.use(requestMiddleware);

//라우터 연결
app.use("/", [loginRouter]);

app.get("/logins", (req, res) => {
  console.log("로그인 화면 입니다.");
  res.sendFile(__dirname + "/templates/index.html");
});

app.get("/main", (req, res) => {
  console.log("로그인 화면 입니다.");
  res.sendFile(__dirname + "/templates/main.html");
});

//서버 연결
app.listen(port, () => {
  console.log(port, "번으로 서버가 켜졌어요!");
});
