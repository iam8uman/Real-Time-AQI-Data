import { useQuery, UseQueryOptions, QueryKey } from "@tanstack/react-query";
import { ApiData, QueryParams, WhereFilter } from "@/types";
import { fetchFromApi } from "@/lib/fetchFromApi";

function useDataFetcher<T>(
  params: QueryParams,
  options?: UseQueryOptions<ApiData<T>, Error>
) {
  const queryKey: QueryKey = [
    params.url,
    params.page,
    JSON.stringify(params.filters),
    JSON.stringify(params.whereFilters),
  ]; // Include whereFilters in the query key
  const fetchFn = async () => {
    try {
      return await (fetchFromApi<T>({
        ...params,
        whereFilters: params.whereFilters || [],
        where: params.where
      }) as Promise<ApiData<T>>); // Add type assertion here
    } catch (error) {
      throw new Error("Failed to fetch data");
    }
  };

  return useQuery<ApiData<T>, Error>({
    queryKey,
    queryFn: fetchFn,
    ...options,
  });
}

export default useDataFetcher;