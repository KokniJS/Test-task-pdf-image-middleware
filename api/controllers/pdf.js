const User = require("../models/user");
const PDFDocument = require("pdfkit");
const fs = require("fs");

exports.create = async (req, res) => {
  if (!req.body.email) {
    return res.status(400);
  } else {
    const { email } = req.body;
    const time = new Date().getTime();
    await User.findOne({
      where: {
        email: email,
      },
    }).then((data) => {
      if (data.pdf !== null) {
        console.log(data.email);
        const filePath = data.pdf;
        fs.unlinkSync(filePath);
        User.update(
          { pdf: null },
          {
            where: { email: data.email },
          }
        );
        return res.json("Pdf has been update");
      } else if (data.pdf == null) {
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
      } else {
        res.json(false);
      }
    });
  }
};
