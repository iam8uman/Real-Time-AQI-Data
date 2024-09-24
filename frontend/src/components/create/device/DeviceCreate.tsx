"use client"

import React, { useEffect, useState } from "react"
import { redirect, useRouter } from "next/navigation"
import { LocalStore } from "@/store/localStore"
import useMeStore from "@/store/useMeStore"
import { OSMData } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { IconAddressBook } from "@tabler/icons-react"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { MapPin, Search } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { CALIBRATE_URL } from "@/config/env"
import { cn } from "@/lib/utils"
import useDataFetcher from "@/hooks/useDataFetcher"
import useDebounce from "@/hooks/useDebounce"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { inputLead, labelLead } from "../../auth-form/ForgotPs"
import {
  deviceCreateSchema,
  DeviceCreateType,
} from "../validators/DeviceCreateValidator"

type Props = {
  setIsOpen: (isOpen: boolean) => void
}

const DeviceCreate = ({ setIsOpen }: Props) => {
  // const { userData } = useAuth();
  const { meData: userData } = useMeStore()

  const createTaskMutation = useMutation({
    mutationFn: async (data: DeviceCreateType) => {
      data.positionDto.lati = Number(data.positionDto.lati)
      data.positionDto.lngi = Number(data.positionDto.lngi)
      setIsOpen(true)
      const response = await axios.post(
        `${CALIBRATE_URL}/devices`,
        {
          ...data,
        }
      )

      if (response.status === 201) {
        return response.data
      } else {
        throw new Error("An error occurred while creating the Device.")
      }
    },
    onError: (err: any) => {
      toast.error("Error ❌", {
        description:
          err.response?.data?.message ||
          "An error occurred while creating the device.",
      })
    },
    onSuccess: (data) => {
      toast.success("Success ✅", {
        description: "Device created successfully.",
      })
      setIsOpen(false)
    },
  })

  const handleSubmit = (data: DeviceCreateType) => {
    createTaskMutation.mutate(data)
  }

  useEffect(() => {
    // Check user roles if needed
  }, [userData])

  const deviceCreateForm = useForm<DeviceCreateType>({
    resolver: zodResolver(deviceCreateSchema),
    defaultValues: {
      serialNo: "",
      type: "STATIONERY",
      positionDto: {
        lati: 0,
        lngi: 0,
      },
    },
  })

  // search for location
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
    rangeFields: ["firstName", "email", "address"],
  })
  useEffect(() => {
    refetch()
  }, [debouncedSearchTerm])

  const handleSearchChange = (event: any) => {
    const searchTerm = event.target.value
    setSearchTerm(searchTerm)
  }

  const handleItemClick = (item: any) => {
    setLatitude(parseFloat(item.lat))
    setLongitude(parseFloat(item.lon))
    debouncedSearchTerm && setSearchTerm("")
  }

  return (
    <div>
      <div>
        <div className="sm:max-w-[600px]">
          <div>
            <div className="text-center text-xl font-bold">
              Create a New Device!
            </div>
            {/* <div>Click save when you&apos;re done.</div> */}
          </div>
          <div className="grid gap-4 py-4">
            <Form {...deviceCreateForm}>
              <form
                onSubmit={deviceCreateForm.handleSubmit(handleSubmit)}
                className="mt-4 space-y-4"
              >
                <FormField
                  control={deviceCreateForm.control}
                  name="serialNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <FormLabel htmlFor="serialNo" className={labelLead}>
                            Device Serial No
                          </FormLabel>
                          <Input
                            placeholder=""
                            style={{
                              WebkitBoxShadow: "0 0 0px 1000px #111827 inset",
                              WebkitTextFillColor: "#D1D5DB",
                            }}
                            className="peer block h-14 w-full appearance-none rounded-t-lg border-2  border-green-500 bg-slate-950 px-2.5 pb-2.5 pt-5 text-sm text-gray-300 focus:border-green-600 focus:outline-none focus:ring-0  dark:text-white"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={deviceCreateForm.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <FormLabel htmlFor="type" className={labelLead}>
                            Device Type
                          </FormLabel>
                          <Select
                            onValueChange={(value) => field.onChange(value)}
                            value={field.value}
                          >
                            <SelectTrigger className=" h-14 w-full appearance-none rounded-t-lg border-2  border-green-500 bg-slate-950 px-2.5 pb-2.5 pt-5 text-sm text-gray-300 focus:border-green-600 focus:outline-none focus:ring-0 dark:border-green-600 dark:text-white dark:focus:border-green-500">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-950 text-slate-300 ">
                              <SelectItem value="STATIONERY">
                                STATIONERY
                              </SelectItem>
                              <SelectItem value="MOBILE">MOBILE</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="relative">
                  <Input
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search Location..."
                    className="h-14 w-full border border-green-500 pr-10 text-white"
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
                    data?.map((item) => (
                      <div
                        className="cursor-pointer text-white"
                        key={item.place_id}
                        onClick={() => handleItemClick(item)}
                      >
                        <div className="flex flex-row items-center gap-2 text-xs text-white hover:text-green-500">
                          <MapPin size={16} />
                          {item.display_name}
                        </div>
                      </div>
                    ))}
                </div>

                <div className="flex w-full flex-row justify-between gap-2">
                  <FormField
                    control={deviceCreateForm.control} // Assuming deviceCreateForm is defined
                    name="positionDto.lati"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <div className="relative w-full">
                            <FormLabel
                              htmlFor="latitude"
                              className="text-white"
                            >
                              Latitude
                            </FormLabel>
                            <Input
                              placeholder=""
                              type="number"
                              className="peer block h-14 w-full appearance-none rounded-t-lg border-2  border-green-500 bg-slate-950 px-2.5 pb-2.5 pt-5 text-sm text-gray-300 focus:border-green-600 focus:outline-none focus:ring-0  dark:text-white"
                              style={{
                                WebkitBoxShadow: "0 0 0px 1000px #111827 inset",
                                WebkitTextFillColor: "#D1D5DB",
                              }}
                              {...field}
                              value={latitude}
                              readOnly
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={deviceCreateForm.control} // Assuming deviceCreateForm is defined
                    name="positionDto.lngi"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <div className="relative w-full">
                            <FormLabel
                              htmlFor="longitude"
                              className="text-white"
                            >
                              Longitude
                            </FormLabel>
                            <Input
                              placeholder=""
                              type="number"
                              className="peer block h-14 w-full appearance-none rounded-t-lg border-2  border-green-500 bg-slate-950 px-2.5 pb-2.5 pt-5 text-sm text-gray-300 focus:border-green-600 focus:outline-none focus:ring-0  dark:text-white"
                              style={{
                                WebkitBoxShadow: "0 0 0px 1000px #111827 inset",
                                WebkitTextFillColor: "#D1D5DB",
                              }}
                              {...field}
                              value={longitude}
                              readOnly
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <Button
                    type="submit"
                    variant="default"
                    disabled={createTaskMutation.isPending}
                    className={cn(
                      createTaskMutation.isPending
                        ? `inline-flex w-full items-center justify-center rounded-md border border-transparent bg-primary px-6 py-6 text-sm font-semibold leading-5 text-gray-500 transition-all duration-200`
                        : `inline-flex w-full items-center justify-center rounded-md border border-transparent bg-primary px-6 py-6 text-sm font-semibold leading-5 text-white transition-all duration-200`
                    )}
                  >
                    Create a Device
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeviceCreate
