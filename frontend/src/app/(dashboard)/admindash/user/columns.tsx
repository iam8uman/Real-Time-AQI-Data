"use client"

import { ColumnDef } from "@tanstack/react-table"
import { User } from "@/types"

export const columns: ColumnDef<User>[] = [

  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
]
