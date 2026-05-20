const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const { router: authRouter } = require("./routes/auth-router");
const errorHandler = require("./controllers/error-handler");
const { AppError } = require("./utils/app-error");
const { HttpStatusCode } = require("./utils/status_codes");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cookieParser());
app.use(express.static("public"));

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/auth", authRouter);

app.use((req, res, next) => {
  next(
    new AppError({
      message: `This path ${req.originalUrl} isn't available`,
      statusCode: HttpStatusCode.NOT_FOUND,
      isOperational: true,
    }),
  );
});

app.use(errorHandler);

module.exports = { app };
