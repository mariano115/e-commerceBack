var express = require("express");
const User = require("../models/user");
var router = express.Router();

router.post("/", function (req, res, next) {
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

router.post("/register", function (req, res, next) {
  console.log("Tu usuario se creo correctamente");
  console.log(req.body);
  let body = req.body;
  let user = new User({
    username: body.username,
    password: body.password,
  });

  user.save((err, userDB) => {
    if (err)
      return res.json({
        ok: false,
        msg: "Hubo un error",
      });
    res.json({
      ok: true,
      msg: "Usuario creado correctamente",
      user: userDB,
    });
  });
});

module.exports = router;
