var express=require('express');
var bodyParser = require('body-parser')// importing body parser middleware to parse form content from HTML
var cors = require('./../cors');
const emailRouter = express.Router();
var nodemailer = require('nodemailer');//importing node mailer


// const accessToken = oauth2Client.getAccessToken();

emailRouter.route('/email')
.options(cors.cors,(req,res)=>{
    console.log("Coming email here");
    res.sendStatus(200);
})

// route which captures form details and sends it to your personal mail
.post(cors.cors,(req,res,next)=>{
  
  console.log("oooo",req.body.email)

  // Generate a random 6-digit number
  function generateRandomNumber() {
  var min = 100000; // Minimum 6-digit number
  var max = 999999; // Maximum 6-digit number
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Example usage
var randomNumber = generateRandomNumber();
console.log(randomNumber);

  /*Transport service is used by node mailer to send emails, it takes service and auth object as parameters.
    here we are using gmail as our service 
    In Auth object , we specify our email and password
  */
  var transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: 'teddymcdonald630@gmail.com',
      pass: '', // put app password here
  },
});
transporter.verify().then(console.log).catch(console.error);

  /*
    In mail options we specify from and to address, subject and HTML content.
    In our case , we use our personal email as from and to address,
    Subject is Contact name and 
    html is our form details which we parsed using bodyParser.
  */
  var mailOptions = {
    from: 'teddymcdonald630@gmail.com',//replace with your email
    to: req.body.email,//replace with your email
    subject: `NodeMail Testing`,
    html:`Your OTP is <h2>${randomNumber}</h2>`
  };

  res.json({
    otp: randomNumber,
    email: req.body.email
});
  
  /* Here comes the important part, sendMail is the method which actually sends email, it takes mail options and
   call back as parameter 
  */

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      res.send('error') // if error occurs send error as response to client
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Sent Successfully')//if mail is sent successfully send Sent successfully as response
    }
  });
})


module.exports = emailRouter;