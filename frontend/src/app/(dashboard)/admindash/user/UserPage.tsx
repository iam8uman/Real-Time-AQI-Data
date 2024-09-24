"use client"

import React, { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { useUserStore } from "@/store/CounterStore"
import { LocalStore } from "@/store/localStore"
import { Customer, Range, User, } from "@/types"
import axios from "axios"
import { saveAs } from "file-saver"
import {
  ChevronLeft,
  ExternalLink,
  Import,
  Plus,
  PlusIcon,
  Search,
  X,
} from "lucide-react"
import { toast } from "sonner"

import { fetchFromApi } from "@/lib/fetchFromApi"
import useDataFetcher from "@/hooks/useDataFetcher"
import useDebounce from "@/hooks/useDebounce"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import PaginationComponent from "@/components/Pagination"
import UserCreatePage from "@/components/users/UserCreatePage"
import { columns } from "./columns"
import { DataTable } from "./data-table"

const UserPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const debouncedSearchTerm = useDebounce(searchTerm, 500) // Debounce search term
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(8)
  const [appliedFilters, setAppliedFilters] = useState<Range[]>([])
  const [isOpen, setIsOpen] = React.useState(false)
  const router = useRouter()
  const fileInputRef = useRef(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [selectedBucket, setSelectedBucket] = useState<string | null>(null)

  const filters: Range[] = [] // Define your filters here if needed
  const { data, refetch } = useDataFetcher<User>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/users?order[createdAt]=DESC`,
    // filters: appliedFilters,
    filters: debouncedSearchTerm
      ? [
          {
            property: debouncedSearchTerm.includes("@") ? "email" : "firstName",
            lower: debouncedSearchTerm,
            upper: debouncedSearchTerm + "z",
          },
        ]
      : [],
    page: currentPage,
    pageSize,
    rangeFields: ["firstName", "email", "address"], // Pass rangeFields here
  })

  const setUser = useUserStore((state) => state.setUser)

  useEffect(() => {
    if (data) {
      setUser(data.data)
    }
  }, [data, setUser])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  useEffect(() => {
    refetch() // Refetch data when debounced search term changes
  }, [debouncedSearchTerm, currentPage, pageSize])

  const handleSearchChange = (event: any) => {
    const searchTerm = event.target.value
    setSearchTerm(searchTerm)

    // Clear filters if search term is empty
    if (searchTerm === "") {
      setAppliedFilters([])
    }
  }

  const refetchData = () => {
    refetch() // Refetch data after successful deletion
  }


  const handleFileUpload = async () => {
    if (!selectedFile) {
      console.error("No file selected")
      return
    }

    const formData = new FormData()
    formData.append("file", selectedFile)

    if (selectedBucket) {
      formData.append("bucket", selectedBucket)
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/import/csv`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${LocalStore.getAccessToken()}`,
          },
        }
      )
      if (response.status >= 200 && response.status < 300) {
        refetch()
        toast.success("Success ✅", {
          description: "File uploaded successfully",
        })
      }
    } catch (error: any) {
      toast.error("Error ❌", {
        description:
          error.response?.data?.message ||
          "An error occurred while uploading the customer.",
      })
    }
  }

  return (
    <div className="bg-slate-950  flex flex-col gap-8 text-slate-300">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-2 text-3xl font-extrabold text-primary ">
          <ChevronLeft
            size={28}
            strokeWidth={3}
            onClick={() => router.back()}
            className="cursor-pointer text-primary transition-transform duration-300 ease-in-out hover:scale-110 hover:text-green-400"
          />
          <h1>Users</h1>
        </div>
        <div className="flex flex-row gap-3">
          <div className="relative">
            <Input
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search Users..."
              className="h-12 w-96 border border-slate-300 pr-10"
            />
            <Search
              width={15}
              height={20}
              className="absolute right-3 top-1/2 -translate-y-1/2 transform text-slate-300"
            />
          </div>


          <div className="flex gap-2 bg-green-500 text-primary">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              {" "}
              <DialogTrigger asChild>
                <Button
                  className="flex h-12 flex-row gap-2 bg-green-500 text-slate-950"
                  variant="link"
                  onClick={() => setIsOpen(true)}
                >
                  <Plus width={20} />
                  Create new User
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-950 text-slate-300">
                <DialogHeader></DialogHeader>
                <UserCreatePage closeDialog={setIsOpen} refetch={refetchData} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
      <DataTable
        columns={columns}
        data={data?.data ?? []}
        refetchData={refetchData}
        // applyFilter={applyFilter}
        // clearFilter={clearFilter}
      />
      {/* Pagination Component */}
      <div className="flex text-slate-300">
        <Select
          onValueChange={(value: any) => {
            setPageSize(value)
          }}
        >
          <SelectTrigger className="ml-4 w-[80px] bg-slate-950 pr-2 text-slate-300 focus:ring-0">
            <SelectValue placeholder="Rows" />
          </SelectTrigger>
          <SelectContent className="bg-slate-950 text-slate-300 focus:ring-0">
            <SelectItem value="8">8</SelectItem>
            <SelectItem value="16">16</SelectItem>
            <SelectItem value="32">32</SelectItem>
          </SelectContent>
        </Select>
        <PaginationComponent
          currentPage={currentPage}
          totalPages={Math.ceil((data?.total ?? 0) / pageSize)}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  )
}

export default UserPage
