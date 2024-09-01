require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const morgan = require('morgan')
const session = require('express-session')
const pgSession = require('connect-pg-simple')(session)
const { pool } = require('../config/db')
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
  store: new pgSession({
    pool: pool,
    tableName: 'session'
  }),
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: { 
    secure: process.env.NODE_ENV === 'production', // Set to true if using HTTPS in production
    maxAge: 60 * 60 * 1000 // 1 hour
  }
}))

// Route
route(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})