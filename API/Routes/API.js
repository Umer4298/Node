const express = require("express");
const router = express.Router();
const { upload } = require("../Middleware/Multer");
const { isLoggedIn } = require("../Middleware/isLoggedin");
const { createDirectory, removeDP } = require("../Middleware/createDirectory");
const {
  login,
  signup,
  getUsers,
  deleteDir,
  uploadingImages,
  getImages,
  changedata,
  userDetails,
} = require("../Controlers/auth-Controller");

//Routes

router.post("/login", login);
router.post(
  "/images",
  isLoggedIn,
  removeDP,
  createDirectory,
  upload,
  uploadingImages
);
router.get("/images", isLoggedIn, getImages);
router.delete("/delete", isLoggedIn, deleteDir);
router.post("/signup", signup);
router.get("/getUsers", getUsers);
router.patch("/changedata", isLoggedIn, changedata);
// router.patch("/changePassword", isLoggedIn, changePassword);
router.get("/userDetails", isLoggedIn, userDetails);
// router.delete("/deleteAll",deleteAll);

module.exports = router;
