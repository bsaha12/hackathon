import React, { useEffect, useRef, useState } from "react";
// import Masonry from "masonry-layout";
import NoteSearch from "./NoteSearch";
import { FaRegFileAlt } from "react-icons/fa";
import { GiClick } from "react-icons/gi";

interface Note {
  title: string;
  text: string;
  color: string;
  id: number;
}

interface NotesGridProps {
  notesArr: Note[];
  onNoteDelete: (note: Note) => void;
}

const NotesGrid: React.FC<NotesGridProps> = ({ notesArr, onNoteDelete }) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [filteredNote, setFilteredNote] = useState<Note[]>([]);

  const handleSearch = (text: string) => {
    setSearchValue(text);
  };



  useEffect(() => {
    const filtered = notesArr.filter(note => note.title === searchValue);
    setFilteredNote(filtered);
  }, [searchValue, notesArr]);

  return (
    <>
    <NoteSearch onSearch={handleSearch} />
    <div className="grid grid-cols-7 gap-4 pb-64">
      {notesArr.map((note) => (
        <div className="relative w-44 h-60 rounded-[30px] bg-zinc-100 text-zinc-900 overflow-hidden p-6">
          <div className="flex justify-between items-center">
          <FaRegFileAlt className="text-xl"/>
          <span className="border border-solid border-black px-1.5 rounded-t-full rounded-b-full hover:cursor-pointer hover:bg-white hover:text-black bg-black text-white" onClick={() => onNoteDelete(note)}> × </span>
          </div>
          <p className="mt-5 text-sm">Sentiment : Positive</p>
          <div className="footer absolute bottom-0 w-full h-12 left-0 py-3 px-8 hover:cursor-pointer hover:text-white hover:bg-violet-500">
            <div className="flex justify-between items-center">
              <h5 className="">Summary</h5>
              <GiClick />
            </div>
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default NotesGrid;

// <div key={note.id} className="note" style={{ backgroundColor: note.color }}>
        //   <span className="delete-note" onClick={() => onNoteDelete(note)}> × </span>
        //   {note.text}
        // </div>