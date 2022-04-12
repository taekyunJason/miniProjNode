//express 모듈 불러오기
const express = require("express");
const mongoose = require("mongoose");
const postRouter = require("./routes/posts")//router폴더 안에 있는 기능을 서버로 가져와서 postRouter변수에 넣어
const commentRouter = require("./routes/comments")
const connect = require("./schemas/index");
const app = express();
const express = require('express');

const port = 3300;

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
app.use(express.urlencoded({extended: false}));
app.use(express.static("public"));

const connect = require("./schemas");
connect();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//라우터 연결
app.use("/", [loginRouter, postRouter, commentRouter]);

app.get("/", (req, res) => {
  console.log("로그인 화면 입니다.");
  res.sendFile(__dirname + "/templates/index.html");
});

app.get("/main", (req, res) => {
  console.log("로그인 화면 입니다.");
  res.sendFile(__dirname + "/templates/main.html");
});

app.get('/posting', (req, res) => {
  res.render("../views/postingForm");
});

const router = require("./routes/posts");
app.use("/posts", router);

//서버 연결
app.listen(port, () => {
  console.log(port, "번으로 서버가 켜졌어요!");
});

