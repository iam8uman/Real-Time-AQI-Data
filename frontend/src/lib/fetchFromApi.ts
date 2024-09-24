import axios, { AxiosResponse } from "axios";
import { LocalStore } from "@/store/localStore";
import { ApiData, FetchParams, Range, WhereFilter } from "@/types"; // Import the WhereFilter interface

const getAccessToken = LocalStore.getAccessToken(); // Adjust this accordingly

export const fetchFromApi = async <T>({
  url,
  filters,
  page,
  pageSize,
  rangeFields,
  whereFilters, // Add whereFilters to the function parameters
  type,
  who,
  where: singleWhere,
}: FetchParams & {
  rangeFields: string[];
  whereFilters: WhereFilter[];
}): Promise<ApiData<T> | Blob> => {
  // Update the return type to include Blob
  if (type === "export") {
    if (who === "users") {
      url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/export/csv`;
    } else {
      url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/export/csv`;
    }
  }
  const rangeFilters = filters
    .filter((f) => rangeFields.includes(f.property))
    .map(
      (f) =>
        `{"property":"${f.property}","lower":"${f.lower}","upper":"${f.upper}"}`
    )
    .join(",");

  const where = whereFilters.reduce((acc: { [key: string]: any }, f) => {
    if (f.property && f.operator && f.value !== undefined) {
      acc[`where[${f.property}][_operator]`] = f.operator;
      acc[`where[${f.property}][_value]`] = f.value.toString();
    }
    return acc;
  }, {});
  try {
    const response: AxiosResponse<ApiData<T> | Blob> = await axios.get(url, {
      headers: { Authorization: `Bearer ${getAccessToken}` },
      params: {
        ...where,
        ...singleWhere,
        range: `[${rangeFilters}]`,
        ...(page && pageSize ? { skip: (page - 1) * pageSize } : {}),
        take: pageSize,
      },
      responseType: type === "export" ? "blob" : "json", // Set responseType to 'blob' when type is 'export'
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
