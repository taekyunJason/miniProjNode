const express = require('express');
const Http = require("http");

const app = express();
const http = Http.createServer(app);

const multer = require('multer'); // express에 multer모듈 적용 (for 파일업로드)
const upload = multer({ dest: 'uploads/' })
// 입력한 파일이 uploads/ 폴더 내에 저장된다.
// multer라는 모듈이 함수라서 함수에 옵션을 줘서 실행을 시키면, 해당 함수는 미들웨어를 리턴한다.

app.get('/', (req, res) => {
	res.render("../views/postingForm");

});

// 업로드 - 파일 업로드 폼
app.get('/upload', function(req, res){
  res.render('upload');
});

app.post('/upload', function(req, res){
  res.send('업로드 성공!');
});

app.post('/upload', upload.single('userfile'), function(req, res){
  res.send('Uploaded! :'+req.file); // object를 리턴함
  console.log(req.file); // 콘솔(터미널)을 통해서 req.file Object 내용 확인 가능.
});

const router = require("./routes/posts");
app.use("/posts", router);

const port = 3300;
http.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static("public"));

const connect = require("./schemas");
connect();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// const requestMiddleware = (req, res, next) => {
//     console.log("클라이언트 입력 주소:", req.originalUrl, "-", new Date())
//     next();
//   }
// app.use(requestMiddleware);