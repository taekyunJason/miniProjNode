//express 모듈 불러오기
const express = require("express");
const cors = require("cors")
const postRouter = require("./routes/posts")//router폴더 안에 있는 기능을 서버로 가져와서 postRouter변수에 넣어
const commentRouter = require("./routes/comments")
const loginRouter = require("./routes/logins");
const router = require("./routes/posts");
const connect = require("./schemas");
connect();

const app = express();
const port = 3000;

// const multer = require('multer'); // express에 multer모듈 적용 (for 파일업로드)
// const upload = multer({ dest: 'uploads/' })
// // 입력한 파일이 uploads/ 폴더 내에 저장된다.
// // multer라는 모듈이 함수라서 함수에 옵션을 줘서 실행을 시키면, 해당 함수는 미들웨어를 리턴한다.

// app.get('/', (req, res) => {
// 	res.render("../views/postingForm");

// });

// // 업로드 - 파일 업로드 폼
// app.get('/upload', function(req, res){
//   res.render('upload');
// });

// app.post('/upload', function(req, res){
//   res.send('업로드 성공!');
// });

// app.post('/upload', upload.single('userfile'), function(req, res){
//   res.send('Uploaded! :'+req.file); // object를 리턴함
//   console.log(req.file); // 콘솔(터미널)을 통해서 req.file Object 내용 확인 가능.
// });

// const router = require("./routes/posts");
// app.use("/posts", router);


app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static("public"));



//접속 로그
const requestMiddleware = (req, res, next) => {
  console.log("request Url : ", req.originalUrl, "-", new Date());
  next();
};



//미들웨어
app.use(cors());
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




//서버 연결
app.listen(port, () => {
  console.log(port, "번으로 서버가 켜졌어요!");
});

