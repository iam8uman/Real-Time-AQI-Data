import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"

const useApi = <T>(url: string) => {
  const { data, error, isLoading } = useQuery<T, Error>({
    queryKey: [url],
    queryFn: async () => {
      const response = await axios.get<T>(url)
      return response.data
    },
  })

  const create = useMutation<T, Error, T>({
    mutationFn: async (newData: T) => {
      const response = await axios.post<T>(url, newData)
      return response.data
    },
  })

  const update = useMutation<T, Error, T>({
    mutationFn: async (updatedData: T) => {
      const response = await axios.put<T>(url, updatedData)
      return response.data
    },
  })

  const remove = useMutation<void, Error, void>({
    mutationFn: async () => {
      const response = await axios.delete(url)
      if (!response.status.toString().startsWith("2")) {
        throw new Error("Failed to delete data")
      }
    },
  })

  return {
    data,
    error,
    isLoading,
    create: create.mutate,
    update: update.mutate,
    remove: remove.mutate,
  }
}

export default useApi
