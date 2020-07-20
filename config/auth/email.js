const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
    service: 'mail.ru',
    auth: {
      user: 'diana.shelotkach@mail.ru',
      pass: 'vervmechtu'
    }
  });

function sendMail(text) {
    
var mailOptions = {
  from: 'diana.shelotkach@mail.ru',
  to: 'di13quest@gmail.com',
  subject: 'Sending Email using Node.js',
  text: text
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
}

module.exports = {
    sendMail 
}
