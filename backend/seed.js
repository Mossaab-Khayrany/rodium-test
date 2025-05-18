const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const Table = require("./models/Table");

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    await Table.deleteMany({});

    const columns = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    const rows = 10;

    const dataToInsert = [];

    for (let row = 1; row <= rows; row++) {
      for (let col of columns) {
        dataToInsert.push({
          row,
          col,
          value: `Test ${col}${row}`,
        });
      }
    }

    await Table.insertMany(dataToInsert);

    console.log("Database seeded successfully");
    mongoose.connection.close();
  } catch (error) {
    console.error("Seeding error:", error);
    mongoose.connection.close();
  }
};

seedData();
