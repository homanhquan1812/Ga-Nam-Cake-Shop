const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

async function connect()
{
    try {
        await mongoose.connect('mongodb+srv://hcmutcakeshop:hcmut_cakeshop0110@cluster0.4oihz3u.mongodb.net/?retryWrites=true&w=majority/cakeshopDatabase')
        console.log('Connected successfully.')
    } catch (error) {
        console.log('Failed to connect.')
    }
}

module.exports = { connect }