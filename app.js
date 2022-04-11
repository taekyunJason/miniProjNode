//express 모듈 불러오기
const express = require("express");
const router = require("./routes/logins");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const port = 3000;

const token = jwt.sign({ test: true }, "my-secret-key");
console.log(token);

//express 사용
const app = express();

mongoose.connect("mongodb://localhost/miniProjDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

//Express 4.16.0버전 부터 body-parser의 일부 기능이 익스프레스에 내장 body-parser 연결
app.use(express.json());

app.use("/", router);
app.use(express.static("templates"));

app.get("/logins", (req, res) => {
  console.log("로그인 화면 입니다.");
  res.sendFile(__dirname + "/templates/login.html");
});
// http listen port 생성 서버 실행
app.listen(port, () => {
  console.log(port, "번으로 서버가 켜졌어요!");
});
