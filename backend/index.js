const express = require("express");
const { connection } = require("./db");

const app = express();

///routes
app.get("/", (req, res) => {
  res.status(200).json({ msg: "Home Page" });
});

app.listen(8080, async () => {
  try {
    await connection;
    console.log("connected to DB");
    console.log("Server Started");
  } catch (error) {
    console.log(error);
  }
});
