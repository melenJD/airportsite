const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Reservation = require('../models/reservation')

router.get('/', (req, res) => {
  res.render('reservation', {user: req.user})
})

router.post('/', (req, res) => {
  const inputData = new Reservation({
    id: req.user._id,
    station: req.body.station,
    date: req.body.date
  })
  Reservation.create(inputData, (err, inputDate) => {
    if(err) return console.log(err)
    res.redirect('/reservation')
  })
})

module.exports = router