require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const morgan = require('morgan')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const route = require('./route')
const cors = require('cors')
const db = require('../config/db')

// Database
db.connect()

// CORS
app.use(cors({ 
    origin: 'http://localhost:5173',
    credentials: true
}))

// Morgan
app.use(morgan('combined'))

// Express Body-parser: Handle data types such as JSON, Raw, Text, URL, etc.
app.use(express.urlencoded({ extended: true })) 
app.use(express.json())

// Session
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    ttl: 24 * 60 * 60 // 1 day
  }),
  cookie: { 
    secure: process.env.NODE_ENV === 'production', // Set to true if using HTTPS in production
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  } 
}))

// Route
route(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})