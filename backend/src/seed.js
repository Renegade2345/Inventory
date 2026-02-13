require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/User");

const seedUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected to:", mongoose.connection.name);

    const existingUser = await User.findOne({ email: "admin@inventory.com" });

    if (existingUser) {
      console.log("Demo user already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    await User.create({
      email: "admin@inventory.com",
      password: hashedPassword,
    });

    console.log("Demo user created successfully");
    process.exit();
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seedUser();
