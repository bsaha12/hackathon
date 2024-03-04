const mongoose = require("mongoose");

const notesSchema = mongoose.Schema(
  {
    title: String,
    content: String
  },
  {
    versionKey: false,
  }
);

const NoteModel = mongoose.model("note", notesSchema);

module.exports = { NoteModel };
