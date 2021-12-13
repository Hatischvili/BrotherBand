const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv-safe").config();


const db = require("./database/mongoConfig");
const routes = require("./routes/allRoutes");

app.use(cors());
app.use(express.json());
db.connect();



app.use("/", routes)

module.exports = app