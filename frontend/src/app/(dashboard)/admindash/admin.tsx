"use client"

import { useEffect, useState } from "react"
import {
  fetchAllDeviceData,
  fetchAllSensorData,
  fetchUserDataById,
} from "@/actions/fetchSensorData"
import useMeStore from "@/store/useMeStore"
import { Device, SensorData, SensorDataType, User } from "@/types"
import axios from "axios"
import {
  AreaChart,
  ArrowRight,
  CircleUserRound,
  Cpu,
  TrendingUp,
  UserRoundCheck,
  UserRoundPlus,
} from "lucide-react"

import { API_URL, CALIBRATE_URL } from "@/config/env"
import useDataFetcher from "@/hooks/useDataFetcher"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import AQIindex from "@/components/AQIindex"
import { BarChartPage } from "@/components/BarChart"
import LineChartComponent from "@/components/LineChart"
import { PieChartPage } from "@/components/PieChart"

export default function Admin() {
  const { data, refetch } = useDataFetcher<User>({
    url: `${API_URL}/users?order[createdAt]=DESC`,
    filters: [],
    rangeFields: ["firstName", "email", "address"], // Pass rangeFields here
  })

  const { meData } = useMeStore()
  const user = data?.data
  // const user = useUserStore((state) => state.user)
  const total: number | undefined = user?.length
  const verified = user?.filter((user) => user.isVerified).length
  const thisMonthUsers = user?.filter((user) => {
    const userCreatedDate = user?.createdAt ? new Date(user.createdAt) : null
    const now = new Date()

    return (
      userCreatedDate?.getMonth() === now.getMonth() &&
      userCreatedDate?.getFullYear() === now.getFullYear()
    )
  })
  const userWithDevice = user?.filter((user) => user.deviceId).length

  const cardData = [
    {
      title: "Total Users Registered",
      value: total,
      icon: <CircleUserRound size={28} />,
    },
    {
      title: "Verified Users Registered",
      value: verified,
      icon: <UserRoundCheck size={28} />,
    },
    {
      title: "New Users This Month",
      value: thisMonthUsers?.length,
      icon: <UserRoundPlus size={28} />,
    },
    {
      title: "Users with device",
      value: userWithDevice,
      icon: <Cpu size={28} />,
    },
  ]

  // device data
  const [deviceDataValue, setDeviceDataValue] = useState<Device | null>(null)
  const [deviceTotal, setDeviceTotal] = useState<number | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const { deviceDataValue, deviceTotal } = await fetchAllDeviceData()
      setDeviceDataValue(deviceDataValue)
      setDeviceTotal(deviceTotal)
    }

    fetchData()
  }, [meData?.id])

  const deviceData = Array.isArray(deviceDataValue)
    ? deviceDataValue.map((device: any) => ({
        serialNo: device.serialNo,
        type: device.type,
        owner: device.owner,
      }))
    : []

  console.log(deviceData, "deviceDataValue")

  // sensor data
  const [sensorDataValue, setSensorDataValue] = useState<SensorData | null>(
    null
  )
  const [sensorTotal, setSensorTotal] = useState<number | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const { sensorDataValue, sensorTotal } = await fetchAllSensorData()
      setSensorDataValue(sensorDataValue)
      setSensorTotal(sensorTotal)
    }

    fetchData()
  }, [meData?.id])

  const sensorData = Array.isArray(sensorDataValue)
    ? sensorDataValue.map((sensor: any) => ({
        userId: sensor.userId,
        kei: sensor.kei,
        valueofKei: sensor.value,
        deviceSerialNo: sensor.device?.serialNo,
      }))
    : []

  return (
    <ScrollArea className="h-full bg-slate-300 text-gray-950">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-xl font-medium">
            Hi, Welcome back 👋 {meData?.firstName}
          </h2>
          <h1 className="m-6 flex flex-row items-center gap-4 rounded-sm p-3 font-medium tracking-tight sm:text-sm lg:text-xl">
            <span className="text-black">Total No of sensor data</span>
            <ArrowRight size={24} />
            <span className="text-indigo-600">
              {sensorTotal?.toLocaleString()}{" "}
            </span>
          </h1>
        </div>

        <section className="bg-gray-200 dark:bg-gray-900">
          <div className="mx-auto flex max-w-screen-xl flex-row justify-between px-4 py-8 lg:px-6 lg:py-16 ">
            <div className="mx-auto max-w-screen-sm text-center">
              <h1 className="text-primary-600 dark:text-primary-500 mb-4 flex flex-col items-center justify-center text-7xl font-extrabold tracking-tight lg:text-9xl">
                <AQIindex count={String(sensorData[0]?.valueofKei)} />
                <span
                  className={`text-center ${sensorData[0]?.valueofKei <= 60 ? "text-primary" : sensorData[0]?.valueofKei <= 120 ? "text-indigo-600" : "text-red-600"}`}
                >
                  {sensorData[0]?.kei ? String(sensorData[0]?.valueofKei) : 0}
                </span>{" "}
              </h1>
              <p className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
                PM 2.5 Data (KEI)
              </p>
              <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
                Based on real time AQI data. Stay updated!
              </p>
            </div>
            <div className="flex flex-col items-center justify-center font-extrabold tracking-tight">
              <PieChartPage sensorTotal={sensorTotal} />
              <p className="my-4 flex flex-row items-center gap-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
                Total Sensor Data <TrendingUp className="h-4 w-4" />
              </p>
              <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
                Showing total sensor data after installation.
              </p>
            </div>
          </div>
        </section>

        <div className="flex w-full items-center justify-center rounded-sm border border-gray-200 bg-gray-200 shadow-lg backdrop-blur-3xl dark:bg-gray-700">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 lg:py-20">
            <h2 className="flex gap-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl ">
              Dashboard Stats
              <AreaChart size={32} color="black" />
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-4">
              {cardData.map((card, index) => (
                <div className="overflow-hidden bg-white shadow dark:bg-gray-900 sm:rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <dl>
                      <dt className="truncate text-sm font-medium leading-5 text-gray-500 dark:text-gray-400">
                        {card.title}
                      </dt>
                      <dd className="mt-3 flex items-center gap-4 text-3xl font-semibold leading-9 text-indigo-600 dark:text-indigo-400">
                        {card.value} {card.icon}
                      </dd>
                    </dl>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex w-full items-center justify-center rounded-sm border border-gray-200 bg-gray-200 shadow-lg backdrop-blur-3xl dark:bg-gray-700">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 lg:py-20">
            <h2 className="flex items-center gap-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white  sm:text-4xl">
              Devices Stats <AreaChart size={32} color="black" />{" "}
              <span
                className="h-10 w-10 rounded-full border border-indigo-500 p-1.5 text-center text-xl text-indigo-500 hover:cursor-vertical-text"
                title="Total Devices"
              >
                {deviceTotal}
              </span>
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-4">
              {deviceData.map((card, index) => (
                <div className="overflow-hidden bg-white shadow dark:bg-gray-900 sm:rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <dl className="flex flex-col  gap-3">
                      <dt className="truncate text-sm font-medium leading-5 text-gray-500 dark:text-gray-400">
                        Serial NO: {card.serialNo}
                      </dt>
                      <dt className="truncate text-sm font-medium leading-5 text-gray-500 dark:text-gray-400">
                        Type :{" "}
                        <span className="rounded-full bg-green-100 p-1 uppercase text-primary">
                          {card.type}
                        </span>
                      </dt>
                      <dd className="mt-3 flex items-center gap-4 text-3xl font-semibold leading-9 text-indigo-600 dark:text-indigo-400">
                        {/* want to get the userName here  */}
                        <span className="rounded-full  text-xs uppercase text-muted-foreground ">
                          User ID :{" "}
                        </span>{" "}
                        <span>{card.owner}</span> <CircleUserRound size={24} />
                      </dd>
                    </dl>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Card className=" flex w-full items-center justify-center rounded-sm border border-gray-200 bg-gray-200 shadow-lg backdrop-blur-3xl dark:bg-gray-700 md:col-span-3">
          <LineChartComponent sensorData={sensorData} />
        </Card>

        <Card className=" flex w-full items-center justify-center rounded-sm border border-gray-200 bg-gray-200 shadow-lg backdrop-blur-3xl dark:bg-gray-700 md:col-span-3">
          <BarChartPage sensorData={sensorData} />
        </Card>
      </div>

      <div className="flex h-60 items-center justify-center">
        <div className="flex items-start gap-2.5">
          <img
            className="h-8 w-8 rounded-full"
            src="https://github.com/iam8uman.png"
            alt="Jese image"
          />
          <div className="flex w-full  flex-col gap-1">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                Suman Sharma (Admin)
              </span>
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                11:11
              </span>
            </div>
            <div className="leading-1.5 flex flex-col rounded-e-xl rounded-es-xl border-gray-200 bg-gray-100 p-4 dark:bg-gray-700">
              <p className="text-sm font-normal text-gray-900 dark:text-white">
                {" "}
                That's awesome. I think this time you have reached to the end of
                the page.{" "}
              </p>
            </div>
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              Delivered
            </span>
          </div>
        </div>
      </div>
    </ScrollArea>
  )
}
