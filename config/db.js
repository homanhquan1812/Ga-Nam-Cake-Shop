const mongoose = require('mongoose')

async function connect()
{
    try {
        await mongoose.connect('mongodb+srv://hcmutcakeshop:hcmut_cakeshop0110@cluster0.4oihz3u.mongodb.net/cakeshopDatabase')
        console.log('Connected successfully.')
    } catch (error) {
        console.log('Failed to connect.')
    }
}

module.exports = { connect }