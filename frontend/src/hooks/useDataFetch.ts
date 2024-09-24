import { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';

interface ApiResponse<T> {
  data: T;
}

const useDataFetching = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response: AxiosResponse<ApiResponse<T>> = await axios.get(url);
        setData(response.data.data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    // Cleanup function to cancel any pending fetch requests
    return () => {
      // Cleanup logic if needed
    };
  }, [url]);

  return { data, isLoading, error };
};

export default useDataFetching;