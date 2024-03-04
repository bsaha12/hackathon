import React, { useState } from "react";

interface Note {
  title: string;
  text: string;
  color: string;
  id: number;
}

interface NoteEditorProps {
  onNoteAdd: (newNote: Note) => void;
}

const NoteEditor: React.FC<NoteEditorProps> = ({ onNoteAdd }) => {
  const [text, setText] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleNoteAdd = () => {
    const newNote: Note = {
      title: title,
      text: text,
      color: 'white',
      id: Date.now(),
    };
    onNoteAdd(newNote);
    setText("");
    setTitle('');
  };



  return (
    <div className="my-4 flex flex-col items-center justify-center gap-4">
      <input type="search" className="w-96 py-2 px-2 rounded-md" placeholder="Write a title..."
      onChange={handleTitleChange} />
      <textarea
        placeholder="Enter your note here..."
        rows={5}
        className="w-96 py-2 pl-2 rounded-md"
        value={text}
        onChange={handleTextChange}
      />
      <button className="hover:bg-white hover:text-black hover:border-black border-solid bg-black py-2 px-8 rounded-md text-white border-white border" onClick={handleNoteAdd}>
        Add New Note
      </button>
    </div>
  );
};

export default NoteEditor;
