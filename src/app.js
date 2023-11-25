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

////////////////// Managers //////////////////
app.get('/managers/overview', (req, res) => {
  res.render('dashboard/managers/overview', {
      styles: ['/css/overview.css']
  });
});

app.get('/managers/dashboard', (req, res) => {
  res.render('dashboard/managers/dashboard', {
      styles: ['/css/dashboard.css']
  });
});

app.get('/managers/staffs', (req, res) => {
  res.render('dashboard/managers/staffs', {
      styles: ['/css/staffs.css']
  });
});

app.get('/managers/customers', (req, res) => {
  res.render('dashboard/managers/customers', {
      styles: ['/css/customers.css']
  });
});

app.get('/managers/orderhistory', (req, res) => {
  res.render('dashboard/managers/orderhistory', {
      styles: ['/css/orderhistory.css']
  });
});

app.get('/managers/notes', (req, res) => {
  res.render('dashboard/managers/notes', {
      styles: ['/css/notes.css']
  });
});

app.get('/managers/products', (req, res) => {
  res.render('dashboard/managers/products', {
      styles: ['/css/products.css']
  });
});

app.get('/managers/settings', (req, res) => {
  res.render('dashboard/managers/settings', {
      styles: ['/css/settings.css']
  });
});

//////////////// Employees ////////////////
app.get('/employees/overview', (req, res) => {
  res.render('dashboard/employees/overview', {
      styles: ['/css/overview.css']
  });
});

app.get('/employees/dashboard', (req, res) => {
  res.render('dashboard/employees/dashboard', {
      styles: ['/css/dashboard.css']
  });
});

app.get('/employees/orderhistory', (req, res) => {
  res.render('dashboard/employees/orderhistory', {
      styles: ['/css/orderhistory.css']
  });
});

app.get('/employees/notes', (req, res) => {
  res.render('dashboard/employees/notes', {
      styles: ['/css/notes.css']
  });
});

app.get('/employees/products', (req, res) => {
  res.render('dashboard/employees/products', {
      styles: ['/css/products.css']
  });
});

app.get('/employees/settings', (req, res) => {
  res.render('dashboard/employees/settings', {
      styles: ['/css/settings.css']
  });
});

// Routes
route(app)

// Port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})