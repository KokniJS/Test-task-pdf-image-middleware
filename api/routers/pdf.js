module.exports = (app) => {
  const pdf = require("../controllers/pdf");
  app.post("/pdf", pdf.create);
};
