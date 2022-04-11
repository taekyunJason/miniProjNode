const express = require("express");
const Http = require("http");
const router = express.Router();
const Posting = require("../schemas/posting")
const User = require("../schemas/user");
const jwt = require("jsonwebtoken");

router.use(express.json()); 
router.use(express.urlencoded( {extended : false } ));

const app = express();



//포스팅 입력값 저장
router.post("/chair/add", async(req, res) => {
  res.send("Posting save")
  let { itemName, content, imageUrl, category } = req.body;
  let createdAt = new Date
  let likeCnt = 0
  let commentCnt = 0
    await Posting.create({ postId: postId, itemName: itemName, content: content, createdAt: createdAt, imageUrl: imageUrl, category: category, likeCnt: likeCnt, commentCnt: commentCnt});
  });


  //포스팅 수정 값 저장
router.post("/edit/:postId", async(req, res) => {
  const postId = req.params.postNumber;
  let { content } = req.body;
  await Writing.updateOne({ "postId" : postId },{ $set: req.body})
    res.send("저장이 완료되었습니다!")
  });
 

// //포스팅 목록 조회
// router.get("/postingListView", async (req, res) => {  
// 	const writing = await Writing.find().sort({date: -1});
// 	res.json({ writing });
//   //const  { authorization }  = req.headers;
//   //console.log(authorization)

//   });

// router.get("/postingList", async (req, res) => {
// 	res.render("../views/postingList");

//   });

// //포스팅 세부 조회  데이터
// router.get("/postingLists/:postNumber", async (req, res) => {
  
//     const postNumber = req.params.postNumber;
//     const isExist = await Writing.findOne({postNumber});
//     const result = {
//         name: isExist["name"],
//         title: isExist["title"],
//         content: isExist["content"],
//         date: isExist["date"],
//         postNumber: isExist["postNumber"],
//         postPassword: isExist["postPassword"],
//     };   
//     res.json({ result });    
// });

// //포스팅 세부 조회  데이터가 담긴 양식
// router.get("/postingList/:postNumber", async (req, res) => {
//   res.render("../views/postingView");
// });



// //포스팅 삭제
// router.post("/postingLists/:postNumber/delete", async (req, res) => {  
//   const postNumber = req.params.postNumber;
//   let { deletePassword } = req.body;
//   const existsWriting = await Writing.findOne({ postNumber });
//   const postPassword = existsWriting.postPassword;
//   if (deletePassword == postPassword) {
//     await Writing.deleteOne({ postNumber });
//     res.json({ result: "success" });
//     return;
//   }
//   else{ res.json({ result: "fail" });

//   }
// });

// //포스팅 수정 양식
// router.get("/postingLists/:postNumber/edit", (req, res) => {
//   res.render("../views/postingFormEdit");
// });

// // 포스팅 수정을 위한 비밀번호 확인
// router.post("/postingLists/:postNumber/editdata", async (req, res) => {
//   const postNumber = req.params.postNumber;
//   let { editPassword } = req.body;
//   const existsWriting = await Writing.findOne({ postNumber });
//   const postPassword = existsWriting.postPassword;
//   if (editPassword == postPassword) {
//   res.json({ result: "success" });
//   return;}
//   else{ res.json({ result: "fail" });
// }
// });



// //포스팅 양식
// router.get('/postingForm', (req, res) => {
//   res.render("../views/postingForm");
// });



// //회원가입 양식
// router.get('/user', (req, res) => {
// 	res.render("../views/register");
// });

// //회원가입 닉네임 중복확인
// router.post("/check_id", async (req, res) => {
//   let {nickname} = req.body;
//   console.log(nickname);
//   // nickname이 동일한게 이미 있는지 확인하기 위해 가져온다.
//   const exists = await User.findOne({nickname});
//   res.json({ 'result': 'success', 'exists': exists });
// });

// // 회원가입 입력값 저장
// router.post("/usersave", async (req, res) => {
//   let { name, nickname, password } = req.body;
//   const user = new User({ name, nickname, password });
//   await user.save();
//   res.json({ 'result': 'success'});
// });

// // 로그인 페이지
// router.get('/login', (req, res) => {
// 	res.render("../views/login");
// });

// // 로그인 토큰 발급
// router.post("/auth", async (req, res) => {
//   const { nickname, password } =req.body;
//   const user = await User.findOne({ nickname });
//   if (!user || password !== user.password) {
//     res.json({ 'result': 'fail', 'msg': "닉네임 또는 비밀번호가 등록된 정보와 일치하지 않습니다" }); 
//     return;
//   }
//   else{ const token = jwt.sign({ userId: user.userId, exp: Math.floor(Date.now() / 1000) + (60 * 60), }, "secret-key")
//   res.json({ 'result': 'success', 'token': token }); 
//   console.log(jwt.verify(token, "secret-key" ))
// }
// });


module.exports = router;

