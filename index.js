const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./routes");
const mongoose = require("mongoose");
require("dotenv").config();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

app.use("/api", routes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => console.error("Error connecting to MongoDB:", err));
