const User = require("../models/user");
const jwt = require("jwt-simple");
const config = require("../config");

exports.create = (req, res) => {
  if (!req.body.email) {
    return res.status(400);
  } else {
    const { email } = req.body;

    User.findOne({ where: { email: email } })

      .then((data) => {
        if (data) {
          return res.json({ token: jwt.encode(data.id, config.secretkey) });
        } else {
          return res.status(404).json({ error: "Username wrong!" });
        }
      })
      .catch((err) => {
        console.error("User.login", err);
        return res.sendStatus(400);
      });
  }
};

exports.findUserJWT = async (req, res) => {
  const { id } = req.jwt;
  await User.findOne({ where: { id: id } })
    .then((data) => {
      if (data) {
        res.json(data);
      } else {
        res.send({
          message: "Username doesn't exist!",
        });
      }
    })
    .catch((err) => {
      console.error("User.login", err);
      return res.sendStatus(400);
    });
};
