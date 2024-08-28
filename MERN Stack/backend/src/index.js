require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const morgan = require('morgan')
const methodOverride = require('method-override')
const session = require('express-session')
const route = require('./routes')
const cors = require('cors')
const db = require('../config/db')

// Database
db.connect()

// CORS
app.use(cors({ 
    origin: 'http://localhost:5173'
}))

// Morgan
app.use(morgan('combined'))

// Express Body-parser: Handle data types such as JSON, Raw, Text, URL, etc.
app.use(express.urlencoded({ extended: true })) 
app.use(express.json())

// Method override
app.use(methodOverride('_method'))

// Session
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: { 
    secure: false // Set to true if using HTTPS
  } 
}))

// Route
route(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})