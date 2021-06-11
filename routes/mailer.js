const express = require('express')
const amqplib = require('amqplib')

const router = express.Router()

router.route('/').post(async (req, res) => {

  let enquiry =  `
  <p>You have a new contact</p>
  <h3>Conatct Details</h3>
  Name: ${req.body.name}
  Email: ${req.body.email}
  Company: ${req.body.company}
  Phone: ${req.body.phone}
  `
  const queue = 'enquiry'

  let conn = amqplib.connect('amqp://localhost/')
  let channel = conn.createChannel()
  .then(channel => channel.assertQueue(queue))
  .then(channel => {
    let queuemessage = JSON.stringify({enquiry})
    channel.sendToQueue(queue, Buffer.from(queuemessage, 'utf8'))
  })

  res.json({message: 'mail sent'})

})

module.exports = router