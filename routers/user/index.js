const userRouter = require("express").Router();
const userController = require("./user.controller");

/**
 * @swagger
 * paths:
 *  /login/signUp:
 *    get:
 *      summary: "회원 가입"
 *      description: "서버에 데이터를 보내고 Post방식으로 요청"
 *      tags: [Users]
 *
 *      responses:
 *        "200":
 *          description: 전체 유저 정보
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    ok:
 *                      type: boolean
 *                    users:
 *                      type: object
 *                      example:
 *                          [
 *                            { "userId": "jake", "password": "1234",  },
 *                            { "id": 2, "name": "유저2" },
 *                            { "id": 3, "name": "유저3" },
 *                          ]
 */
userRouter.get("/users", userController.getUsers);

/**
 * @swagger
 * /api/user/user?user_id={user_id}:
 *  get:
 *    summary: "특정 유저조회 Query 방식"
 *    description: "요청 경로에 값을 담아 서버에 보낸다."
 *    tags: [Users]
 *    parameters:
 *      - in: query
 *        name: user_id
 *        required: true
 *        description: 유저 아이디
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *        description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. (유저 조회)
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: boolean
 *                users:
 *                  type: object
 *                  example: [{ "id": 1, "name": "유저1" }]
 */
userRouter.get("/user", userController.findOneUser1);

/**
 * @swagger
 * /api/user/{user_id}:
 *  get:
 *    summary: "특정 유저조회 Path 방식"
 *    description: "요청 경로에 값을 담아 서버에 보낸다."
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: user_id
 *        required: true
 *        description: 유저 아이디
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *        description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. (유저 조회)
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: boolean
 *                users:
 *                  type: object
 *                  example: [{ "id": 1, "name": "유저1" }]
 */
userRouter.get("/:user_id", userController.findOneUser2);

/**
 * @swagger
 *
 * /login/signUp:
 *  post:
 *    summary: "회원 가입"
 *    description: "POST 방식으로 회원를 등록한다."
 *    tags: [Users]
 *    requestBody:
 *      description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. (유저 등록)
 *      required: true
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              userId:
 *                type: string
 *                description: "iamuser"
 *              password:
 *                type: string
 *                description: "1234"
 *              passwordCheck:
 *                type: string
 *                description: "1234"
 *              userNickName:
 *                type: string
 *                description: "꿀렁"
 *              userAge:
 *                type: string
 *                description: "20대"
 */
userRouter.post("/add", userController.createUser);

/**
 * @swagger
 *
 * /login/idCheck:
 *  post:
 *    summary: "아이디 중복 확인"
 *    description: "POST 방식으로 회원 아이디 중복을 확인한다."
 *    tags: [Users]
 *    requestBody:
 *      description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. (유저 등록)
 *      required: true
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              userId:
 *                type: string
 *                description: "iamuser"
 *    responses:
 *      "200":
 *        description: 아이디가 중복되지 않으면 true, 중복되면 false 반환한다. (유저 아이디 조회)
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                result:
 *                  type: boolean
 *
 */
userRouter.post("/add", userController.createUser);

/**
 * @swagger
 *
 * /login/reqLogin:
 *  post:
 *    summary: "로그인 요청"
 *    description: "POST 방식으로 등록된 회원의 로그인을 요청한다."
 *    tags: [Users]
 *    requestBody:
 *      description: 로그인의 성공/ 실패 여부에 따라 res 값을 다르게 반환한다.
 *      required: true
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              userId:
 *                type: string
 *                description: "iamuser"
 *              password:
 *                type: string
 *                description: "1234"
 *    responses:
 *      "200":
 *        description: 아이디가 중복되지 않으면 true, 중복되면 false 반환한다. (유저 아이디 조회)
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                result:
 *                  type: string
 *                  description: "success"
 *                token:
 *                  type: object
 *                  description: token
 *     "400":
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                result:
 *                  type: string
 *                  description: "fail"
 *                msg:
 *                  type: string
 *                  description: "실패했습니다"
 *
 */
userRouter.post("/add", userController.createUser);

/**
 * @swagger
 * /api/user/update:
 *   put:
 *    summary: "유저 수정"
 *    description: "PUT 방식을 통해 유저 수정(전체 데이터를 수정할 때 사용함)"
 *    tags: [Users]
 *    requestBody:
 *      description: 유저 수정
 *      required: true
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              id:
 *                type: int
 *                description: "유저 고유아이디"
 *              name:
 *                type: string
 *                description: "유저 이름"
 *    responses:
 *      "200":
 *        description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다.(유저 수정)
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: boolean
 *                data:
 *                  type: string
 *                  example:
 *                    [
 *                      { "id": 1, "name": "유저1" },
 *                      { "id": 2, "name": "유저2" },
 *                      { "id": 3, "name": "유저3" },
 *                    ]
 */
userRouter.put("/update", userController.setUsers);

/**
 * @swagger
 * /api/user/update/{user_id}:
 *   patch:
 *    summary: "유저 수정"
 *    description: "Patch 방식을 통해 특정 유저 수정(단일 데이터를 수정할 때 사용함)"
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: user_id
 *        required: true
 *        description: 유저 아이디
 *        schema:
 *          type: string
 *    requestBody:
 *      description: 유저 수정
 *      required: true
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                description: "유저 이름"
 *    responses:
 *      "200":
 *        description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. (유저 수정)
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: boolean
 *                data:
 *                  type: string
 *                  example:
 *                    [
 *                      { "id": 1, "name": "유저1" },
 *                      { "id": 2, "name": "유저2" },
 *                      { "id": 3, "name": "유저3" },
 *                    ]
 */
userRouter.patch("/update/:user_id", userController.setUser);

/**
 * @swagger
 * /api/user/delete:
 *   delete:
 *    summary: "특정 유저 삭제"
 *    description: "요청 경로에 값을 담아 서버에 보낸다."
 *    tags: [Users]
 *    parameters:
 *      - in: query
 *        name: user_id
 *        required: true
 *        description: 유저 아이디
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *        description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. (유저 삭제)
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: boolean
 *                users:
 *                  type: object
 *                  example:
 *                    [
 *                      { "id": 1, "name": "유저1" },
 *                      { "id": 2, "name": "유저2" },
 *                      { "id": 3, "name": "유저3" },
 *                    ]
 */
userRouter.delete("/delete", userController.delUser);

module.exports = userRouter;
