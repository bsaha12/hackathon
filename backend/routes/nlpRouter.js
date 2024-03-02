const express = require("express") ;
const { spawn } = require("child_process");


const nlpRouter = express.Router() ;

//NLP GET Route
nlpRouter.get("/", (req, res) => {
    const pythonProcess = spawn("python", ["./nlp_script.py"]);
  
    pythonProcess.stdout.on("data", (data) => {
      res.status(200).json({ result: data.toString() });
    });
  
    pythonProcess.on("close", (code) => {
      if (code !== 0) {
        res.status(500).json({ error: "NLP script execution failed" });
      }
    });
  });
  
  //// POST route to handle incoming data
  nlpRouter.post("/", (req, res) => {
    try {
      const inputData = req.body.data;
  
      // Validate if inputData exists
      if (!inputData) {
        return res.status(400).json({ error: "Input data is required" });
      }
  
      // Spawn Python process
      const pythonProcess = spawn("python", ["./nlp_script.py", inputData]);
  
      // Collect data from Python script
      let result = "";
  
      pythonProcess.stdout.on("data", (data) => {
        result += data.toString();
      });
  
      pythonProcess.stderr.on("data", (data) => {
        console.error(`Error: ${data}`);
        res.status(500).json({ error: "Internal Server Error" });
      });
  
      pythonProcess.on("close", (code) => {
        if (code === 0) {
          res.status(200).json({ result });
        } else {
          res.status(500).json({ error: "Processing failed" });
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  module.exports = {nlpRouter} ;