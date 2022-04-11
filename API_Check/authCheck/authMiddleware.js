const jwt = require("jsonwebtoken");
const User = require("../../schemas/user");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const [authType, authToken] = (authorization || "").split(" ");

  if (!authToken || authType !== "Bearer") {
    res.status(401).send({
      errorMessage: "로그인 후 이용 가능한 기능입니다.1",
    });
    return;
  }

  try {
    const { userId } = jwt.verify(authToken, "my-secret-key");
    User.findById(userId).then((user) => {
      res.locals.user = user;
      console.log(res.locals);
      next();
    });
  } catch (err) {
    res.status(401).send({
      errorMessage: "로그인 후 이용 가능한 기능입니다.2",
    });
  }
};
