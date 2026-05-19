const express = require('express');
const {router : authRouter} = require("./routes/auth-router")

const app = express();

app.use(express.json());

app.use("/auth", authRouter);



module.exports = {app};