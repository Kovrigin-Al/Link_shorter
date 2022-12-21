//Custom hook

import { useCallback, useState } from "react";

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setLoading(true);
      try {
        if (body) {
            body = JSON.stringify(body);
            headers['Content-Type'] = 'application/json';
        }
        const response = await fetch(url, {
          method,
          body,
          headers,
        });
        setLoading(false)
        const jsonResponse = await response.json();
        if (!response.ok) {
            throw new Error(jsonResponse.message || 'Unknown error')
        }

        return jsonResponse;
      } catch (error) {
        setLoading(false)
        setError(error.message)
        throw error
      }
    },
    []
  );

  const cleanError = useCallback(() => setError(null), []);

  return { loading, request, error, cleanError };
};
