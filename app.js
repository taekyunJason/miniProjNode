const express = require('express'); //express의 패키지를 가져오는 코드
const app = express();// express를 app이라는 변수에 넣어서 함수처럼 사용
const port = 3300;     //3300번 포트로 열어 로컬환경에서 서버를 켜주는 코드
const postRouter = require("./routes/posts")//router폴더 안에 있는 기능을 서버로 가져와서 postRouter변수에 넣어
const commentRouter = require("./routes/comments")
const connect = require("./schemas")



connect();

//app.use : 미들웨어를 사용할 때 쓰는 코드
app.use(express.static("static"));
app.use(express.json());
app.use("/api", [postRouter], [commentRouter]);


app.get("/", (req, res) => {
    res.sendFile(__dirname + "");
});

app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/static/login.html");
});

app.get("/register", (req, res) => {
    res.sendFile(__dirname + "/static/register.html");
});

app.get("/write", (req, res) => {
    res.sendFile(__dirname + "/static/write.html");
});

app.get("/view", (req, res) => {
    res.sendFile(__dirname + "/static/view.html");
});

app.get("/edit", (req, res) => {
    res.sendFile(__dirname + "/static/edit.html");
});


// app.get('/', (req, res) => {
//     res.send('Hi')
//     //send메소드는 Ajax요청을 서버로 전달한다.
//     //send();        GET 방식
//     //send(문자열);  POST 방식
// })

app.listen(port, () => {
    console.log(port, "서버가 연결되었습니다.")
})


