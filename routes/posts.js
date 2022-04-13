const express = require("express");
const Http = require("http");
const router = express.Router();
const Posting = require("../schemas/posting")
const Comment = require("../schemas/comment")
const User = require("../schemas/user");
const jwt = require("jsonwebtoken");
const { response } = require("express");
const moment = require("moment");



router.use(express.json()); 
router.use(express.urlencoded( {extended : false } ));

const app = express();

router.get("/", (req, res) =>{
  res.send("/posts 경로에 해당합니다")
})

//포스팅 입력값 저장-chair
router.post("/posts/:category/add", async (req, res) => {
  let {itemName, content, imageUrl, userId, userNickname, userAge } = req.body;
  let { category } = req.params;
  let postNumber = Posting.find({});
  let postId = await postNumber.countDocuments() + 1
  const createdAt = moment().format("YYYY-MM-DD HH:mm:ss")
  let userLike = []
  let likeCnt = 0
  let commentCnt = 0
  const createPosting = await Posting.create({postId, itemName, userId, userNickname, userAge, content, createdAt, imageUrl, category, likeCnt, commentCnt, userLike});
  res.json({status: 200, createPosting})
  
  });

  //포스팅 입력값 저장-desk
// router.post("/posts/desk/add", async(req, res) => {
//   let {itemName, content, imageUrl, category, userId, userNickname, userAge } = req.body;
//   let postNumber = Posting.find({});
//   let postId = await postNumber.countDocuments() + 1
//   const createdAt = moment().format("YYYY-MM-DD HH:mm:ss")
//   let userLike = []
//   let likeCnt = 0
//   let commentCnt = 0
//   const createPosting = await Posting.create({ postId, itemName, userId, userNickname, userAge, content, createdAt, imageUrl, category, likeCnt, commentCnt, userLike});
//   res.json({createPosting})
//   });
 
//   //포스팅 입력값 저장-elecItem
// router.post("/posts/elecItem/add", async(req, res) => {
//   let {itemName, content, imageUrl, category, userId, userNickname, userAge } = req.body;
//   let postNumber = Posting.find({});
//   let postId = await postNumber.countDocuments() + 1
//   const createdAt = moment().format("YYYY-MM-DD HH:mm:ss")
//   let userLike = []
//   let likeCnt = 0
//   let commentCnt = 0
//   const createPosting = await Posting.create({ postId, itemName, userId, userNickname, userAge, content, createdAt, imageUrl, category, likeCnt, commentCnt, userLike});
//   res.json({createPosting})
//   });

//     //포스팅 입력값 저장-healthCare
// router.post("/posts/healthCare/add", async(req, res) => {
//   let {itemName, content, imageUrl, category, userId, userNickname, userAge } = req.body;
//   let postNumber = Posting.find({});
//   let postId = await postNumber.countDocuments() + 1
//   const createdAt = moment().format("YYYY-MM-DD HH:mm:ss")
//   let userLike = []
//   let likeCnt = 0
//   let commentCnt = 0
//   const createPosting = await Posting.create({ postId, itemName, userId, userNickname, userAge, content, createdAt, imageUrl, category, likeCnt, commentCnt, userLike});
//   res.json({createPosting})
//   });

//   //포스팅 입력값 저장-etc
// router.post("/posts/etc/add", async(req, res) => {
//   let {itemName, content, imageUrl, category, userId, userNickname, userAge } = req.body;
//   let postNumber = Posting.find({});
//   let postId = await postNumber.countDocuments() + 1
//   const createdAt = moment().format("YYYY-MM-DD HH:mm:ss")
//   let userLike = []
//   let likeCnt = 0
//   let commentCnt = 0
//   const createPosting = await Posting.create({ postId, itemName, userId, userNickname, userAge, content, createdAt, imageUrl, category, likeCnt, commentCnt, userLike});
//   res.json({createPosting})
//   });

// 포스팅 목록 조회
router.get("/posts/:category", async (req, res) => {
  const category = req.params.category;
  const postsGroup = { category : category };
	const Posts = await Posting.find(postsGroup).sort({createdAt: -1});
	res.json({ Posts });
  });


//포스팅 세부 조회  데이터
router.get("/posts/:category/:postId", async (req, res) => {
    const postId = req.params.postId;
    const detailOne = await Posting.findOne({postId});
    res.json({ detailOne });    
});


//포스팅 삭제
router.delete("/posts/delete/:postId", async (req, res) => {  
  const postId = req.params.postId;
  let { userId } = req.body;
  const existsPosting = await Posting.findOne({ postId });
  const DBuserId = existsPosting.userId;
  console.log(DBuserId, userId)
  if (userId == DBuserId) {
    await Posting.deleteOne({ postId });
    res.json({ result: "success" });
    return;
  }
  else{res.json({ result: "fail" });

  }
});
  // const { writerLike } = req.body;
  // const postId = '5'
  // const likeCnt = await Posting.findOne({ postId }).exec();
  // const writerLike = true
  // if( writerLike === true ) {
  //   var LikeCnt = likeCnt + 1
  //   console.log(LikeCnt)
  // }
	// res.json({ Posts, LikeCnt });

//Like Count
router.post('/posts/like', async (req, res) => {
  const { userId, postId } = req.body;
  const userPost = await Posting.findOne({postId}).exec();
  const likeCnt = userPost.userLike.length

  const found = userPost.userLike.find(e => e === userId)

  if(found)  {
    await userPost.updateOne({$pull:{userLike: userId}})
    await userPost.updateOne({$set: {likeCnt: likeCnt}})
  }else {
    await userPost.updateOne({$push:{userLike: userId}})
    await userPost.updateOne({$set: {likeCnt: likeCnt}})
  }


  const newuserPost = await Posting.findOne({postId}).exec();
  const newuserLike = newuserPost.userLike

  newuserPost.likeCnt = newuserPost.userLike.length
  const newLikecnt = newuserPost.likeCnt

  console.log(newuserLike, newLikecnt)
  // console.log(likeCnt)
  res.json({newuserLike, newLikecnt})
})

//Comment Count
// router.post('/posts/like', async (req, res) => {
//   const { postId } = req.body;
//   const userComment = await Comment.findOne({postId}).exec();
//   const Comment = userComment.content

//   const found = userPost.userLike.find(e => e === userId)

//   if(found)  {
//     await userPost.updateOne({$set: {likeCnt: likeCnt}})
//   }else {
//     await userPost.updateOne({$set: {likeCnt: likeCnt}})
//   }


//   const newuserPost = await Posting.findOne({postId}).exec();
//   const newuserLike = newuserPost.userLike

//   newuserPost.likeCnt = newuserPost.userLike.length
//   const newLikecnt = newuserPost.likeCnt

//   console.log(newuserLike, newLikecnt)
//   // console.log(likeCnt)
//   res.json({newuserLike, newLikecnt})
// })




//포스팅 수정
router.post("/posts/edit/:postId", async (req, res) => {  
  const postId = req.params.postId;
  let { userId } = req.body;
  const existsPosting = await Posting.findOne({ postId });
  const DBuserId = existsPosting.userId;
  if (userId == DBuserId) {

    res.json({ result: "success" });
    return;
  }
  else{ res.json({ result: "fail" });
  }
});

//포스팅 수정 값 저장
router.post("/posts/editdata/:postId", async(req, res) => {
  const postId = req.params.postNumber;
  let { content } = req.body;
  await Posting.updateOne({ "postId" : postId },{ $set: req.body})
    res.send("저장이 완료되었습니다!")
  });

// //좋아요 값 저장
// router.post("/posts/likeCntdata/:postId", async(req, res) => {
//   const postId = req.params.postNumber;
//   let { likeCnt } = req.body;
//   await Posting.updateOne({ "postId" : postId },{ $set: req.body})
//     res.send("저장이 완료되었습니다!")
//   });

//좋아요 클릭
// router.post("/posts/likeCnt/:postId", async (req, res) => {  
//   const postId = req.params.postId;
//   let { userId } = req.body;
//   const existsPosting = await Posting.findOne({ postId });
//   const existslike = existsPosting.findOne({likeCnt : userId});
//   if (existslike) {
//     await Posting.updateOne({ "postId" : postId },{ $unset: existslike})
//     res.json({ result: "cancel" });
//     return;
//   }
//   else{
//     await Posting.create({ "postId" : postId },{ likeCnt : userId}) 
//     res.json({ result: "like" });
//   }
// });


//내가 작성한 게시글 조회  authMiddleware, OK
router.get("/profile/:userId", async (req, res) => {
    const post  = await Posting.find({});
    // res.send("this is post page")
    res.json({ post })
});


//가장 좋아요가 많은 5개 게시글 OK
router.get("/mostLikePost", async (req, res) => {
    const postAmount = await Posting.find({});
    // const postAmount = postList
    // console.log(postAmount)

    if(postAmount.length){
        const postAmountSort = postAmount.sort((a,b) => b.likeCnt - a.likeCnt);
        const likeCnt = postAmountSort.splice(0,5);
        console.log(likeCnt)
        res.json({likeCnt})
    }else {
        return
    }
});

//좋아요가 많은 5개 게시글 OK

module.exports = router;
