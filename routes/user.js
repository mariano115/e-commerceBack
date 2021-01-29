const express = require("express");
const router = express.Router();
const User = require("../models/user");

/* GET users listing. */
router.post("/", function (req, res, next) {
  let body = req.body;
  console.log(body);

  const user = User.findOne({
    username: body.username,
  });
  console.log(user);
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
