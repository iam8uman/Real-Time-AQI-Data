"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { fetchAllDeviceData } from "@/actions/fetchSensorData"
import useMeStore from "@/store/useMeStore"
import { Device, Position, Range, Routes, SensorData } from "@/types"
import { ChevronLeft, Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import DeviceCreate from "@/components/create/device/DeviceCreate"

import { columns } from "./columns"
import { DataTable } from "./data-table"

const DevicePage = () => {
  const router = useRouter()
  const [isOpen, setIsOpen] = React.useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [appliedFilters, setAppliedFilters] = useState<Range[]>([])
  const { meData } = useMeStore()

  // device data
  const [deviceDataValue, setDeviceDataValue] = useState<Device[]>([])
  const [deviceTotal, setDeviceTotal] = useState<number | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const { deviceDataValue, deviceTotal } = await fetchAllDeviceData()
      setDeviceDataValue(deviceDataValue)
      setDeviceTotal(deviceTotal)
    }

    fetchData()
  }, [meData?.id])

  console.log(deviceDataValue)

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
          <h1>Device Status</h1>
        </div>

        <div className="flex flex-row gap-3">
          <div className="relative">
            <Input
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search Device & Status"
              className="h-12 w-96 border border-slate-300 pr-10"
            />
            <Search
              width={15}
              height={20}
              className="absolute right-3 top-1/2 -translate-y-1/2 transform text-slate-300"
            />
          </div>

          <div className="flex gap-2 bg-green-500 text-primary">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              {" "}
              <DialogTrigger asChild>
                <Button
                  className="flex h-12 flex-row gap-2 bg-primary text-slate-950"
                  variant="link"
                  onClick={() => setIsOpen(true)}
                >
                  <Plus width={20} />
                  Create new device
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-950 text-slate-300">
                <DeviceCreate setIsOpen={setIsOpen} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
      <Separator className="my-2 bg-slate-900" />

      <DataTable
        columns={columns}
        data={deviceDataValue}
        refetchData={async () => {
          const { deviceDataValue } = await fetchAllDeviceData()
          setDeviceDataValue(deviceDataValue)
        }}
      />
      
    </div>
  )
}

export default DevicePage
