"use client"

import React, { useEffect, useState } from "react"
import { redirect, useRouter } from "next/navigation"
import { LocalStore } from "@/store/localStore"
import useMeStore from "@/store/useMeStore"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { CALIBRATE_URL } from "@/config/env"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import LinkPage from "@/app/(dashboard)/admindash/device/link/LinkPage"

import { inputLead, labelLead } from "../../auth-form/ForgotPs"
import { ownerSchema, OwnerType } from "../validators/DeviceCreateValidator"

type Props = {
  setIsOpen: (isOpen: boolean) => void
  id: string
  owner: number
}

const AllocateDevice = ({ setIsOpen, id, owner }: Props) => {
  const { meData: userData } = useMeStore()
  const [link, setLink] = useState("")
  console.log(id, owner)

  const deviceAllocateForm = useMutation({
    mutationFn: async (data: OwnerType) => {
      data.id = id
      setIsOpen(true)
      try {
        const response = await axios.put(
          `${CALIBRATE_URL}/devices/user/${id}`,
          {
            ...data,
          },
          // {
          //   headers: {
          //     Authorization: `Bearer ${LocalStore.getAccessToken()}`,
          //   },
          // }
        )

        if (response.status >= 200 && response.status < 300) {
          setLink(response.data?.token)
        } else {
          console.error("Unexpected response status:", response.status)
          throw new Error("An error occurred while allocating the Device.")
        }
      } catch (error) {
        console.error("Error occurred during request:", error)
        setIsOpen(false)
        throw error
      }
    },
    onSuccess: (data) => {
      toast.success("Success ✅", {
        description: "Device Allocated successfully.",
      })
    },
    onError: (err: any) => {
      console.error("Mutation error:", err)
      toast.error("Error ❌", {
        description:
          err.response?.data?.message ||
          "An error occurred while allocating the device.",
      })
      setIsOpen(false)
    },
  })

  const handleSubmit = (data: OwnerType) => {
    deviceAllocateForm.mutate(data)
  }

  useEffect(() => {
    // Check user roles if needed
  }, [userData])

  const deviceCreateForm = useForm<OwnerType>({
    resolver: zodResolver(ownerSchema),
    defaultValues: {
      owner: owner,
      id: id,
    },
  })

  return (
    <>
      {link ? (
        <>
          <LinkPage token={link} setIsOpen={setIsOpen} />
        </>
      ) : (
        <>
          <div>
            <div className="text-center text-xl font-bold">
              Re-allocate device!
            </div>
          </div>
          <div className="grid gap-4 py-4">
            <Form {...deviceCreateForm}>
              <form
                onSubmit={deviceCreateForm.handleSubmit(handleSubmit)}
                className="mt-4 space-y-4"
              >
                <FormField
                  control={deviceCreateForm.control}
                  name="owner"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <FormLabel htmlFor="ownerId" className={labelLead}>
                            Owner ID
                          </FormLabel>
                          <Input
                            placeholder=""
                            type="number"
                            style={{
                              WebkitBoxShadow: "0 0 0px 1000px #111827 inset",
                              WebkitTextFillColor: "#D1D5DB",
                            }}
                            className={inputLead}
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <Button
                    type="submit"
                    variant="default"
                    disabled={deviceAllocateForm.isPending}
                    className={cn(
                      deviceAllocateForm.isPending
                        ? `inline-flex w-full items-center justify-center rounded-md border border-transparent bg-primary px-6 py-6 text-sm font-semibold leading-5 text-gray-500 transition-all duration-200`
                        : `inline-flex w-full items-center justify-center rounded-md border border-transparent bg-primary px-6 py-6 text-sm font-semibold leading-5 text-white transition-all duration-200`
                    )}
                  >
                    Re-allocate
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </>
      )}
    </>
  )
}

export default AllocateDevice
