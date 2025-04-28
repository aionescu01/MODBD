const swaggerJSDoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Documentație API",
      version: "1.0.0",
      description: "Documentație pentru endpoint-urile backend-ului",
    },
    servers: [
      {
        url: "http://localhost:3001",
        description: "Server local",
      },
    ],
  },
  apis: ["./src/routes/oltp/*.js"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

module.exports = swaggerSpec;