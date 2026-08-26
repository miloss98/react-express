const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");

const feedRoutes = require("./routes/feed");

const app = express();

app.use(bodyparser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE",
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/feed", feedRoutes);

mongoose
  .connect(
    "mongodb+srv://stojanovic98m_db_user:APCPQ2PPN3ph0tZV@cluster0.sih3hyb.mongodb.net/?appName=Cluster0",
  )
  .then((result) => {
    app.listen(8080);
  })
  .catch((err) => console.log(err));
