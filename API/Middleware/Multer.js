const path = require("path");
const multer = require("multer");
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `uploads/${req.email}`);
    },
    filename: function (req, file, cb) {
      cb(
        null,
        Date.now() + "-" + file.fieldname + path.extname(file.originalname)
      );
    },
  }),
}).single("image");
module.exports = { upload };
