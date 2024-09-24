import { Hourglass, ScanFace } from "lucide-react"
import React from "react"

export default function Feature() {
  return (
    <>
      <div className="py-12 md:py-20 lg:py-24 bg-gray-950">
        <div className="flex items-center justify-center gap-4 py-2 ">
          <h2 className="aaa text-center mb-20 text-3xl font-bold leading-tight text-primary sm:text-4xl lg:text-5xl ">
            Features
          </h2>
        </div>
        <div className="mx-auto max-w-7xl px-2 lg:px-8">
          <div className="grid grid-cols-1 gap-y-8 text-center sm:grid-cols-2 sm:gap-12 lg:grid-cols-4">
            <div>
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
              <Hourglass className="h-9 w-9 text-blue-600" />
              </div>
              <h3 className="mt-8 text-lg font-semibold text-gray-300">
                Real Time Data
              </h3>
              <p className="mt-4 text-sm text-gray-400">
                Vayu is a real-time data visualization tool that allows you to get data in real-time.
              </p>
            </div>
            <div>
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-100">
                <svg
                  className="h-9 w-9 text-orange-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="mt-8 text-lg font-semibold text-gray-300">
                Fast & Easy to Load
              </h3>
              <p className="mt-4 text-sm text-gray-400">
                Vayu is a fast and easy to load data visualization tool that allows you to get data in real-time.
              </p>
            </div>
            <div>
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <ScanFace className="h-9 w-9 text-green-600" />
              </div>
              <h3 className="mt-8 text-lg font-semibold text-gray-300">
                Data Visualization
              </h3>
              <p className="mt-4 text-sm text-gray-400">
                Vayu is a data visualization tool that allows you to get data in real-time.
              </p>
            </div>
            <div>
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
                <svg
                  className="h-9 w-9 text-red-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
              </div>
              <h3 className="mt-8 text-lg font-semibold text-gray-300">
                Real Time AQI Data
              </h3>
              <p className="mt-4 text-sm text-gray-400">
                Vayu is a real-time data visualization tool that allows you to get data in real-time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
