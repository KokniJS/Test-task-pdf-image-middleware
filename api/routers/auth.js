module.exports = (app) => {
  const auth = require("../controllers/auth");
  const isAuth = require("../helpers/isAuth");
  app.post("/auth", auth.create);
  app.get("/auth", isAuth, auth.findUserJWT);
};
