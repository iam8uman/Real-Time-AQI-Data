"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { fetchSensorData } from "@/actions/fetchSensorData"
import useMeStore from "@/store/useMeStore"
import { SensorData } from "@/types"
import { AreaChart, ArrowRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import AQIindex from "@/components/AQIindex"
import LineChartComponent from "@/components/LineChart"

export default function User() {
  const { meData } = useMeStore()
  const [sensorDataValue, setSensorDataValue] = useState<SensorData | null>(
    null
  )
  const [sensorTotal, setSensorTotal] = useState<number | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      if (!meData?.id) return
      const { sensorDataValue, sensorTotal } = await fetchSensorData(
        undefined,
        [`userId=eq_${meData?.id}`]
      )
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
        device: sensor.device,
      }))
    : []

  console.log(sensorDataValue)
  const firstDeviceData = sensorData[0]?.device
  console.log(firstDeviceData)

  return (
    <div>
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-xl font-medium">
            Hi, Welcome back 👋 {meData?.firstName}
          </h2>
        </div>

        <section className="bg-gray-200 dark:bg-gray-900">
          <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
            <div className="mx-auto max-w-screen-sm text-center">
              <h1 className="text-primary-600 dark:text-primary-500 mb-4 flex flex-col items-center justify-center text-7xl font-extrabold tracking-tight lg:text-9xl">
                <AQIindex count={String(sensorData[0]?.valueofKei)} />
                <span
                  className={`text-center ${sensorData[0]?.valueofKei <= 60 ? "text-primary" : sensorData[0]?.valueofKei <= 120 ? "text-indigo-600" : "text-red-600"}`}
                >
                  {String(sensorData[0]?.valueofKei)}
                </span>{" "}
              </h1>
              <p className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
                PM 2.5 Data (KEI)
              </p>
              <p className="mb-4 text-lg font-light text-gray-500 ">
                Based on real time AQI data. Stay updated!
              </p>
            </div>
          </div>
        </section>

        <div className="flex w-full items-center justify-center rounded-sm border border-gray-200 bg-gray-200 shadow-lg backdrop-blur-3xl dark:bg-gray-700">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 lg:py-20">
            <h2 className="flex items-center gap-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white  sm:text-4xl">
              Devices Stats <AreaChart size={32} color="black" />
              <span
                className="h-10 w-10 rounded-full border border-indigo-500 p-1.5 text-center text-xl text-indigo-500 hover:cursor-vertical-text"
                title="Calibrate Value"
              >
                {firstDeviceData?.calibrateValue}
              </span>
            </h2>
            <section className="bg-gray-200 dark:bg-gray-900">
              <div className="mx-auto grid max-w-screen-xl px-4 py-8 lg:grid-cols-12 lg:gap-8 lg:py-16 xl:gap-0">
                <div className="mr-auto place-self-center lg:col-span-7">
                  <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                    Allocated Device Status Overview
                  </h2>
                  <ul className="max-w-md list-inside space-y-1 text-gray-500 ">
                    <li className="flex items-center">
                      <svg
                        className="me-2 h-3.5 w-3.5 flex-shrink-0 text-green-500 dark:text-green-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                      </svg>
                      Device Type :{" "}
                      <span className="mx-12 rounded-full border border-gray-300 bg-green-100 p-1 px-8  text-xs text-green-500">
                        {firstDeviceData?.type}
                      </span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="me-2 h-3.5 w-3.5 flex-shrink-0 text-green-500 dark:text-green-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                      </svg>
                      Device Serial No :{" "}
                      <span className="mx-4 rounded-full border border-gray-300 bg-rose-100 p-1 px-6  text-xs text-red-500">
                        {firstDeviceData?.serialNo}
                      </span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="me-2 h-3.5 w-3.5 flex-shrink-0 text-green-500 "
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                      </svg>
                      Calibrate Value :{" "}
                      <span className="mx-7 rounded-full border border-gray-300 bg-blue-100 p-1 px-6  text-xs text-indigo-500">
                        Fluctuation {firstDeviceData?.calibrateValue}
                      </span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="me-2 h-3.5 w-3.5 flex-shrink-0 text-green-500 "
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                      </svg>
                      Device Status :{" "}
                      <span className="mx-10 rounded-full border border-gray-300 bg-green-100 p-1 px-11  text-xs text-green-500">
                        {firstDeviceData?.owner ? "ACTIVE" : "FREE"}
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="hidden lg:col-span-5 lg:mt-0 lg:flex">
                  <Image
                    className="rounded-lg mix-blend-multiply"
                    width={500}
                    height={500}
                    src="/device.jpg.webp"
                    alt="mockup"
                  />
                </div>
              </div>
            </section>
          </div>
        </div>

        <Card className=" flex w-full items-center justify-center rounded-sm border border-gray-200 bg-gray-200 shadow-lg backdrop-blur-3xl dark:bg-gray-700 md:col-span-3">
          <LineChartComponent sensorData={sensorData} />
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
              <span className="text-sm font-normal text-gray-500 ">11:11</span>
            </div>
            <div className="leading-1.5 flex flex-col rounded-e-xl rounded-es-xl border-gray-200 bg-gray-100 p-4 dark:bg-gray-700">
              <p className="text-sm font-normal text-gray-900 dark:text-white">
                {" "}
                That's awesome. I think this time you have reached to the end of
                the page.{" "}
              </p>
            </div>
            <span className="text-sm font-normal text-gray-500 ">
              Delivered
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
