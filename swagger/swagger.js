const swaggerUi = require("swagger-ui-express");
const swaggereJsdoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Test API 하기!",
      version: "1.0.0",
      description: "Test API with express 테스트입니다",
    },
    host: "localhost:3300",
    basePath: "/",
    servers: [
      {
        url: "http://localhost:3300", // 요청 URL
      },
    ],
  },
  apis: ["./routes/*.js", "./swagger/*"],
};
const specs = swaggereJsdoc(options);
module.exports = { swaggerUi, specs };
