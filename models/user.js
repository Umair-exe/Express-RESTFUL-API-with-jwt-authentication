var mongoose = require('mongoose');
var Joi =require('@hapi/joi');

var userSchema = mongoose.Schema({
    name:String,
    email:String,
    password:String,
    role: {
        type:String,
        default:"user",
    }

});

var User = mongoose.model("User",userSchema);

function validateUser(data) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(20).required(),
        email: Joi.string().email().min(3).max(20).required(),
        password: Joi.string().min(8).required(),
    })
    return schema.validate(data);
}

function validateUserLogin(data) {
    const schema = Joi.object({
        email: Joi.string().email().min(3).max(20).required(),
        password: Joi.string().min(8).required(),
    })
    return schema.validate(data);
}


module.exports.User = User;
module,exports.validateUser = validateUser;//for signup
module,exports.validateUserLogin = validateUserLogin;//for login