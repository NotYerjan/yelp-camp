const User = require('../models/user')

module.exports.renderUserRegisterForm = (req, res) => {
    res.render('users/register')
}

module.exports.createNewUser = async (req, res, next) => {
    try {
        const { email, username, password } = req.body
        const user = new User({ email, username })
        const rgUser = await User.register(user, password)
        req.login(rgUser, err => {
            if (err) return next(err)
            req.flash('success', 'Welcome to Yelp Camp!')
            res.redirect('/campgrounds')
        })

    }
    catch (e) {
        req.flash('error', e.message)
        res.redirect('/register')
    }
}

module.exports.renderUserLoginForm = (req, res) => {
    res.render('users/login')
}

module.exports.openTheUserSession = (req, res) => {
    req.flash('success', 'welcome back')
    const redirectUrl = req.session.returnTo || '/campgrounds'
    delete req.session.returnTo
    res.redirect(redirectUrl)
}

module.exports.closeTheUserSession = (req, res) => {
    req.logout()
    req.flash('success', 'Logged out')
    res.redirect('/campgrounds')
}