"use client"

import { Position, SensorData } from "@/types"
import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<SensorData>[] = [
  {
    accessorKey: "kei",
    header: "KEI",
  },
  {
    accessorKey: "value",
    header: "Value",
  },
  {
    accessorKey: "timestamp",
    header: " Timestamp",
  },
]
