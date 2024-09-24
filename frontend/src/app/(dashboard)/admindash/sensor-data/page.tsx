"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { fetchAllSensorData } from "@/actions/fetchSensorData"
import useMeStore from "@/store/useMeStore"
import { Position, Range, Routes, SensorData } from "@/types"
import { ChevronLeft, Plus, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

import { columns } from "./columns"
import { DataTable } from "./data-table"

const SensorDataPage = () => {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const { meData } = useMeStore()

  // device data
  const [sensorDataValue, setSensorDataValue] = useState<SensorData[]>([])
  const [sensorTotal, setSensorTotal] = useState<number | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const { sensorDataValue, sensorTotal } = await fetchAllSensorData()
      setSensorDataValue(sensorDataValue)
      setSensorTotal(sensorTotal)
    }

    fetchData()
  }, [meData?.id])

  const handleSearchChange = (event: any) => {
    const searchTerm = event.target.value
    setSearchTerm(searchTerm)
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
          <h1>Sensor Datas</h1>
        </div>

        <div className="flex flex-row gap-3">
          <div className="relative">
            <Input
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search Sensor Datas"
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
        data={sensorDataValue}
        refetchData={async () => {
          const { sensorDataValue } = await fetchAllSensorData()
          setSensorDataValue(sensorDataValue)
        }}
      />

      {/* Pagination Component */}
      {/* <div className="mt-10 flex text-slate-300">
        <Select
          onValueChange={(value: any) => {
            setPageSize(value)
          }}
        >
          <SelectTrigger className="ml-4 w-[80px] bg-slate-950 pr-2 text-slate-300 focus:ring-0">
            <SelectValue placeholder="Rows" />
          </SelectTrigger>
          <SelectContent className="bg-slate-950 text-slate-300 focus:ring-0">
            <SelectItem value="8">8</SelectItem>
            <SelectItem value="16">16</SelectItem>
            <SelectItem value="32">32</SelectItem>
          </SelectContent>
        </Select>
        <PaginationComponent
          currentPage={currentPage}
          totalPages={Math.ceil((sensorDataValue?.length ?? 0) / pageSize)}
          onPageChange={handlePageChange}
        />
      </div> */}
    </div>
  )
}

export default SensorDataPage
