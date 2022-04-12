const jwt = require("jsonwebtoken");
const User = require("../schemas/user");


//HTTP`Authorization: Bearer JWT토큰내용`
//위와 같은 양식으로 보내는 이유는 [HTTP 인증](https://developer.mozilla.org/ko/docs/Web/HTTP/Authentication) 유형중, Bearer 타입을 사용하여 토큰을 전달하기 위함입니다.
//"Authorization" 헤더로 전달받는 토큰이 유효한지 검사하고, 만약 유효하다면 토큰 안에 있는 userId 데이터로 해당 사용자가 데이터베이스에 실제로 존재하는지 체크하면 됩니다.
module.exports = (req, res, next) => {
    console.log('지나감')
    const { authorization } = req.headers;
    const [tokenType, tokenValue] = authorization.split(' ')//Bearer를 제거하고 뒤에있는 토근값만 받기위해 스플릿으로 나누어줬다.
    console.log(tokenType)
    if (tokenType !== 'Bearer') {
        res.status(401).send({
            errorMessage: '로그인 후 사용하세요.'
        });
        return;
    }
    // try부분 안에서 실행될 때 에러가 발생하면 그걸 잡아서 여기로 넣어준다
    try {
        const { userId } = jwt.verify(tokenValue, "m-s-k-j-w");//verify 토큰 검증할 때 사용하는 코드

        User.findById(userId).exec().then((user) => { // promise then함수 알아보기
            res.locals.user = user;//locals 강의자료 확인 (2-7) locals안에 사용자 정보가 들어있을 때에는 인증이 된 상태로 저장이 되기 때문에 믿고 사용해도 된다.
            //사용자 인증 미들웨어를 앞에다가 붙이지 않았을 경우 app.js (authMiddleware) 문제가 발생, 인증을 거치지 않고는 들어가지 않는다 위에 코드가 그렇게 설정 해놨다.
            next(); // 왜 async함수를 사용하지 못할까?
        });
        
    } catch (error) {
        res.status(401).send({
            errorMessage: '로그인 후 사용하세요.'
        });
        return;
    }
};

// module.exports.logout_get = (req, res) => {
//     res.cookie('jwt', '', { maxAge: 1});
//     res.redirect('/');
// }