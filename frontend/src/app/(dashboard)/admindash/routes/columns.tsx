"use client"

import { Routes } from "@/types"
import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Routes>[] = [
  {
    accessorKey: "start",
    header: "Start",
  },
  {
    accessorKey: "finish",
    header: "Finish",
  },
  {
    accessorKey: "complete",
    header: " Completed",
  },
  {
    accessorKey: "owner",
    header: " Owner",
  },
]
