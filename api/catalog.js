var express = require("express");
//const User = require("../models/user");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.send("Te devolvi imagenes");
});

router.post("/add", upload.single("file"), (req, res) => {
  console.log("body", req.file.length, req.file);
  res.json({ success: true });
});

router.delete("/delete", function (req, res, next) {
  res.send("Endpoint funcional");

  let body = req.body;
  console.log(body);
  User.findOne({
    username: body.username,
  })
    .then(function (response) {
      // handle success
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });

  if (user.password === body.password) res.send("OK");
  res.send("No login");
});

module.exports = router;
