const express = require('express')
const router = express.Router()
const passport = require('passport')
const catchAsync = require('../utils/catchAsync')
const user = require('../controllers/users')

router.route('/register')
    .get(user.renderUserRegisterForm)
.post(catchAsync(user.createNewUser))


router.route('/login')
    .get(user.renderUserLoginForm)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), user.openTheUserSession)

router.get('/logout', user.closeTheUserSession )

module.exports = router