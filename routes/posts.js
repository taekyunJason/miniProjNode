const express = require("express");
const connect = require("../schemas");
const Post = require("../schemas/posting");
const router = express.Router();
const authMiddleware = require("../middleswares/auth-middleware")

connect();

router.get("/", (req, res) => {
    console.log("미들웨어가 작동합니다.")
    res.send('list page')
});


router.get("/users/me", async (req, res) => {
    console.log(res.locals)
    const { user } = res.locals;//변수user에 res.locals를 할당해준다
    console.log(locals)
    res.send({//응답값 user
      user,
    });
  })

  const postList = [{
    postId: "1",
    itemName: "아무튼 꿀템",
    writer: {
      userId: "iamuser",
      password: "1234",
      userNickname: "꿀렁",
      userAge: "20대"
    },
    content: "이거 정말 좋습니다",
    createdAt: "2022-04-08 12:00:00",
    imageUrl: "https://shopping-phinf.pstatic.net/main_1006654/10066547588.20160715103801.jpg?type=f640",
    category: "chair",
    likeCnt: 1,
    commentCnt: 8
},
{
    postId: "1",
    itemName: "아무튼 꿀템",
    writer: {
      userId: "iamuser",
      password: "1234",
      userNickname: "꿀렁",
      userAge: "20대"
    },
    content: "이거 정말 좋습니다",
    createdAt: "2022-04-08 12:00:00",
    imageUrl: "https://shopping-phinf.pstatic.net/main_1006654/10066547588.20160715103801.jpg?type=f640",
    category: "chair",
    likeCnt: 4,
    commentCnt: 8
},
{
    postId: "1",
    itemName: "아무튼 꿀템",
    writer: {
      userId: "iamuser",
      password: "1234",
      userNickname: "꿀렁",
      userAge: "20대"
    },
    content: "이거 정말 좋습니다",
    createdAt: "2022-04-08 12:00:00",
    imageUrl: "https://shopping-phinf.pstatic.net/main_1006654/10066547588.20160715103801.jpg?type=f640",
    category: "etc",
    likeCnt: 0,
    commentCnt: 8
},
{
    postId: "1",
    itemName: "아무튼 꿀템",
    writer: {
      userId: "iamuser",
      password: "1234",
      userNickname: "꿀렁",
      userAge: "20대"
    },
    content: "이거 정말 좋습니다",
    createdAt: "2022-04-08 12:00:00",
    imageUrl: "https://shopping-phinf.pstatic.net/main_1006654/10066547588.20160715103801.jpg?type=f640",
    category: "chair",
    likeCnt: 11,
    commentCnt: 8
},
{
    postId: "1",
    itemName: "아무튼 꿀템",
    writer: {
      userId: "iamuser",
      password: "1234",
      userNickname: "꿀렁",
      userAge: "20대"
    },
    content: "이거 정말 좋습니다",
    createdAt: "2022-04-08 12:00:00",
    imageUrl: "https://shopping-phinf.pstatic.net/main_1006654/10066547588.20160715103801.jpg?type=f640",
    category: "desk",
    likeCnt: 7,
    commentCnt: 8
},
{
    postId: "1",
    itemName: "아무튼 꿀템",
    writer: {
      userId: "iamuser",
      password: "1234",
      userNickname: "꿀렁",
      userAge: "20대"
    },
    content: "이거 정말 좋습니다",
    createdAt: "2022-04-08 12:00:00",
    imageUrl: "https://shopping-phinf.pstatic.net/main_1006654/10066547588.20160715103801.jpg?type=f640",
    category: "etc",
    likeCnt: 2,
    commentCnt: 8
}]
  
//내가 작성한 게시글 조회  authMiddleware, OK
router.get("/profile/:userId", (req, res) => {
    console.log("가나다라")
    // const post  = await Post.find({});
    // res.send("this is post page")
    res.json({ postList })
});


//가장 좋아요가 많은 5개 게시글 OK
router.get("/mostLikePost", async (req, res) => {
    // const postAmount = await Post.find({});
    const postAmount = postList
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


//상세조회 페이지
router.get("/detail/:postId", async (req, res) => {
    const { postId } = req.params;
    const post_Id = await Post.find({postId})
    res.json({})
});



module.exports = router;


