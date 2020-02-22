const mongoose = require('mongoose')

const reservationSchema = mongoose.Schema({
  name: String,
  station: String,
  date: String
})

const model = mongoose('Reservation', reservationSchema)

module.exports = model