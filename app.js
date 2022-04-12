const express = require('express');
const Http = require("http");

const app = express();
const http = Http.createServer(app);


app.get('/', (req, res) => {
	res.render("../views/postingForm");
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