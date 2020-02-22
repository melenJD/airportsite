const express = require('express')
const router = express.Router()
const User = require('../models/user')
const passport = require('passport')

router.get('/', checkNotAuthenticate, (req, res) => {
  res.render('login')
})

const handleAuth = 
passport.authenticate('local', { successRedirect: '/',
                                 failureRedirect: '/login',
                                 failureFlash: true })

router.post('/', checkNotAuthenticate, handleAuth)

function checkNotAuthenticate(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
}

module.exports = router