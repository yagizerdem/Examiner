const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const { router: authRouter } = require("./routes/auth-router");
const errorHandler = require("./controllers/error-handler");

const app = express();

app.use(express.static("public"));

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/auth", authRouter);

app.use(errorHandler);

module.exports = { app };
