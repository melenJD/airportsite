const mongoose = require('mongoose'),
      passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  avatarUrl: String
})

userSchema.plugin(passportLocalMongoose, {usernameField: 'email'})

const model = mongoose.model('User', userSchema)

module.exports = model