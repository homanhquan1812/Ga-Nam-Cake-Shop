const express = require('express')
const morgan = require('morgan')
const Handlebars = require('express-handlebars')
const path = require('path')
const route = require('./routes')
const app = express()
const port = 1234 // Website address is: localhost:1234
const methodOverride = require('method-override')
const db = require('../config/db')

// Delete
app.use(methodOverride('_method'))

// Store
app.use(express.urlencoded({ extended: true })) 
app.use(express.json())

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
  extname: '.hbs',
  helpers: {
    sum: (a, b) => a + b,
    eq: (c, d) => c == d,
    isBool: (value, compareValue) => typeof value === 'boolean' && value === compareValue,
    getTotal: function (orders) {
      if (!Array.isArray(orders)) {
        return 0; // Return 0 if orders is not an array
      }

      let totalSum = 0;

      orders.forEach(order => {
        if (order && !order.declined) { // Check if order is defined and declined is false
          totalSum += order.totalcost || 0;
        }
      });

      return totalSum;
    }
  }
}));


app.set('view engine', 'hbs')

// Homepage
app.get('/', function (req, res) {
  res.render('home')
})

// Routes
route(app)

// Port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})