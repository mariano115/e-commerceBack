var express = require("express");
var router = express.Router();
const nodemailer = require("nodemailer");
const endpoints = require("../config");

router.post("/", function (req, res, next) {
  console.log(req.body);

  const body = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 2525,
    auth: {
      user: endpoints.Email,
      pass: endpoints.PassEmail,
    },
  });

  // verify connection configuration
  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });

  var mail = {
    from: body.firstName + " " + body.secondName,
    to: body.email,
    subject: "Contacto",
    text: body.message,
  };

  console.log(mail);

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log("ok");
    }
  });

  res.send("Perfect");
});

module.exports = router;
