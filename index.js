if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const methodOverride = require('method-override')
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const mongoose = require('mongoose')
const app = express()

//App settings
app.use(express.static(__dirname + '/public'))
app.set('view engine', 'pug')
app.use(express.urlencoded({extended:false}))
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

//Mongoose settings
mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
mongoose.set('useUnifiedTopology', true)
mongoose.connect(process.env.MONGO_DB)
const db = mongoose.connection

db.once('open', () => {
  console.log('DB CONNECTED')
})

db.on('error', (err) => {
  console.log('DB ERROR : ', err)
})

//routes
app.get('/', (req, res) => {
  res.render('index')
})

//port and start
const port = 3000
app.listen(port, () => {
  console.log('SERVER ON')
})