var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var { User} = require('../../models/user');

const _ = require('lodash');
const jwt = require('jsonwebtoken');
const config = require('config');
const validateUserSignUp = require('../../middlewares/validateUserSignUp');
/* GET home page. */
router.post('/register',validateUserSignUp, async function (req, res, next) {
    let findUser = await User.findOne({
        email: req.body.email
    });
    if (findUser) return res.status(400).send("User already exist");
    let user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    let salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(req.body.password, salt);

    await user.save();

    return res.send(_.pick(user, ['name', 'email']));
});


router.post('/login' ,async (req, res) => {
    let user = await User.findOne({
        email: req.body.email
    });
    if (!user) return res.status(400).send("User don't exist");
    let isValid = await bcrypt.compare(req.body.password,user.password);
    if(!isValid) {
        return res.status(401).send("incorrect password");
    }

    let token = jwt.sign({_id:user._id, name:user.name},config.get("jwtPrivateKey"));
    return res.send(token);



});

module.exports = router;
