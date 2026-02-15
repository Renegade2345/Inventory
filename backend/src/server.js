require("dotenv").config();
require("dns").setDefaultResultOrder("ipv4first");

const mongoose = require("mongoose");
const app = require("./app");

const PORT = process.env.PORT || 5000;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      family: 4,
      serverSelectionTimeoutMS: 5000,
    });

    console.log("DB connected successfully");
    console.log("Connected DB:", conn.connection.name);
  } catch (error) {
    console.error("DB connection failed:", error.message);
    process.exit(1);
  }
};

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
