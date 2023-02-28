const mongoose = require("mongoose");
const connectionString =
  "mongodb+srv://umer:FDCS8rkMcDqRCShG@cluster0.e6i27l8.mongodb.net/?retryWrites=true&w=majority";
mongoose.set("strictQuery", true);
const connectDB = async () => {
  try {
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected...");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
