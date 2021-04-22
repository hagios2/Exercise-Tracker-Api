const nodemailer = require('nodemailer')
const express = require('express')


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
    
    // let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      // secure: false, // true for 465, false for other ports
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
      html: enquiry, // html body
    }
  
    // send mail with defined transport object
    let info = await transporter.sendMail(mail_options, (error, info) => {
        if(error)
        {
          return console.log(error)
        }

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

        return res.json({message: 'failed to send mail'})
    });
  
 

    res.json({message: 'mail sent'})

})


module.exports = router