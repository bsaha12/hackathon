const express = require("express");
const { connection } = require("./db");
const { nlpRouter } = require("./routes/nlpRouter");
const cors = require("cors") ;

const app = express();

app.use(cors()) ;
app.use(express.json());

// basic route
app.get("/", (req, res) => {
  res.status(200).json({ msg: "Home Page" });
});

// nlp routes
app.use("/nlp", nlpRouter);

// Server Setup
app.listen(8080, async () => {
  try {
    await connection;
    console.log("connected to DB");
    console.log("Server Started");
  } catch (error) {
    console.log(error);
  }
});
