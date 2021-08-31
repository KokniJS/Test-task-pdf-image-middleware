const express = require("express");
const nodemon = require("nodemon");
const sequelize = require("./db/db");
const mysql = require("mysql2");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require("./api/routers/user")(app);
require("./api/routers/auth")(app);
require("./api/routers/pdf")(app);

sequelize
  .sync()
  .then((result) => result)
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

app.listen(PORT, () => {
  console.log(`Server run on ${PORT}`);
});
