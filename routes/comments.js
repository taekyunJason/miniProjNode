
const express = require("express");
const connect = require("../schemas")
const moment = require("moment");
const Comment = require("../schemas/comment")
const router = express.Router();
const authMiddleware = require("../middleswares/auth-middleware")


connect();

router.get("/", (req, res) => {
    console.log("미들웨어가 작동합니다.")
    res.send('list page')
});


//comment 작성 POST OK authMiddleware
router.post("/comments/:postId", async (req, res) => {
    const commentAmount = await Comment.find();
    const { postId } = req.params;
    const createdAt = moment().format("YYYY-MM-DD HH:mm:ss")

    const { content, userId, userNickname, userAge } = req.body;
    if(!content.length) {
        res.status(400).send({
            errorMessage: '댓글 내용을 입력해주세요.'
        })
        return;
    }

    //comment id값 생성
    if(commentAmount.length) {
        const commentSort = commentAmount.sort((a,b) => b.commentId - a.commentId)
        const MaxcommentNum = commentSort[0]['commentId']
        var commentId = Number(MaxcommentNum) + 1;

        var createdComment = await Comment.create({commentId, content, postId, userId, userNickname, userAge, createdAt})
       
    }else{
        var commentId = 1
        var createdComment = await Comment.create({commentId, content, postId, userId, userNickname, userAge, createdAt})
    }
    
    res.json({ createdComment });
})


//comment 조회 GET  OK 
router.get("/comments/:postId/list", async (req, res) => {
    const { postId } = req.params;
    const commentPostid = await Comment.find({ postId }).sort({createdAt: -1})
    console.log(commentPostid)

    
    res.json({
        commentPostid,
    })
});


// comment 삭제 DELETE 
router.delete("/comments/:commentId", async (req, res) => {
    const commentId = req.params.commentId;
    const { userId } = req.body;
    const existsComment = await Comment.findOne({commentId})
    const DBuserId = existsComment.userId;
    console.log(DBuserId, userId)
    if (userId === DBuserId) {
        console.log(Comment.commentId)
        await Comment.deleteOne({ commentId });
        res.json({result: "success"});
        return;
    }else {
        res.json({ result: "fail"})
    }
});


module.exports = router;

