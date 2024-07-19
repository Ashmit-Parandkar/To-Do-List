const express = require('express')
const {registerUser, loginUser, logoutUser,  getMyProfile, getRegisterPage, getLoginPage, getHomePage} = require('../controllers/user.js')
const {isAuthenticated} = require('../middlewares/auth.js')

const router = express.Router();

router.use(express.static('public'))

// Use Postman and make post request with name, email, password in body in raw JSON
router.post('/api/v1/users/register', registerUser);

router.post('/api/v1/users/login', loginUser);

router.get('/api/v1/users/logout', logoutUser);

router.get('/api/v1/users/myProfile', isAuthenticated, getMyProfile);

router.get('/api/v1/users/register', getRegisterPage);

router.get('/api/v1/users/login', getLoginPage);

router.get('/api/v1/users/home', isAuthenticated, getHomePage);

module.exports = router 