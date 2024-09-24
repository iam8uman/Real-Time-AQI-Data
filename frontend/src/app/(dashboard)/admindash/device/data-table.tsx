"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Pencil2Icon } from "@radix-ui/react-icons"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { CALIBRATE_URL } from "@/config/env"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import AllocateDevice from "@/components/create/device/AllocateDevice"
import DeviceCreate from "@/components/create/device/DeviceCreate"
import DeleteButton from "@/components/DeleteButton"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  //   applyFilter: (filter: Range) => void;
  //   clearFilter: () => void;
  refetchData: () => void
}

export function DataTable<TData, TValue>({
  columns,
  data,
  refetchData,
}: DataTableProps<TData, TValue>) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="rounded-ee-3xl rounded-es-3xl border border-slate-700 bg-slate-950 text-slate-300">
      <Table>
        <TableHeader className="h-20">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="bg-slate-800 hover:bg-slate-800"
            >
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder ? null : (
                    <div className="flex flex-row items-center gap-3 font-extrabold text-slate-300">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </div>
                  )}
                </TableHead>
              ))}
              <TableHead className="ml-6 flex items-center justify-end pr-10 pt-12 font-extrabold text-slate-300">
                Actions
              </TableHead>
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="hover:bg-transparent"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {cell.column.id === "_id" ? (
                      <div className="flex items-center gap-4 ">
                        <Link
                          href={`/admindash/routes/${
                            (row?.original as { _id: string })?._id
                          }`}
                          className=" flex items-center gap-4 pl-2 text-sm font-extrabold  hover:text-blue-500 hover:no-underline"
                        >
                          {(row?.original as { _id: string })?._id}
                        </Link>
                      </div>
                    ) : cell.column.id === "createdAt" ? (
                      new Date(
                        (row?.original as { createdAt: string })?.createdAt
                      ).toLocaleDateString()
                    ) : (
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    )}
                  </TableCell>
                ))}

                <TableCell className="flex h-full items-center justify-end gap-2 text-muted-foreground ">
                  <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    {" "}
                    <DialogTrigger asChild>
                      <Button
                        className="flex h-12 flex-row gap-2 text-slate-950"
                        variant="link"
                        onClick={() => setIsOpen(true)}
                      >
                        <Pencil2Icon className="h-5 w-5 scale-110 text-primary" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-slate-950 text-slate-300">
                      <AllocateDevice
                        id={(row?.original as { _id: string })?._id}
                        owner={(row?.original as { owner: number })?.owner}
                        setIsOpen={setIsOpen}
                      />
                    </DialogContent>
                  </Dialog>

                  <DeleteButton
                    id={(row?.original as { _id: string })?._id}
                    entity="devices"
                    onDeleteSuccess={() => {
                      {
                        refetchData
                      }
                    }}
                    queryKey={["devices"]}
                    url={CALIBRATE_URL}
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 rounded-es-3xl bg-slate-950 text-center hover:bg-slate-950"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
