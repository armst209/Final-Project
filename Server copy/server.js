// //NPM INSTALL EXPRESS & CORS AFTER NODE MODULES(NPM INIT)
// //NPM INSTALL NODE PG (NPM PG)
// //LINK SERVER ON HEROKU
// //CREATE GIT INIT FIRST THEN NEW HEROKU
// //CREATE DATABASE WITH PGADMIN
// const nodemailer = require("nodemailer");
// const express = require('express');
// const app = express();

// const cors = require('cors');
// //LINKING ROUTES.JS
// const characters = require("./routes/charinfo");
// const scores = require("./routes/scores");
// const login = require("./routes/login");


// //CORS
// app.use(cors());

// //JSON USAGE
// app.use(express.json());

app.post('/send-email', function(req, res) {
  let transporter = nodeMailer.createTransport({
      service: 'gmail',
      auth: {
          // should be replaced with real sender's account
          user: 'jonnyappleseed656@gmail.com',
          pass: 'Jake123123'
      }
  });
  let mailOptions = {
      // should be replaced with real recipient's account
      to: 'jacobmaxplumb@gmail.com',
      subject: req.body.subject,
      text: req.body.message
  };
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
  });
  res.writeHead(301, { Location: 'index.html' });
  res.end();
});