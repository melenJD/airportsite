const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Reservation = require('../models/reservation')
const Station = require('../models/station')

router.get('/', (req, res) => {
  Station.find({}, (err, stations) => {
    if(err) {return console.log(err)}
    res.render('reservation', {user: req.user, stations:stations})
  })
})

router.post('/', (req, res) => {
  const inputData = new Reservation({
    id: req.user._id,
    name: req.user.name,
    station: req.body.station,
    date: req.body.date
  })
  Reservation.create(inputData, (err, inputDate) => {
    if(err) return console.log(err)
    res.redirect('/mypage')
  })
})

module.exports = router