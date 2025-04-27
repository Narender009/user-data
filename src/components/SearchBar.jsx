import React, { useState } from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm); // Search only when button clicked
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          placeholder="Search by first or last name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="search-button">
          <Search />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
