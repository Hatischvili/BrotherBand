const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();


const db = require("./database/mongoConfig");
db.connect();

const routes = require("./routes/allRoutes");

app.use(cors());

app.use(express.json());




app.use("/", routes)

module.exports = app