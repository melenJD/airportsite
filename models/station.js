const mongoose = require('mongoose')

const stationSchema = mongoose.Schema({
  name: String,
  price: Number,
  picName: String
})

const model = mongoose.model('Station', stationSchema)

module.exports = model