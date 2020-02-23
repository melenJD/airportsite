const mongoose = require('mongoose')

const reservationSchema = mongoose.Schema({
  id: String,
  name: String,
  station: String,
  date: String
})

const model = mongoose.model('Reservation', reservationSchema)

module.exports = model