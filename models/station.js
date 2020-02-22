const mongoose = require('mongoose')

const stationSchema = mongoose.Schema({
  name: String,
  price: Number
})

const model = mongoose('Station', stationSchema)

module.exports = model