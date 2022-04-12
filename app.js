//express 모듈 불러오기
const express = require("express");
const cors = require("cors")
const postRouter = require("./routes/posts")//router폴더 안에 있는 기능을 서버로 가져와서 postRouter변수에 넣어
const commentRouter = require("./routes/comments")
const loginRouter = require("./routes/logins");
const connect = require("./schemas");
const router = require("./routes/posts");


const app = express();
const port = 3000;

connect();

//접속 로그
const requestMiddleware = (req, res, next) => {
  console.log("request Url : ", req.originalUrl, "-", new Date());
  next();
};



//미들웨어

app.use("/posts", router);
app.use(express.json());
app.use(requestMiddleware);
app.use(express.urlencoded({extended: false}));
app.use(express.static("templates"));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//라우터 연결
app.use("/", [loginRouter, postRouter, commentRouter]);

app.get("/", (req, res) => {
  
  res.sendFile(__dirname + "/templates/index.html");
});

app.get("/main", (req, res) => {
  console.log("로그인 화면 입니다.");
  res.sendFile(__dirname + "/templates/main.html");
});

app.get('/posting', (req, res) => {
  res.render("../views/postingForm");
});

app.get('/', cors({origin: "*"}), (req, res, next) => {
  res.sendStatus(200);
});

app.post('/', cors({origin: "*"}), (req, res, next) => {
  res.sendStatus(200);
});


//서버 연결
app.listen(port, () => {
  console.log(port, "번으로 서버가 켜졌어요!");
});

