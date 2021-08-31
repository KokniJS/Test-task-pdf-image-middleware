module.exports = (app) => {
  const user = require("../controllers/user");
  const multer = require("multer");
  const upload = multer({ dest: "uploads" });
  app.post("/user", upload.single("image"), user.create);
  app.get("/user", user.findByEmail);
  app.put("/user", upload.single("image"), user.update);
  app.delete("/user", user.delete);
};
