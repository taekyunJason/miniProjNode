const mongoose = require("mongoose");
//mongoose와 DB를 연결
const connect = () => {
  mongoose
    .connect("mongodb://localhost:27017/miniProjDB", {
      ignoreUndefined: true,
    })
    .catch((err) => {
      console.error(err);
    });
};
module.exports = connect;
