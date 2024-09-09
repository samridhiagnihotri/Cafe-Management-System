const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { readdirSync } = require("fs");
const connectDatabase = require("./utils/database");

const app = express();

require("dotenv").config();

connectDatabase();

app.use(bodyParser.json());
app.use(cors());

// Reads the ./routes directory and dynamically requires each route file. This allows you to modularize route handling.
readdirSync("./routes").map((r) => {
  app.use("/", require(`./routes/${r}`));
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
