const express = require('express')
const app = express()
const port = 4000

if (process.env.NODE_ENV == "cakeshopwebsite") {
  require("dotenv").config();
}

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})