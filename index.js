const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const path = require("path");
app.use(express.json());
app.use(cors());
const connectDB = require("./API/Helper/db");

// Connect to DB
connectDB();

// Enable CORS for specific origins
const allowedOrigins = ["http://localhost:3001"];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

// routes
const APIRouter = require("./API/Routes/API");

app.use("/API", APIRouter);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
