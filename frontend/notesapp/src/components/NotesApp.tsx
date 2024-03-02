import React, { useState, useEffect } from 'react';
import NoteSearch from './NoteSearch';
import NoteEditor from './NoteEditor';
import NotesGrid from './NotesGrid';

interface Note {
  text: string;
  color: string;
  id: number;
}

const NotesApp: React.FC = () => {
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
    <div className="notes-app">
      <h2 className="app-header">NotesApp</h2>
      <NoteSearch onSearch={handleSearch} />
      <NoteEditor onNoteAdd={handleNoteAdd} />
      <NotesGrid notes={filteredNotes} onNoteDelete={handleNoteDelete} />
    </div>
  );
};

export default NotesApp;
