const express = require("express");
const { spawn } = require("child_process");
const { NoteModel } = require("../model/notseModel");

const nlpRouter = express.Router();

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
nlpRouter.post("/", async (req, res) => {
  try {
    const payload = req.body;
    const { title, content: inputData } = payload;

    // Validate if inputData exists
    if (!inputData) {
      return res.status(400).json({ error: "Input data is required" });
    }

    const note = new NoteModel({ title, content: inputData });
    // await note.save();

    // Spawn Python process
    const pythonProcess = spawn("python", ["./nlp_script.py", inputData]);

    // Collect data from Python script
    let result = "";

    pythonProcess.stdout.on("data", (data) => {
      result += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      console.error(`Error: ${data}`);
      return res.status(500).json({ error: "Internal Server Error" });
    });

    pythonProcess.on("close", (code) => {
      if (code === 0) {
        let comps = result.split("\r\n");
        let sentiment = comps[0].split(": ")[1];
        let category = comps[1].split(": ")[1];
        let summary = comps[2].split(": ")[1];
        // console.log(sentiment, summary) ;
        return res.status(200).json({ sentiment, category, summary });
      } else {
        return res.status(500).json({ error: "Processing failed" });
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = { nlpRouter };
