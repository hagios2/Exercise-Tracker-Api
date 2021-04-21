const express = require('express')
const jwt = require('jsonwebtoken')
let Exercise = require('./../Models/Exercise')

const router = express.Router()

router.route('/').get((req, res) => {

    Exercise.find({})
    .then(exercises => res.status(200).json(exercises))
    .catch(err => res.status(400).json({message: `Error: ${err}`}))
})

router.route('/:id/delete').delete((req, res) => {

    Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).json({message: 'exercise deleted'}))
    .catch(err => res.status(400).json({message: `Error: ${err}`}))
})

router.route('/:id/exercise').get((req, res) => {

    Exercise.findById(req.params.id)
    .then(exercise => res.status(200).json({exercise: exercise}))
    .catch(err => res.status(400).json({message: `Error: ${err}`}))
})

router.route('/:id/update').put((req, res) => {

    Exercise.findById(req.params.id)
    .then(exercise => {
        exercise.username = req.body.username
        exercise.date = req.body.date
        exercise.description = req.body.description
        exercise.duration = Number(req.body.duration)
    
        exercise.save()
        .then(() => res.status(200).json({message: 'exercises updated'}))
        .catch(err => res.status(400).json({message: `Error: ${err}`}))
    })
    .catch(err => res.status(400).json({message: `Error: ${err}`}))
})

router.route('/').post((req, res) => {

    jwt.verify(req.token, 'secretkey', (err, authData ) => {

        if(err)
        {
            res.status(403).json({message: 'Foridden', err})
        
        }else{

            const username = req.body.username
            const date = req.body.date
            const description = req.body.description
            const duration = Number(req.body.duration)
        
            const newExercise = new Exercise({
                username,
                date,
                description,
                duration
            })
        
            newExercise.save()
            .then(() => res.status(200).json({message: `exercise saved`, authData}))
            .catch(err => res.status(400).json({message: `Error: ${err}`}))
        }
    })
})

module.exports = router