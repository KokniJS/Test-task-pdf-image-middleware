const User = require("../models/user");
const fs = require("fs");

exports.create = async (req, res) => {
  if (!req.body.email || !req.body.firstName || !req.body.lastName) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const image = req.file;

  const userData = {
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    image: image.path,
    pdf: null,
  };

  await User.findOne({
    where: {
      email: userData.email,
    },
  })
    .then((data) => {
      if (data) {
        return res.json("This user already exists");
      } else {
        return User.create(userData);
      }
    })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Does not work",
      });
    });
};

exports.findById = async (req, res) => {
  const id = req.body.id;

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
      console.error("User.user", err);
      return res.sendStatus(400);
    });
};

exports.findAllUser = async (req, res) => {
  await User.findAll()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.error("User.user", err);
      return res.sendStatus(400);
    });
};

exports.update = async (req, res) => {
  const id = req.body.id;
  const image = req.file;

  if (req.body.image) {
    const result = await User.findByPk(id).then((data) => {
      if (data.image !== null) {
        const filePath = data.image;
        fs.unlinkSync(filePath);
        User.update(
          { image: image.path },
          {
            where: { id: data.id },
          }
        );
      } else {
        return res.send("Does not work");
      }
    });
  } else {
    await User.update(req.body, {
      where: { id: id },
    })
      .then((data) => {
        res.status(200).send({
          message: "User has been update",
        });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Does not work",
        });
      });
  }
};

exports.delete = async (req, res) => {
  const id = req.body.id;
  const result = await User.findByPk(id).then((data) => {
    if (!data) {
      return res.send("User not found");
    } else {
      const filePath = data.image;
      fs.unlinkSync(filePath);
    }
  });
  await User.destroy({
    where: { id: id },
  })
    .then((data) => {
      res.send("User has been delete");
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Does not work",
      });
    });
};
