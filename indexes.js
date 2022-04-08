const { swaggerUi, specs } = require("./swagger/swagger");
const express = require("express");
const api = require("./routers");

const router = express.Router();
const port = 3300;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", api);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use("/", express.urlencoded({ extended: false }), router);
app.use(express.static("templates"));

/**
 * 파라미터 변수 뜻
 * req : request 요청
 * res : response 응답
 */

/**
 * @path {GET} http://localhost:3000/
 * @description 요청 데이터 값이 없고 반환 값이 있는 GET Method
 */
app.get("/", (req, res) => {
  //Hello World 데이터 반환
  res.send("Hello World");
});

// http listen port 생성 서버 실행
app.listen(port, () => {
  console.log(port, "서버가 연결되었습니다.");
});
