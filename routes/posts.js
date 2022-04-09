
const express = require("express");
const connect = require("../schemas")
const Post = require("../schemas/post");
const User = require("../schemas/user");
const Comment = require("../schemas/comment")
const router = express.Router();
const jwt = require('jsonwebtoken')
const authMiddleware = require("../middleswares/auth-middleware")


connect();


router.get("/", (req, res) => {
    console.log("미들웨어가 작동합니다.")
    res.send('list page')
});


//회원가입
router.post("/users", async (req, res) => {
    const { nickname, password, confirmPassword } = req.body;//body에 작성한 값을 가져와
    if (password !== confirmPassword) {//패스워드와 패스워드 확인란과 같지 않을 때 에러메세지를 띄워라
        res.status(400).send({
            errorMessage: '패스워드가 패스워드 확인란과 동일하지 않습니다.'
        });
        return; //값이 같다면 리턴
    }

    const existUsers = await User.find({//변수 User값 안에 (find찾는 함수) id, nickname을 찾는다. 
        $or: [{nickname}],//변수 User값 안에 id와 nickname이 둘중 or 연산자를 사용하여 하나라도 같은 값이 있을 때
    });
    if (existUsers.length) {
        res.status(400).send({//에러 메세지를 띄워준다.
            errorMessage: '이미 가입된 이메일 또는 닉네임이 있습니다.'
        });
        return;
    }


    const user = new User({ nickname, password });//nickname,password를 클래스 객체로 만들어 user 변수에 입력
    await user.save();//user라는 변수에 들어있는 값을 저장한다.

    res.status(201).send({})//응답값을 줄 필요가 없다. 프론트엔드에서 회원 가입을 하고 나서 API가 주는 응답값으로 뭔가 하는게 아무것도 없다
})


//로그인
//auth(authentication): 로그인 한다는 행위가 내 권한을 인증한다는 행위로 빗대어 하는게 보통의 관례 JWT토큰
//POST메서드를 사용하는 이유는 토큰을 그때 그때 생성을 하기 때문에 또 다른 장점은 GET같은 메서드는 바디에 실을 수 없고 다른곳에 해야되는데 그럼 주소에 다 노출이 된다 
//그럼 보안에 취약하기 때문에 로그인은 POST메서드로 구현하는게 좋다
router.post("/auth", async (req, res) => {
    const { nickname, password } = req.body; 
    console.log(nickname,password)
    const user = await User.findOne({ nickname, password}).exec();//User안에 닉네임과 패스워드 한개를 찾아온다
//findOne은 프로미스의 값으로 반환하기 때문에 async/await함수를 사용하여 비동기처리를 해준다
    if(!user) {//만약 user가 없으면 에러메세지를 띄워준다
        res.status(400).send({
            errorMessage: '닉네임 또는 패스워드를 확인해주세요.'
        })
        return;
    }
    const token = jwt.sign({ userId: user.userId }, "m-s-k-j-w");//페이코드?
    res.send({
        token,
    })
});


router.get("/users/me", async (req, res) => {
    console.log(res.locals)
    const { user } = res.locals;//변수user에 res.locals를 할당해준다
    console.log(locals)
    res.send({//응답값 user
      user,
    });
  })


//list목록 조회
router.get("/post", async (req, res) => {
    const post = await Post.find();//Post안에 모든 값을 찾아와 변수 post에 넣어준다
    res.json({ post });//json 형태로 post의 값을 받아온다
});


//write.html 게시글 작성
router.post("/post/write", async (req, res) => {
    const today = new Date(); // new Date 현재 시간
    const date = today.toLocaleString();//현재 시간을 문자열로 바꿔  변수date에 넣어준다 //toLocaleString
    const { title, writer, description, pw } = req.body; //작성된 바디의 값들을
    console.log(req.body)

    const createdPosts = await Post.create({ writer,  title, description, pw, date, });//Post라는 컬렉션에 create만들어준다.
    res.json({ post: createdPosts });//json이라는 형태로 변수createdPosts를 post에 넣어서 받아온다
});


// Id값 가져와서 상세조회하기
router.get("/post/:postid", async (req, res) => {
    const { postid } = req.params;//user주소 뒤에 파라미터값을 변수 postid에 넣어준다
    const [ view ] = await Post.find({ _id: postid }).exec();//Post컬렉션 안에 _id 값을 찾아와 view배열 안에 넣어준다
    const comment  = await Comment.find({})//Comment컬렉션의 모든 값을 찾아와 변수 comment에 넣어주고
    res.json({//json형태로 찾아와 프론트에서 사용할 수 있게 보내준다.
        view,
        comment,
    });
});


//회원 조회
router.get("/postlogin/:postid", authMiddleware, async (req, res) => {
    const { postid } = req.params;
    const userId = res.locals.user._id;//locals.user안에 저장되있는_id의 값을 변수 userId에 넣어준다
    const [ view ] = await Post.find({ _id: postid }).exec();
    const comment  = await Comment.find({})
    res.json({
        view,
        comment,
        userId
    });
});


//comment 작성 POST
router.post("/posts/:postid", authMiddleware, async (req, res) => {
    const { postid } = req.params;
    const userId = res.locals.user._id;
    const nickname = res.locals.user.nickname // locals.user안에 nickname을 찾아오 변수 nickname에 넣어준다
    // console.log(nickname)
    const { comment } = req.body;//body에 작성된 값을 변수comment에 저장해주고
    if(!comment.length) {//만약 comment에 작성된 값이 없으면 '댓글 내용을 입력해주세요'라는 error메세지르 띄워준다
        res.status(400).send({
            errorMessage: '댓글 내용을 입력해주세요.'
        })
        return;
    }
    
    await Comment.create({ comment, postid , userId, nickname })//제대로 작성이 됐으면 앞에 적힌 정보를 Comment안에 컬렉션에 저장해준다
    res.json({ msg: '등록완료' })
})


// comment 삭제 DELETE
router.delete("/postss/:postid", async (req, res) => {
    const { id } = req.body;
    // console.log(id)
    const comment = await Comment.findById({_id: id}).exec();
    // console.log(comment)
    await Comment.deleteOne({_id: id});
    res.send({})

}); 


//comment 수정 patch
router.patch("/posts/:commentid", (req, res) => {

});






module.exports = router;


