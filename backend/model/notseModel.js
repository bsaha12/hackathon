const mongoose = require("mongoose");

const notesSchema = mongoose.Schema(
  {
    title: String,
    content: String,
    category: String,
    keywords: [String],
  },
  {
    versionKey: false,
  }
);

const NoteModel = mongoose.model("note", notesSchema);

module.exports = { NoteModel };
