import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "../lib/axios";
import ProductCard from "../components/ProductCard";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SearchResultsPage() {
  const qparams = useQuery();
  const query = qparams.get("query") || "";
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) {
      setProducts([]);
      return;
    }

    const fetchResults = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get(
          `/products/search?search=${encodeURIComponent(query)}`
        );
        const data = res.data;
        setProducts(data.products ?? data);
      } catch (err) {
        console.error("Search error:", err);
        setError("Failed to load results.");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Results for “{query}”</h2>

      {loading && <p>Loading…</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && products?.length === 0 && (
        <p>No products found for “{query}”. Try different keywords.</p>
      )}

      {!loading && products?.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <ProductCard key={p._id ?? p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}