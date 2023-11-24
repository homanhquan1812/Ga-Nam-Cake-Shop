const express = require('express')
const morgan = require('morgan')
const Handlebars = require('express-handlebars')
const path = require('path')
const route = require('./routes')
const app = express()
const port = 1234 // Website address is: localhost:1234

const db = require('../config/db')

// Connect to MongoDB
db.connect()

// Morgan
app.use(morgan('combined'))

// Express Handlebars
app.engine('handlebars', Handlebars.engine())
app.set('view engine', 'handlebars')

// Templates in 'view' folder
app.set('views', path.join(__dirname, 'resources\\views'))

// Static files
app.use(express.static(path.join(__dirname, 'public')))

// Change Front-end's files' type to hbs
app.engine('hbs', Handlebars.engine({
  extname: '.hbs'
  }))
app.set('view engine', 'hbs')

// Homepage
app.get('/', function (req, res) {
  res.render('home')
})

// Route for Managers' Dashboard
app.get('/dashboard/manager', (req, res) => {
  res.render('dashboard\\dashboard', {
    styles: ['..\\css\\style.css'] // Specify the styles needed for this view
  });
});

// Route for Staffs' Dashboard
app.get('/dashboard/staff', (req, res) => {
  res.render('dashboard\\dashboard', {
    styles: ['..\\css\\style.css'] // Specify the styles needed for this view
  });
});

// Routes
route(app)

// Port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})