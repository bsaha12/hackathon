import React from 'react';

interface NoteSearchProps {
  onSearch: (text: string) => void;
}

const NoteSearch: React.FC<NoteSearchProps> = ({ onSearch }) => {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <input type="search" className="absolute top-8 left-16 w-56 py-2 px-2 rounded-md" placeholder="Search..."
      onChange={handleSearch} />
  );
};

export default NoteSearch;
