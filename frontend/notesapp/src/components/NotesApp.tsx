import React, { useState, useEffect } from "react";
import NoteEditor from "./NoteEditor";
import NotesGrid from "./NotesGrid";

interface Note {
  text: string;
  color: string;
  id: number;
}

type NotesAppProps = {
  setLogIn: (val: boolean) => void;
};

const NotesApp: React.FC<NotesAppProps> = ({ setLogIn }) => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const localNotes = JSON.parse(
      localStorage.getItem("notes") || "[]"
    ) as Note[];
    setNotes(localNotes);
  }, []);

  const handleNoteAdd = (newNote: Note) => {
    const updatedNotes = [newNote, ...notes];
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    setNotes(updatedNotes);
  };

  const handleNoteDelete = (note: Note) => {
    const updatedNotes = notes.filter((n) => n.id !== note.id);
    setNotes(updatedNotes);
  };

  // const updateLocalStorage = () => {
    
  // };

  return (
    <>
      <div className="h-fit pt-16">
        <button
          className="absolute top-8 right-16 hover:bg-white hover:text-black hover:border-black border-solid bg-black py-2 px-8 rounded-md text-white border-white border"
          onClick={() => setLogIn(false)}
        >
          Logout
        </button>
        <div className="w-fit h-fit mb-16 mt-16">
          <h2 className="text-3xl ml-24 mb-2 text-white">Write Your Notes</h2>
          <NoteEditor onNoteAdd={handleNoteAdd} />
        </div>
      </div>
      <NotesGrid notesArr={notes} onNoteDelete={handleNoteDelete} />
    </>
  );
};

export default NotesApp;
