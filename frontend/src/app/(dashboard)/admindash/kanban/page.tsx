// import BreadCrumb from "@/components/breadcrumb";
// import { KanbanBoard } from "@/components/kanban/kanban-board";
// import NewTaskDialog from "@/components/kanban/new-task-dialog";
// import { Heading } from "@/components/ui/heading";

// const breadcrumbItems = [{ title: "Kanban", link: "/admindash/kanban" }];
// export default function page() {
//   return (
//     <>
//       <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
//         <BreadCrumb items={breadcrumbItems} />
//         <div className="flex items-start justify-between">
//           <Heading title={`Kanban`} description="Manage tasks by dnd" />
//           <NewTaskDialog />
//         </div>
//         <KanbanBoard />
//       </div>
//     </>
//   );
// }


"use client"
import React, { useEffect, useMemo, useState } from "react"
import { OSMData } from "@/types"
import { useQuery } from "@tanstack/react-query"
import debounce from "lodash.debounce"
import { Search } from "lucide-react"

import { OSM_API_KEY } from "@/config/env"
import useDataFetcher from "@/hooks/useDataFetcher"
import useDebounce from "@/hooks/useDebounce"
import { Input } from "@/components/ui/input"

const Page = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)
  const debouncedSearchTerm = useDebounce(searchTerm, 500) // Debounce search term

  const filters: Range[] = [] // Define your filters here if needed
  const { data, refetch, isLoading, isError } = useDataFetcher<OSMData>({
    url: `https://nominatim.openstreetmap.org/search?q=${debouncedSearchTerm}&format=json&polygon=1&addressdetails=1`,
    // filters: appliedFilters,
    filters: debouncedSearchTerm
      ? [
          {
            property: debouncedSearchTerm.includes("@") ? "email" : "firstName",
            lower: debouncedSearchTerm,
            upper: debouncedSearchTerm + "z",
          },
        ]
      : [],
    rangeFields: ["firstName", "email", "address"], // Pass rangeFields here
  })

  useEffect(() => {
    refetch() // Refetch data when debounced search term changes
    // setLatitude(data?.data.lat)
    // setLongitude(data?.data.lon)
  }, [debouncedSearchTerm])

  const handleSearchChange = (event: any) => {
    const searchTerm = event.target.value
    setSearchTerm(searchTerm)
  }

  return (
    <div className="text-white">
      <div className="relative">
        <Input
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search Users..."
          className="h-12 w-96 border border-slate-300 pr-10 text-white"
        />
        <Search
          width={15}
          height={20}
          className="absolute right-3 top-1/2 -translate-y-1/2 transform text-slate-300"
        />
      </div>
      <div className="flex flex-col gap-4">
        {isLoading && <div>Loading...</div>}
        {isError && <div>Error fetching data</div>}
        {data && data?.total === 0 && <div>No results found</div>}
        {data &&
          data?.map((item:any) => (
            <div className="text-white" onClick={()=>{setLatitude(item?.lat), setLongitude(item?.lon)}}>
            <div key={item.place_id} className="text-white text-xl">Name: {item?.display_name}</div>
            <div key={item.place_id}>Longitude{item?.lon}</div>
            <div key={item.place_id}>Latitude {item?.lat}</div>
            </div>
          ))}
          {latitude && longitude && <div>Latitude: {latitude}, Longitude: {longitude}</div>}
      </div>
    </div>
  )
}

export default Page
