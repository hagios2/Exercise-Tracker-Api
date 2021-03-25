const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config({path: './config/.env'})
const connection = require('./config/db')


const app = express()

//initiate middleware
app.use(cors())
app.use(express.json())

const PORT  = process.env.PORT || 3000

//specify routes

app.use('/api/exercises', require('./routes/exercise'))

app.use('/api/users', require('./routes/user'))

app.listen(PORT, () => console.log(`server running on port ${PORT}`))