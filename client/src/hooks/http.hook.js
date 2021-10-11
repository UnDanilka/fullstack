import { useCallback, useState } from "react";

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const request = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setLoading(true);
      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
        });
        const data = response.json();

        if (!response.ok) {
          throw new Error(data.message || "something went wrong");
        }
        setLoading(false);
        return data;
      } catch (e) {}
    },
    []
  );

  return { loading, request, error };
};
