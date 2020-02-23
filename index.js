if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const methodOverride = require('method-override')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const mongoose = require('mongoose')
const User = require('./models/user')
const app = express()
const Station = require('./models/station')
const Reservation = require('./models/reservation')

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

//passport settings
passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

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
  Station.find({}, (err, stations) => {
    if(err) console.log(err)
    res.render('index', {user: req.user, stations:stations})
  }).limit(3)
})

app.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

app.get('/mypage', isLogin, (req, res) => {
  Reservation.find({id:req.user._id}, async (err, reservations) => {
    if(err) console.log(err)
    stations = []
    for(let i=0;i<reservations.length;i++){
      await Station.findOne({_id:reservations[i].station}, async (err, station) => {
          if(err) return console.log(err)
           await stations.push(station)
        })
    }
    console.log(stations)
    res.render('mypage', {user: req.user, reservations:reservations, stations:stations})
  })
})

app.get('/mypage/:id/delete', isLogin, (req, res) => {
  Reservation.deleteOne({_id:req.params.id}, (err) => {
    if(err) console.log(err)
    res.redirect('/mypage')
  })
})

app.get('/info', (req, res) => {
  Station.find({}, (err, stations) => {
    if(err) console.log(err)
    res.render('info', {user: req.user, stations:stations})
  })
})

app.use('/admin', require('./routes/admin'))

app.use('/login', require('./routes/login'))
app.use('/register', require('./routes/register'))
app.use('/reservation', require('./routes/reservation'))

function isLogin(req, res, next) {
  if(req.user == null){
    return res.redirect('/')
  }
  next()
}

//port and start
const port = 3000
app.listen(port, () => {
  console.log('SERVER ON')
})