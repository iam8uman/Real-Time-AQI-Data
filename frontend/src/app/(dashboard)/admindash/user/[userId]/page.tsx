"use client"

import React, { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { LocalStore } from "@/store/localStore"
import useMeStore from "@/store/useMeStore"
import { User } from "@/types"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import {
  Banknote,
  Calendar,
  ChevronLeft,
  DollarSign,
  Mail,
  PaintBucket,
  PaperclipIcon,
  Phone,
  Podcast,
} from "lucide-react"

import { API_URL } from "@/config/env"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import EditableField from "@/components/EditableField"

import SideTab from "./(main)/SideTab"


const Page = () => {
  const params = useParams()

  const userId = params.userId
  const [userData, setUserData] = useState<User | undefined>()
  const [isEdit, setIsEdit] = useState(false)

  const { isError, data, error, refetch } = useQuery({
    queryKey: ["user", userId], // Pass query key within options object
    queryFn: async () => {
      if (!userId) {
        return
      }
      const response = await axios.get(`${API_URL}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${LocalStore.getAccessToken()}`,
        },
      })
      const data = await response.data // Extract JSON data from response
      setUserData(data) // Set extracted data as the value for userData
      if (response.status !== 200) {
        throw new Error("Network response was not ok")
      }
      return data
    },
  })

  const updateData = () => {
    refetch()
  }

  return (
    <div className="flex w-full flex-col  gap-2">
      {/* <div className="flex flex-row items-center gap-2 text-3xl font-extrabold">
        <ChevronLeft size={28} strokeWidth={3} onClick={() => router.back()} />
        <h1>{data?.name}&apos;s Details</h1>
      </div> */}
      {userData ? (
        <div className="mt-2 items-center  ">
          <div className="flex w-full flex-col items-start gap-2">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="text-3xl font-bold">
                {userData.firstName && userData.lastName
                  ? `${userData.firstName.charAt(0).toUpperCase()}${userData.lastName.charAt(0).toUpperCase()}`
                  : ""}
              </AvatarFallback>
            </Avatar>
            <EditableField
              updateUrl={process.env.API_URL}
              type="users"
              entityId={userData.id}
              field="firstName"
              value={userData.firstName}
              refetch={updateData}
              hasPermission={true}
              className="text-3xl font-extrabold text-slate-300"
              iconSize={15}
              valueType="string"
              inputClassName="max-h-8 w-full "
              setIsEdit={setIsEdit}
              isPatch={false}
            />
            {userData.lastName && (
              <div className="div flex flex-row justify-start gap-2 font-bold text-muted-foreground">
                <Podcast size={16} /> Description :{" "}
                <EditableField
                  updateUrl={process.env.API_URL}
                  type="users"
                  entityId={userData.id}
                  field="lastName"
                  value={userData.lastName}
                  refetch={updateData}
                  hasPermission={true}
                  valueType="string"
                  inputClassName="max-h-6 w-full text-slate-300"
                  className="text-md font-medium"
                  setIsEdit={setIsEdit}
                />
              </div>
            )}

            <Separator className=" bg-slate-900" />
            <div className="mt-6 flex w-full flex-col  gap-3">
              {/* <div className="flex flex-row gap-7 items-center"> */}
              <div className="flex w-full flex-row items-center gap-6">
                <div className="flex flex-row items-center gap-2 font-bold text-muted-foreground">
                  <Calendar width={15} color="gray" />
                  Joined:
                </div>
                <EditableField
                  updateUrl={process.env.API_URL}
                  type="users"
                  entityId={userData.id}
                  field="createdAt"
                  value={userData.createdAt}
                  refetch={updateData}
                  hasPermission={false}
                  className="max-h-6 w-32  text-slate-300"
                  iconSize={15}
                  valueType="date"
                  setIsEdit={setIsEdit}
                />
              </div>

              <div className="flex w-full flex-row items-center gap-6">
                <div className="flex flex-row items-center gap-2 font-bold text-muted-foreground">
                  <Mail width={15} color="gray" /> Email :
                </div>
                <EditableField
                  updateUrl={process.env.API_URL}
                  type="users"
                  entityId={userData.id}
                  field="email"
                  value={userData.email}
                  refetch={updateData}
                  hasPermission={true}
                  className="text-md font-medium text-slate-300 "
                  iconSize={15}
                  valueType="string"
                  inputClassName="max-h-6 w-60 "
                  setIsEdit={setIsEdit}
                  isPatch={false}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="ml-6 mt-16 flex h-10 w-10 animate-spin items-center justify-center    rounded-full border-b-2 border-t-2 border-gray-900 "></div>
      )}
      <Separator className=" bg-slate-900" />
      <SideTab id={1} isEdit={false} refetch={() => {}} />{" "}
    </div>
  )
}

export default Page
