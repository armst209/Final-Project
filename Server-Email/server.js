let express = require("express"),
    path = require('path'),
    nodeMailer = require('nodemailer'),
    bodyParser = require('body-parser');
let app = express();
app.use(express.static('src'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
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
        to: 'AmberAaronGarrett@gmail.com',
        subject: req.body.subject,
        text: req.body.message
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
    res.end();
});
let server = app.listen(process.env.PORT || 4000, function() {
    let port = server.address().port;
    console.log("Server started at http://localhost:%s", port);
});