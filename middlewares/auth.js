const jwt = require("jsonwebtoken");
var config = require("config");
var {User} = require('../models/user');
async function auth(req, res, next) {
    let token = req.header("x-auth-token");
    if (!token) return res.status(400).send("Token not provided");
    try {
        let user = jwt.verify(token, config.get("jwtPrivateKey"));
        
        req.user = await User.findById(user._id);
    }
    catch (error) {
       return res.status(401).send("token not valid");
    }
   next();

}

module.exports = auth;