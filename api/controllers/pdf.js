const User = require("../models/user");
const PDFDocument = require("pdfkit");
const fs = require("fs");

exports.create = async (req, res) => {
  if (!req.body.email) {
    return res.status(400);
  }
  const { email } = req.body;
  const time = new Date().getTime();
  await User.findOne({
    where: {
      email: email,
    },
  })
    .then((data) => {
      if (data.pdf !== null) {
        const filePath = data.pdf;
        fs.unlinkSync(filePath);
      }
      const pdfDoc = new PDFDocument();
      const PDF = pdfDoc.pipe(fs.createWriteStream("myPDF/" + time + ".pdf"));
      pdfDoc.text(`${data.firstName} ${data.lastName}`);
      pdfDoc.image(data.image);
      pdfDoc.end();
      const result = User.update(
        { pdf: PDF.path },
        {
          where: {
            email: email,
          },
        }
      );
      res.json(true);
    })
    .catch((err) => {
      console.error(err);
      return res.json(false);
    });
};
