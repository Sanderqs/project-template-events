import { createContext, useContext, useEffect, useState } from "react";
import { getCategories } from "../services/api";

const CategoriesContext = createContext();

export function CategoriesProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await getCategories(); // fetch all categories
        setCategories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadCategories();
  }, []);

  return (
    <CategoriesContext.Provider value={{ categories, loading, error }}>
      {children}
    </CategoriesContext.Provider>
  );
}

// Custom hook to access categories easily
export function useCategories() {
  return useContext(CategoriesContext);
}
