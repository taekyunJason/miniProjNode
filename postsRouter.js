// postsRouter.js

/**
 * @swagger
 * path:
 *    /users/:
 *      get:
 *          tags:
 *          - Default
 *          description: 사용자의 데이터를 추출합니다.
 *          produces:
 *          - application/json
 *          parameters:
 *              - name: name
 *                in: path
 *                required: true
 *                description: 호출하고자하는 사용자의 이름
 *                schema:
 *                  type: String
 *          responses:
 *              200:
 *                  description: success
 *                  schema:
 *                      type: array
 *
 */
 router.route('/:name/')
 .get(async function(req, res){
     console.log(req);
     const name = req.params.name;
     const user = await User.findOne({name: name});

     res.status(200).send(user);
 })
