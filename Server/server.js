//NPM INSTALL EXPRESS & CORS AFTER NODE MODULES(NPM INIT)
//NPM INSTALL NODE PG (NPM PG)
//LINK SERVER ON HEROKU
//CREATE GIT INIT FIRST THEN NEW HEROKU
//CREATE DATABASE WITH PGADMIN
const nodemailer = require("nodemailer");
const express = require('express');
const app = express();

const cors = require('cors');
//LINKING ROUTES.JS
const characters = require("./routes/charinfo");
const scores = require("./routes/scores");
const login = require("./routes/login");


//CORS
app.use(cors());

//JSON USAGE
app.use(express.json());

//ROUTING
app.use('/characters', characters);
app.use('/scores', scores);
app.use('/login', login);
app.get('/email', (req, res) => {
  main();
  res.sendStatus(201)
})

//LISTENING ON PORT
app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running");
});

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  console.log('hit the main function')
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });


  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
