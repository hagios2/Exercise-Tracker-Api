const express = require('express')
const jwt = require('jsonwebtoken')
let User = require('./../Models/User')

const router = express.Router()

router.route('/').post((req, res) => {
    
    User.find({username: req.body.username})
    .then(user => {
            jwt.sign({user}, 'secretkey', (err, token) => {
            res.json({token})
        })
    })
    .catch(err => res.status(400).json({message: `Error: ${err}`}))


})


module.exports = router
