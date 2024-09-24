"use client"

import { Device } from "@/types"
import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Device>[] = [
  {
      accessorKey: "_id",
      header: "Device ID",
  },
  {
    accessorKey: "serialNo",
    header: "Serial No",
  },
  {
    accessorKey: "type",
    header: "Device Status",
  },
  {
    accessorKey: "owner",
    header: " Owner",
  },
]
