import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomeSearchBar({ className = "" }) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    navigate(`/search?query=${encodeURIComponent(q)}`);
  };

  return (
    <form
      onSubmit={onSubmit}
      className={`flex justify-center items-center my-6 px-4 ${className}`}
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Search products..."
        className="w-full max-w-xl p-3 rounded-l-md bg-gray-800 text-white border border-gray-700 
                   focus:border-emerald-400 focus:ring-emerald-400 focus:ring-1 focus:outline-none 
                   placeholder-gray-400"
        aria-label="Search products"
      />
      <button
        type="submit"
        className={`px-5 py-3 bg-emerald-500 text-white font-medium rounded-r-md transition-colors
                    hover:bg-emerald-600 ${
                      isFocused || query.length > 0
                        ? "ring-2 ring-emerald-400"
                        : ""
                    }`}
        aria-label="Search"
      >
        Search
      </button>
    </form>
  );
}