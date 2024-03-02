import React from 'react';

interface NoteSearchProps {
  onSearch: (text: string) => void;
}

const NoteSearch: React.FC<NoteSearchProps> = ({ onSearch }) => {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <input type="search" className="search-input" placeholder="Search..."
      onChange={handleSearch} />
  );
};

export default NoteSearch;
