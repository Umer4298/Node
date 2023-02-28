const jwt = require("jsonwebtoken");
const sec = "hbhjgvhghvghghf";
const isLoggedIn = (req, res, next) => {
  if (req.headers && req.headers.token) {
    let decoded = jwt.verify(req.headers.token, sec);
    console.log(decoded);
    req.email = decoded.email;
    next();
  } else {
    return res.status(401).json({
      message: "Not Allowed!!!!",
    });
  }
};
module.exports = { isLoggedIn };
