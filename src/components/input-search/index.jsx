import React from "react";
import { CiSearch } from "react-icons/ci";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="mb-4 flex justify-center items-center">
      <div className="relative w-1/2">
        <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border rounded p-2 pl-10 w-full" 
        />
      </div>
    </div>
  );
};

export default SearchBar;
