
const express = require("express");
const connect = require("../schemas")
const Post = require("../schemas/post");
const Comment = require("../schemas/comment")
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


//내가 작성한 게시글 조회
router.get("/profile/userId", async (res, req) => {
    const { postId } = req.params;
    const [ post ] = await Post.find({});
});


//가장 좋아요가 많은 5개 게시글




//comment 작성 POST
router.post("/comments/:postId", authMiddleware, async (req, res) => {
    const commentAmount = await Comment.find();
    //comment id값 생성
    if(commentAmount.length) {
        const commentSort = commentAmount.sort((a,b) => b.commentId - a.commentId)
        const MaxcommentNum = commentSort[0]['commentId']
        const commentId = MaxcommentNum + 1;
        const createdComment = await Comment.create({commentId})
    }else{
        const commentId = 1
        const createdComment = await Comment.create({commentId})
    }


    const { content } = req.body;//body에 작성된 값을 변수comment에 저장해주고
    if(!content.length) {//만약 comment에 작성된 값이 없으면 '댓글 내용을 입력해주세요'라는 error메세지르 띄워준다
        res.status(400).send({
            errorMessage: '댓글 내용을 입력해주세요.'
        })
        return;
    }
    

    const { postid } = req.params;
    const today = new Date();
    const date = today.toLocaleString();
    const userId = res.locals.user._id;
    const nickname = res.locals.user.nickname // locals.user안에 nickname을 찾아오 변수 nickname에 넣어준다
    
    
    await Comment.create({ content, postid , userId, nickname, date })//제대로 작성이 됐으면 앞에 적힌 정보를 Comment안에 컬렉션에 저장해준다
    res.json({ msg: '등록완료' })
})


// comment 삭제 DELETE
router.delete("/postss/:postid", async (req, res) => {
    const { id } = req.body;
    // console.log(id)
    const comment = await Comment.findById({commentId}).exec();
    // console.log(comment)
    await Comment.deleteOne({commentId});
    res.send({})

}); 




module.exports = router;


