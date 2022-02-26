import { useEffect, useState } from "react";

export function useLoader(loadingFunc) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [data, setData] = useState();
  useEffect(async () => {
    setLoading(true);
    try {
      setData(await loadingFunc());
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
    setLoading(false);
  }, []);

  return { loading, error, data };
}
