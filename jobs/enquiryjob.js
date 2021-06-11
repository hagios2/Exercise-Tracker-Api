const nodemailer = require('nodemailer')
const amqplib = require('amqplib')

const queue = 'enquiry'

amqplib.connect('amqp://localhost/')
.then(conn => conn.createChannel())
.then(channel => channel.assertQueue(queue))
.then(channel => {
  channel.consume(queue, async (message) => {

    if(message != null)
    {
        log.debug(`Got message ${message.content.toString()}`)

       const queuemessage = JSON.parse(message.content.toString())

       // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.MAILUSERNAME, // generated ethereal user
          pass: process.env.MAILPASSWORD, // generated ethereal password
        },
        rejectUnauthorized: false
      });
    
      let mail_options = {
        from: '"Emmanuuel Oteng wilson" <hagioswilson@gmail.com>', // sender address
        to: "ewilson@npontu.com", // list of receivers
        subject: "Enquiries", // Subject line
        text: "Hello world?", // plain text body
        html: queuemessage.enquiry, // html body
      }
    
      // send mail with defined transport object
      let info = await transporter.sendMail(mail_options, (error, info) => {
          if(error)
          {
            return console.log(error)
          }
    
          console.log("Message sent: %s", info.messageId);
          // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
         
      });
    }
})

    
})