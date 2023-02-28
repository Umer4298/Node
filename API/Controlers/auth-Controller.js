const jwt = require("jsonwebtoken");
const sec = "hbhjgvhghvghghf";
const port = 3000;
const fs = require("fs");
const User = require("../Model/model");

//Signup API

const signup = (req, res) => {
  User.find({ email: req.body.email }, (err, users) => {
    if (err) {
      return res.status(500).json({ message: "Please try Again" });
    }
    if (users.length === 0) {
      if (!req.body.profile) {
        req.body.profile = "dummystring";
      }
      const user = new User(req.body);
      user.save();
      let token = jwt.sign({ email: req.body.email }, sec);
      return res.status(200).json({ message: "User created", token, user });
    } else {
      const index = users.length - 1;
      return res
        .status(500)
        .json({ message: "User alreaday exist", user: users[index] });
    }
  });
};

//Login API
const login = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  await User.findOne({ email: email, password: password })
    .then((user) => {
      if (user) {
        let token = jwt.sign({ email }, sec);
        return res.status(200).json({
          user,
          token,
        });
      } else {
        return res.status(404).json({
          message: "user not found",
          token,
        });
      }
    })
    .catch(() => {
      return res.status(401).json({
        message: "Please Check your Email or Password",
      });
    });
};

//Multer

// const upload = multer({
//   storage: multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, `uploads/${req.email}`);
//     },
//     filename: function (req, file, cb) {
//       cb(
//         null,
//         Date.now() + "-" + file.fieldname + path.extname(file.originalname)
//       );
//     },
//   }),
// }).single("file");

//Upload Img API

const uploadingImages = (req, res) => {
  console.log(req.body.file);
  if (!req.file) {
    return res.status(404).json({
      message: "File does not exist",
    });
  } else {
    fs.readdir("uploads/" + req.email, (err, files) => {
      if (err) {
        return res.status(500).json({
          message: " Error:Cannot find directory ",
        });
      } else {
        let fileUrl = files.map((file) => {
          return `${req.protocol}://${req.hostname}:${port}/uploads/${req.email}/${file}`;
        });
        let index = fileUrl.length - 1;

        User.updateOne(
          { email: req.email },
          {
            $set: {
              profile: fileUrl[index],
            },
          },
          (err, result) => {
            if (err) {
              return res.status(500).json({
                message: "Error",
              });
            }
            return res.status(200).json({
              message: "image uploaded on database !",
            });
          }
        );
      }
    });
  }
};

//Get Images API

const getImages = (req, res) => {
  fs.readdir("uploads/" + req.email, (err, files) => {
    if (err) {
      return res.status(500).json({
        message: " Error:Cannot find directory ",
      });
    }
    const fileUrls = files.map((file) => {
      return `${req.protocol}://${req.hostname}:${port}/uploads/${req.email}/${file}`;
    });
    return res.json({
      files: fileUrls,
    });
  });
};

//Delete Images

const deleteDir = (req, res) => {
  fs.rmdir("uploads/" + req.email, { recursive: true }, (err) => {
    if (err) {
      return res.status(500).json({
        message: "file does not exist",
      });
    } else {
      return res.status(200).json({
        message: "file deleted Successfully",
      });
    }
  });
};

//Get users API

const getUsers = (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      console.error(err);
      return res.status(404).json({
        message: "user not found",
      });
    } else {
      return res.json(users);
    }
  });
};

// //Change data

const changedata = (req, res) => {
  if (req.email === req.body.email) {
    return res.status(400).json({
      message: "User Already Exist",
    });
  } else {
    User.updateOne(
      { email: req.email },
      {
        $set: {
          email: req.body.email,
          password: req.body.password,
          Username: req.body.Username,
        },
      },
      (err) => {
        if (err) {
          return res.status(400).json({
            message: "Error",
          });
        } else {
          let email = req.body.email;
          console.log(email);
          req.email = email;
          let token = jwt.sign({ email }, sec);
          return res.status(200).json({
            message: "Email Updated Successfully",
            token,
          });
        }
      }
    );
  }
};

//Change Pwd

// const changePassword = (req, res) => {
//   User.updateOne(
//     { email: req.email },
//     { $set: { password: req.body.password } },
//     (err) => {
//       if (err) {
//         return res.status(400).json({
//           message: "Error",
//         });
//       } else {
//         return res.status(200).json({
//           message: "Password Updated Successfully",
//         });
//       }
//     }
//   );
// };

//User Details
const userDetails = (req, res) => {
  User.findOne({ email: req.email })
    .then((user) => {
      if (user) {
        return res.status(200).json({
          user,
        });
      }
    })
    .catch(() => {
      return res.status(401).json({
        message: "Please Check your Email or Password",
      });
    });
};

module.exports = {
  signup,
  login,
  uploadingImages,
  getImages,
  deleteDir,
  getUsers,
  changedata,
  userDetails,
};
