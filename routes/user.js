const express = require('express')
let User = require('./../Models/User')

const router = express.Router()

router.route('/').get((req, res) => {

    User.find({})
    .then(users => res.status(200).json(users))
    .catch(err => res.status(400).json({message: `Error: ${err}`}))
})

router.route('/').post((req, res) => {

    const username = req.body.username

    const newUser = new User({username})

    newUser.save()
    .then(() => res.status(200).json({message: `Username saved`}))
    .catch(err => res.status(400).json({message: `Error: ${err}`}))
})

module.exports = router