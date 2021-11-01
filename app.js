const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");

app.use(cors());
app.use(express.json());

//ımport routes
const postsRoute = require("./routes/posts");

app.use("/posts", postsRoute);

app.get("/", (req, res) => {
  res.send("we are on home ");
});

mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connected DB");
  }
);

app.listen(4000);
