const fs = require("fs");

const removeDP = (req, res, next) => {
  fs.rmdir("uploads/" + req.email, { recursive: true }, (err) => {
    if (err) {
      next();
    } else {
      next();
    }
  });
};

const createDirectory = (req, res, next) => {
  var dir = "uploads/" + req.email;

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    next();
  } else {
    next();
  }
};

module.exports = { createDirectory, removeDP };
