const express = require("express");
const Http = require("http");
const router = express.Router();
const Posting = require("../schemas/posting")
const User = require("../schemas/user");
const jwt = require("jsonwebtoken");
const { response } = require("express");

router.use(express.json()); 
router.use(express.urlencoded( {extended : false } ));

const app = express();

router.get("/", (req, res) =>{
  res.send("/posts 경로에 해당합니다")
})

//포스팅 입력값 저장-chair
router.post("/chair/add", async(req, res) => {
  let { itemName, content, imageUrl, category, writer } = req.body;
  let postNumber = Posting.find({});
  let postId = await postNumber.countDocuments() + 1
  let createdAt = new Date
  let likeCnt = 0
  let commentCnt = 0
    await Posting.create({ postId:postId, itemName:itemName, writer: writer, content: content, createdAt: createdAt, imageUrl: imageUrl, category: category, likeCnt: likeCnt, commentCnt: commentCnt});
  });

  //포스팅 입력값 저장-desk
router.post("/desk/add", async(req, res) => {
  let { itemName, content, imageUrl, category, writer } = req.body;
  let postNumber = Posting.find({});
  let postId = await postNumber.countDocuments() + 1
  let createdAt = new Date
  let likeCnt = 0
  let commentCnt = 0
    await Posting.create({ postId:postId, itemName:itemName, writer: writer, content: content, createdAt: createdAt, imageUrl: imageUrl, category: category, likeCnt: likeCnt, commentCnt: commentCnt});
  });
 
    //포스팅 입력값 저장-elecItem
router.post("/elecItem/add", async(req, res) => {
  let { itemName, content, imageUrl, category, writer } = req.body;
  let postNumber = Posting.find({});
  let postId = await postNumber.countDocuments() + 1
  let createdAt = new Date
  let likeCnt = 0
  let commentCnt = 0
    await Posting.create({ postId:postId, itemName:itemName, writer: writer, content: content, createdAt: createdAt, imageUrl: imageUrl, category: category, likeCnt: likeCnt, commentCnt: commentCnt});
  });

      //포스팅 입력값 저장-healthCare
router.post("/healthCare/add", async(req, res) => {
  let { itemName, content, imageUrl, category, writer } = req.body;
  let postNumber = Posting.find({});
  let postId = await postNumber.countDocuments() + 1
  let createdAt = new Date
  let likeCnt = 0
  let commentCnt = 0
    await Posting.create({ postId:postId, itemName:itemName, writer: writer, content: content, createdAt: createdAt, imageUrl: imageUrl, category: category, likeCnt: likeCnt, commentCnt: commentCnt});
  });

  //포스팅 입력값 저장-etc
router.post("/etc/add", async(req, res) => {
  let { itemName, content, imageUrl, category, writer } = req.body;
  let postNumber = Posting.find({});
  let postId = await postNumber.countDocuments() + 1
  let createdAt = new Date
  let likeCnt = 0
  let commentCnt = 0
    await Posting.create({ postId:postId, itemName:itemName, writer: writer, content: content, createdAt: createdAt, imageUrl: imageUrl, category: category, likeCnt: likeCnt, commentCnt: commentCnt});
  });

//포스팅 목록 조회
router.get("/:category", async (req, res) => {
  const category = req.params.category;
  const postsGroup = { category : category };
	const Posts = await Posting.find(postsGroup).sort({createdAt: -1});
	res.json({ Posts });
  });


//포스팅 세부 조회  데이터
router.get("/:category/:postId", async (req, res) => {
    const postId = req.params.postId;
    const detailOne = await Posting.findOne({postId});
    res.json({ detailOne });    
});


//포스팅 삭제
router.delete("/delete/:postId", async (req, res) => {  
  const postId = req.params.postId;
  let { password } = req.body;
  const existsPosting = await Posting.findOne({ postId });
  const DBpassword = existsPosting.password;
  if (password == DBpassword) {
    await Posting.deleteOne({ postId });
    res.json({ result: "success" });
    return;
  }
  else{ res.json({ result: "fail" });

  }
});

//포스팅 수정
router.post("/edit/:postId", async (req, res) => {  
  const postId = req.params.postId;
  let { password } = req.body;
  const existsPosting = await Posting.findOne({ postId });
  const DBpassword = existsPosting.password;
  if (password == DBpassword) {
    res.json({ result: "success" });
    return;
  }
  else{ res.json({ result: "fail" });

  }
});

//포스팅 수정 값 저장
router.post("/editdata/:postId", async(req, res) => {
  const postId = req.params.postNumber;
  let { content } = req.body;
  await Posting.updateOne({ "postId" : postId },{ $set: req.body})
    res.send("저장이 완료되었습니다!")
  });

module.exports = router;

