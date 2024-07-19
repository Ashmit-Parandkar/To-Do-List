const user = require('../models/user.js');
const jwt = require('jsonwebtoken')

const isAuthenticated = async (req, res, next) => {

    const {token} = req.cookies;

    if(!token)
    {
        return res.status(404).json({
            success: false,
            message: "Login First"
        });
    }

    const decoded = jwt.verify(token, "wsqfuwvjxiuluyz");

    const oneUser = await user.findById(decoded._id);

    req.user = oneUser;

    next();
}

module.exports = {isAuthenticated}