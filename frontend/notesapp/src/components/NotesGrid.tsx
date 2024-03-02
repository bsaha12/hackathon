import React, { useEffect, useRef } from 'react';
import Masonry from 'masonry-layout';

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
    <div className="notes-grid" ref={gridRef}>
      {notes.map(note => (
        <div key={note.id} className="note" style={{ backgroundColor: note.color }}>
          <span className="delete-note" onClick={() => onNoteDelete(note)}> × </span>
          {note.text}
        </div>
      ))}
    </div>
  );
};

export default NotesGrid;
