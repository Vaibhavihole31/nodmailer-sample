import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config()

const app = express()
app.use(express.json())

app.post('/sendEmail', (req, res) => {
  const { to, subject, text } = req.body
  console.log(req.body);
  
  const smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "vaibhavihole05@gmail.com",
      pass: process.env.APP_PASS
    }
  });

  const mailOptions = {
    from: "vaibhavihole05@gmail.com",
    to: to,
    subject: subject,
    text: text
  }

  smtpTransport.sendMail(mailOptions, (error, response) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent');
    }
    smtpTransport.close();
  });

  res.json({
    "status": true,
    "message": "message send successfully"
  })

})


// app.post('/sendEmail', function(req,res) {

//    var transporter = nodemailer.createTransport({
//        service: 'gmail',
//        auth: {
//         user: "vaibhavihole05@gmail.com",
//               pass: "arrzyhckhcdhysrq"
//        },
//    });

//    const mailOptions = {
//         from: "vaibhavihole05@gmail.com",
//         to: req.body.to,
//         subject: req.body.subject,
//         text: req.body.text
//       }
//       console.log(mailOptions);

//    transporter.sendMail(mailOptions, function(error, info) {
//        if (error) {
//            console.log(error);
//            return;
//        }
//        console.log('Message sent');
//        transporter.close();
//    });


// res.json({
//   "status": true,
//   "message": "message send successfully"
// })
// });


const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`server started running on port ${PORT}📦`)
})
