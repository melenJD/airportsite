const express = require('express')
const router = express.Router()
const User = require('../models/user')
const passport = require('passport')

router.get('/', checkNotAuthenticate, (req, res) => {
  res.render('register')
})

router.post('/', checkNotAuthenticate, (req, res, next) => {
  try{
    const handleRegister = (err, user) => {
      if(err){return next(err)}
      res.redirect('/login')
    }
    User.register(new User({ email: req.body.email, name: req.body.name }), req.body.password, handleRegister)
  } catch(e) {
    console.log(e)
    res.redirect('/register')
  }
})

function checkNotAuthenticate(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
}

module.exports = router