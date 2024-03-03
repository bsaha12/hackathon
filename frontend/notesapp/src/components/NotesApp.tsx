import React, { useState, useEffect } from 'react';
import NoteSearch from './NoteSearch';
import NoteEditor from './NoteEditor';
import NotesGrid from './NotesGrid';

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
  const [searchValue, setSearchValue] = useState<string>('');
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);

  useEffect(() => {
    const localNotes = JSON.parse(localStorage.getItem('notes') || '[]') as Note[];
    setNotes(localNotes);
    setFilteredNotes(localNotes);
  }, []);

  useEffect(() => {
    const filtered = notes.filter(note =>
      note.text.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredNotes(filtered);
  }, [notes, searchValue]);

  const handleNoteAdd = (newNote: Note) => {
    const updatedNotes = [newNote, ...notes];
    setNotes(updatedNotes);
  };

  const handleNoteDelete = (note: Note) => {
    const updatedNotes = notes.filter(n => n.id !== note.id);
    setNotes(updatedNotes);
  };

  const handleSearch = (text: string) => {
    setSearchValue(text);
  };

  const updateLocalStorage = () => {
    localStorage.setItem('notes', JSON.stringify(notes));
  };

  return (
    <div className="h-fit">
      <button className="absolute top-8 right-24 hover:bg-white hover:text-black hover:border-black border-solid bg-black py-2 px-8 rounded-md text-white border-white border" onClick={() => setLogIn(false)}>Logout</button>
      <h2 className="text-3xl ml-24 mb-2 text-white">Write Your Notes</h2>
      <NoteSearch onSearch={handleSearch} />
      <NoteEditor onNoteAdd={handleNoteAdd} />
      <NotesGrid notes={filteredNotes} onNoteDelete={handleNoteDelete} />
    </div>
  );
};

export default NotesApp;
