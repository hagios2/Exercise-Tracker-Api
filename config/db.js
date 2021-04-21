const mongoose = require('mongoose')

const url = process.env.DB_URL

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true,  useCreateIndex: true})

const connection = mongoose.connection

connection.once('open', () => {
    console.log('connection with monogo established succussfully')
})

module.exports = connection
