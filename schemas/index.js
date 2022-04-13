const mongoose = require("mongoose");
//mongoose와 DB를 연결
const connect = () => {
  mongoose.connect(
    "mongodb://localhost:27017/miniProjDB",
    {
      ignoreUndefined: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (error) => {
      if (error) console.log("Mongo DB Connect Error");
      else console.log("Mongo Db Connect Success");
    }
  );
};
mongoose.connection.on("error", (err) => {
  console.error("몽고디비 연결 에러", err);
});
module.exports = connect;
