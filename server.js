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

app.use('/api/auth/login', require('./routes/auth'))

app.use('/api/exercises', verifyToken, require('./routes/exercise'))

app.use('/api/users', verifyToken, require('./routes/user'))

function verifyToken(req, res, next)
{
    const bearerHeader = req.headers['authorization']

    if(typeof bearerHeader !== 'undefined')
    {
        const bearer = bearerHeader.split(' ')

        const token = bearer[1]

        req.token = token

        next();

    }else{

        res.sendStatus(403)
    }
}

app.listen(PORT, () => console.log(`server running on port ${PORT}`))