
const express = require("express");
const connect = require("../schemas")
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

 
//comment 작성 POST OK
router.post("/comments/:postId", async (req, res) => {
    const commentAmount = await Comment.find();

    // const userId = res.locals.user._id;
    // const nickname = res.locals.user.nickname // locals.user안에 nickname을 찾아오 변수 nickname에 넣어준다
    const userId = "iamuser"
    const nickname = "꿀렁"

    const { postId } = req.params;
    const today = new Date();
    const craetedAt = today.toLocaleString();

    const { content } = req.body;//body에 작성된 값을 변수comment에 저장해주고
    if(!content.length) {//만약 comment에 작성된 값이 없으면 '댓글 내용을 입력해주세요'라는 error메세지르 띄워준다
        res.status(400).send({
            errorMessage: '댓글 내용을 입력해주세요.'
        })
        return;
    }

    // if(comments.length) {
    //     return res.json({ success: false, errorMessage: "이미 있는 데이터입니다."})
    // }
    //comment id값 생성
    if(commentAmount.length) {
        const commentSort = commentAmount.sort((a,b) => b.commentId - a.commentId)
        const MaxcommentNum = commentSort[0]['commentId']
        var commentId = Number(MaxcommentNum) + 1;
        // console.log(1, commentId)
        var createdComment = await Comment.create({commentId, content, postId, userId, nickname, craetedAt})
        // console.log(craetedAt, postId)
    }else{
        var commentId = 1
        // console.log(2, commentId)
        var createdComment = await Comment.create({commentId, content, postId, userId, nickname, craetedAt})
    }
    // console.log(3, createdComment)
    
    // const comments = await Comment.find({ commentId, content, postId, userId, nickname, craetedAt })
    
    
    res.json({ createdComment });
})


//comment 조회 GET  OK 
router.get("/comments/:postId/list", async (req, res) => {
    const { postId } = req.params;
    const commentPostid = await Comment.find({ postId })

    res.json({
        commentPostid,
    })
});


// comment 삭제 DELETE  authMiddleware,
router.delete("/comments/:commentId", async (req, res) => {
    // const { commentId } = req.body;
    const  commentId  = "11"
    // console.log(id)
    const comment = await Comment.find({commentId}).exec();
    // console.log(comment)
    await Comment.deleteOne({commentId});
    res.send({})
}); 



module.exports = router;
