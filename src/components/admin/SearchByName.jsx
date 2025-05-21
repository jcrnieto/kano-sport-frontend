import { useState } from "react";
import axiosInstance from "../../instance/axiosInstance";
import { useSearch } from "../../context/SearchContext";

const SearchByName = () => {
  const [query, setQuery] = useState("");
  const { setSearchResults } = useSearch();

  const handleSearch = async () => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;

    try {
      const response = await axiosInstance.get(`/student/name?name=${trimmedQuery}`);
      setSearchResults(response.data.data);
      console.log("Resultados en searchByName:", response.data.data);
      setQuery(""); // limpia el input
    } catch (error) {
      console.error("Error al buscar:", error);
      setSearchResults(null);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="flex w-full justify-center gap-2">
      <input
        type="text"
        placeholder="Buscar..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="border border-black rounded px-4 py-2 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-black"
      />
      <button
        onClick={handleSearch}
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
      >
        Buscar
      </button>
    </div>
  );
};

export default SearchByName;
