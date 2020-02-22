const mongoose = require('mongoose')

const stationSchema = mongoose.Schema({
  name: String,
  price: Number
})

const model = mongoose.model('Station', stationSchema)

module.exports = model