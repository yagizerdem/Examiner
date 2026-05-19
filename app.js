const express = require('express');
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");


const {router : authRouter} = require("./routes/auth-router");
const { ApiResponse } = require('./utils/api-response');

const app = express();

app.use(express.static('public'));


app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/auth", authRouter);


var res = ApiResponse.ok({message: "Hello World", data: {name: "Yagiz"}});
console.log(res)


module.exports = {app};