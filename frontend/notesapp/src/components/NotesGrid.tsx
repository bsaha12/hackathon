import React, { useEffect, useRef } from 'react';
import Masonry from 'masonry-layout';
import { FaRegFileAlt } from 'react-icons/fa'
import { GiClick } from "react-icons/gi";

interface Note {
  text: string;
  color: string;
  id: number;
}

interface NotesGridProps {
  notes: Note[];
  onNoteDelete: (note: Note) => void;
}

const NotesGrid: React.FC<NotesGridProps> = ({ notes, onNoteDelete }) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const msnryRef = useRef<Masonry | null>(null);

  useEffect(() => {
    if (gridRef.current) {
      msnryRef.current = new Masonry(gridRef.current, {
        itemSelector: '.note',
        columnWidth: 200,
        gutter: 10,
        isFitWidth: true
      });
    }
  }, []);

  useEffect(() => {
    if (msnryRef.current) {
      msnryRef.current.reloadItems();
      msnryRef.current.layout();
    }
  }, [notes]);

  return (
    <div className="notes-grid grid grid-cols-5 w-full" ref={gridRef}>
      {notes.map(note => (

<div className='relative flex-shrink-0 w-44 h-60 rounded-[30px] bg-zinc-100 text-zinc-900 overflow-hidden p-6'>
<FaRegFileAlt />
<p className='mt-5 text-sm'>Sentiment : Positive</p>
<div className='footer absolute bottom-0 w-full h-12 left-0 py-3 px-8 hover:bg-violet-600'>
    <div className='flex justify-between items-center'>
        <h5 className=''>Summary</h5>
        <GiClick />
    </div>
</div>
</div>






        // <div key={note.id} className="note" style={{ backgroundColor: note.color }}>
        //   <span className="delete-note" onClick={() => onNoteDelete(note)}> × </span>
        //   {note.text}
        // </div>
      ))}
    </div>
  );
};

export default NotesGrid;
