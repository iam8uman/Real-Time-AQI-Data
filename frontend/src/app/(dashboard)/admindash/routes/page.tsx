"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { fetchAllRouteData } from "@/actions/fetchSensorData"
import useMeStore from "@/store/useMeStore"
import { Range, Routes } from "@/types"
import { ChevronLeft, Plus, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"


import { columns } from "./columns"
import { DataTable } from "./data-table"

const RoutePagee = () => {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [appliedFilters, setAppliedFilters] = useState<Range[]>([])
  const { meData } = useMeStore()

  // device data
  const [routeData, setRouteData] = useState<Routes[]>([])
  const [routeTotal, setRouteTotal] = useState<number | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const { routeDataValue, routeTotal } = await fetchAllRouteData()
      setRouteData(routeDataValue)
      setRouteTotal(routeTotal)
    }

    fetchData()
  }, [meData?.id])

  console.log(routeData)

  const handleSearchChange = (event: any) => {
    const searchTerm = event.target.value
    setSearchTerm(searchTerm)

    // Clear filters if search term is empty
    if (searchTerm === "") {
      setAppliedFilters([])
    }
  }

  return (
    <div className="bg-slate-950 text-slate-300">
      <div className="flex justify-between">
        <div className="flex flex-row items-center gap-2 text-3xl font-extrabold text-primary ">
          <ChevronLeft
            size={28}
            strokeWidth={3}
            onClick={() => router.back()}
            className="cursor-pointer text-primary transition-transform duration-300 ease-in-out hover:scale-110 hover:text-green-400"
          />
          <h1>Routes</h1>
        </div>

        <div className="flex flex-row gap-3">
          <div className="relative">
            <Input
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search Routes"
              className="h-12 w-96 border border-slate-300 pr-10"
            />
            <Search
              width={15}
              height={20}
              className="absolute right-3 top-1/2 -translate-y-1/2 transform text-slate-300"
            />
          </div>
        </div>
      </div>
      <Separator className="my-2 bg-slate-900" />

      {/* table start from here  */}
      <DataTable
        columns={columns}
        data={routeData}
        refetchData={async () => {
          const { routeDataValue } = await fetchAllRouteData()
          setRouteData(routeDataValue)
        }}
      />
    </div>
  )
}

export default RoutePagee
