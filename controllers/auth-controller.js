const { HttpStatusCode } = require("../utils/status_codes");
const {ApiResponse} = require("../utils/api-response");

async function register(req, res) {
    
    return res.status(HttpStatusCode.OK).json(ApiResponse.ok({message: "User registered successfully"}));
}

module.exports = { register }