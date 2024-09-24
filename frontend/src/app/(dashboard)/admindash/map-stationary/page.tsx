"use client"

import React, { useState } from "react"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"
import { ChevronLeft, Eye } from "lucide-react"

import { Button } from "@/components/ui/button"
import HeatMapAdmin from "@/components/adminMap/OSMap"
import OSMap2 from "@/components/adminMap/OSMap2Stationary"

// const OSMap = dynamic(() => import("@/components/adminMap/OSMap"), {
//   ssr: false,
// })

const page = () => {
  const router = useRouter()
  const [showMap, setShowMap] = useState(true)

  const toggleMap = () => setShowMap(!showMap)
  return (
    <div className="overflow-hidden text-slate-300">
      <div className="flex flex-row items-center justify-between">
        <div className="my-6 flex flex-row items-center gap-2 text-3xl font-extrabold text-primary">
          <ChevronLeft
            size={28}
            strokeWidth={3}
            onClick={() => router.back()}
            className="cursor-pointer text-primary transition-transform duration-300 ease-in-out hover:scale-110 hover:text-green-400"
          />
          <h1>Sensor Data</h1>
        </div>
        <div className="heatmapButton">
          <Button
            className="rounded-se-full border border-primary bg-black p-2 px-6"
            onClick={toggleMap}
          >
            {showMap ? "Show Heatmap" : "Show Position Map"}
          </Button>
        </div>
      </div>
      {!showMap ? <HeatMapAdmin /> : <OSMap2 />}
    </div>
  )
}

export default page
