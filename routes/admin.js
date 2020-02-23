const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../models/user')
const Station = require('../models/station')
const Reservation = require('../models/reservation')
const methodOverride = require('method-override')

router.use(methodOverride('_method'))

router.get('/', checkAdmin, (req, res) => {
  res.render('admin/index', {user: req.user})
})

router.get('/station', checkAdmin, (req, res) => {
  Station.find({}, (err, stations) => {
    if(err) return console.log(err)
    res.render('admin/station', {user: req.user, stations:stations})
  })
})

router.post('/station', checkAdmin, (req, res) => {
  Station.create(req.body, (err, station) => {
    if(err) return console.log(err)
    res.redirect('/admin/station')
  })
})

router.get('/station/add', checkAdmin, (req, res) => {
  res.render('admin/add', {user: req.user})
})

router.get('/station/:id/edit', checkAdmin, (req, res) => {
  Station.findOne({_id:req.params.id}, (err, station) => {
    if(err) return console.log(err)
    res.render('admin/edit', {user:req.user, station:station})
  })
})

router.put('/station/:id', checkAdmin, (req, res) => {
  Station.findOneAndUpdate({_id:req.params.id}, req.body, (err) => {
    if(err) return console.log(err)
    res.redirect('/admin/station')
  })
})

router.get('/station/:id/delete', checkAdmin, (req, res) => {
  Station.deleteOne({_id:req.params.id}, (err) => {
    if(err) return console.log(err)
    res.redirect('/admin/station')
  })
  Reservation.deleteMany({station:req.params.id}, (err) => {
    if(err) return console.log(err)
  })
})

let reservations = []
let users = []
let stations = []

router.get('/reservation', checkAdmin, (req, res) => {
  Reservation.find({}, (err, reservations) => {
      res.render('admin/reservation', {user:req.user, reservations:reservations})
    }
  )
})

router.get('/reservation/:id/delete', checkAdmin, (req, res) => {
  Reservation.deleteOne({_id:req.params.id}, (err) => {
    if(err) return console.log(err)
    res.redirect('/admin/reservation')
  })
})

function checkAdmin(req, res, next) {
  if (req.user == null) {
    return res.redirect('/')
  }
  if (req.user.name != 'admin') {
    return res.redirect('/')
  }
  next()
}

module.exports = router