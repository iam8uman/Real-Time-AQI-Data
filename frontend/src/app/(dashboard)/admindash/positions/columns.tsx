"use client"

import { Position } from "@/types"
import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Position>[] = [
  {
    accessorKey: "lati",
    header: "Latitude",
  },
  {
    accessorKey: "lngi",
    header: "Longitude",
  },
  {
    accessorKey: "alti",
    header: " Altitude",
  },
  {
    accessorKey: "route",
    header: "Route",
  },
  // {
  //   accessorKey: "sensorData",
  //   header: "Sensor Data",
  // },
]
