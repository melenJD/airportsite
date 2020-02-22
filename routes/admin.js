const express = require('express')
const router = express.Router()

router.get('/', checkAdmin, (req, res) => {
  res.render('admin/index')
})

function checkAdmin(req, res, next) {
  if (req.user.name != 'admin') {
    return res.redirect('/')
  }
  next()
}

module.exports = router