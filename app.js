const express = require('express')
const morgan = require('morgan')

const app = express()
const port = 1234 // Website address is: localhost:1234

const db = require('./config/db')

// Connect to MongoDB
db.connect()

// HTTP Logger
app.use(morgan('combined'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})