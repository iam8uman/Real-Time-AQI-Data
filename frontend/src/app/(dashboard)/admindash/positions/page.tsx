"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { fetchAllPositionData } from "@/actions/fetchSensorData"
import useMeStore from "@/store/useMeStore"
import { Position, Range, Routes } from "@/types"
import axios from "axios"
import { ChevronLeft, Plus, Search } from "lucide-react"

import { CALIBRATE_URL } from "@/config/env"
import useDataFetcher from "@/hooks/useDataFetcher"
import useDebounce from "@/hooks/useDebounce"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import PaginationComponent from "@/components/Pagination"

import { columns } from "./columns"
import { DataTable } from "./data-table"

const PositionPage = () => {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const debouncedSearchTerm = useDebounce(searchTerm, 500) // Debounce search term
  const [appliedFilters, setAppliedFilters] = useState<Range[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(8)
  const [data, setData] = useState<any>(null) // state to store the fetched data
  const { meData } = useMeStore()

  // device data
  const [positionDataValue, setPositionDataValue] = useState<Position[]>([])
  const [positionTotal, setPositionTotal] = useState<number | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const { positionDataValue, positionTotal } = await fetchAllPositionData()
      setPositionDataValue(positionDataValue)
      setPositionTotal(positionTotal)
    }

    fetchData()
  }, [meData?.id])

  const handleSearchChange = (event: any) => {
    const searchTerm = event.target.value
    setSearchTerm(searchTerm)

    // Clear filters if search term is empty
    if (searchTerm === "") {
      setAppliedFilters([])
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
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
          <h1>Positions</h1>
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
        data={positionDataValue}
        refetchData={async () => {
          const { positionDataValue } = await fetchAllPositionData()
          setPositionDataValue(positionDataValue)
        }}
      />

      {/* Pagination Component */}
      <div className="mt-10 flex text-slate-300">
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
          totalPages={Math.ceil((data?.total ?? 0) / pageSize)}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  )
}

export default PositionPage
