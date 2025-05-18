const express = require("express");
const cors = require("cors");
const connectDB = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

const tableRoutes = require("./routes/table");
app.use("/table", tableRoutes);

app.get("/", (req, res) => {
  res.send("Backend is working!");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
