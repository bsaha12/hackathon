import React, { useState } from 'react';

interface Note {
  text: string;
  color: string;
  id: number;
}

interface NoteEditorProps {
  onNoteAdd: (newNote: Note) => void;
}

const NoteEditor: React.FC<NoteEditorProps> = ({ onNoteAdd }) => {
  const [text, setText] = useState<string>('');
  const [color, setColor] = useState<string>('#FFA726');

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleNoteAdd = () => {
    const newNote: Note = {
      text: text,
      color: color,
      id: Date.now()
    };
    onNoteAdd(newNote);
    setText('');
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColor(event.target.value);
  };

  return (
    <div className="note-editor">
      <textarea
        placeholder="Enter your note here..."
        rows={5}
        className="textarea"
        value={text}
        onChange={handleTextChange}
      />
      <div className="color-picker" onChange={handleColorChange}>
        <input type="radio" name="color-pick" value="#F06292" id="color1" />
        <label htmlFor="color1" style={{ backgroundColor: "#F06292" }}></label>
        <input type="radio" name="color-pick" value="#BA68C8" id="color2" />
        <label htmlFor="color2" style={{ backgroundColor: "#BA68C8" }}></label>
        <input type="radio" name="color-pick" value="#FFD54F" id="color3" />
        <label htmlFor="color3" style={{ backgroundColor: "#FFD54F" }}></label>
        <input type="radio" name="color-pick" value="#4FC3F7" id="color4" />
        <label htmlFor="color4" style={{ backgroundColor: "#4FC3F7" }}></label>
        <input type="radio" name="color-pick" value="#AED581" id="color5" />
        <label htmlFor="color5" style={{ backgroundColor: "#AED581" }}></label>
      </div>
      <button className="add-button" onClick={handleNoteAdd}>Add</button>
    </div>
  );
};

export default NoteEditor;
