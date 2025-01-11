import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function Search({ onSearch }) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    if (search) {
      navigate(`/recipe?page=1&search=${encodeURIComponent(search)}`);
    } else {
      navigate("/recipe");
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative">
      <FiSearch className="absolute bottom-3 left-3 dark:text-orange-600" />
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search recipe..."
        className="w-full px-10 py-2 mt-5 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-600"
      />
    </form>
  );
}
