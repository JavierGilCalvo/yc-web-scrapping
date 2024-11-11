// hooks/useScores.js
import { useState, useEffect } from "react";
import { getScores } from "@/api/api";

export const useScores = () => {
  const [scores, setScores] = useState([]);
  const [loadingScores, setLoading] = useState(true);
  const [errorScores, setError] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await getScores();
        setScores(response.data);
      } catch (err) {
        // @ts-expect-error cosas varias
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  return { scores, loadingScores, errorScores };
};
