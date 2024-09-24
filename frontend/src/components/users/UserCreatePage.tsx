"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
// import useleadFormSubmitted from "@/store/leadFormSubmitted"
import { LocalStore } from "@/store/localStore"
import useMeStore from "@/store/useMeStore"
import { Segment } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { SelectItem } from "@radix-ui/react-select"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { ChevronLeft, Eye, EyeOff } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { signupFormSchema } from "@/lib/validators/signupValidators"
import useDataFetcher from "@/hooks/useDataFetcher"
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
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

import { inputLead, labelLead } from "../auth-form/SignupForm"
import { Label } from "../ui/label"

type userData = z.infer<typeof signupFormSchema> & { [key: string]: any }

interface Props {
  closeDialog: (value: any) => void
  refetch: () => void
}

const UserCreatePage = ({ closeDialog, refetch }: Props) => {
  const { meData } = useMeStore()
  // const { setLeadFormSubmitted } = useleadFormSubmitted()
  const [isOpen, setIsOpen] = React.useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const router = useRouter()
  const [isView, setIsView] = useState(false)

  const signupForm = useForm({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  })

  const createUserMutation = useMutation({
    mutationFn: async (data: userData) => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/signup`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${LocalStore.getAccessToken()}`,
          },
        }
      )

      if (response.status === 200 || response.status === 201) {
        return response.data
      } else {
        throw new Error("An error occurred while creating the user.")
      }
    },
    onError: (err: any) => {
      toast("Error ❌❌", {
        description:
          `${
            err.response?.data?.message ||
            "An error occurred while creating the user."
          } ` +
          `${
            err.response?.data?.error
              ? `Error: ${err.response?.data?.error?.message}`
              : ""
          } ` +
          `${
            err.response?.data?.statusCode
              ? `Status Code: ${err.response?.data?.statusCode}`
              : ""
          }`,
      })
    },
    onSuccess: (data) => {
      refetch()
      signupForm.reset()
      router.push("/admindash/user")
      closeDialog(false)
      toast("Success ✅✅", {
        description: "User has been created successfully!",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      })
    },
  })

  const handleSubmit = (values: userData) => {
    createUserMutation.mutate(values)
  }

  useEffect(() => {
    const hasAdminRole = meData?.roles?.some((role) => role.name === "Admin")
    setIsAdmin(hasAdminRole ?? false)
  }, [meData])

  return (
    <div className="mx-auto flex flex-col justify-start">
      <div className="relative bottom-4 flex flex-row items-center justify-start gap-2 text-3xl font-extrabold text-primary ">
        <ChevronLeft
          size={28}
          strokeWidth={3}
          onClick={() => router.back()}
          className="cursor-pointer text-primary transition-transform duration-300 ease-in-out hover:scale-110 hover:text-green-400"
        />
        <h1>Add New User</h1>
      </div>
      <div className="relative bottom-4 grid w-full gap-4 py-4">
        <Form {...signupForm}>
          <form
            onSubmit={signupForm.handleSubmit(handleSubmit)}
            className="mt-4 w-full space-y-4 "
            // action={createUser}
          >
            <div className="w-full">
              <FormField
                control={signupForm.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <div className="relative w-full">
                        <Input
                          type="text"
                          id="firstName"
                          // className={inputLead}
                          className="peer block h-14 w-[440px] appearance-none rounded-t-lg border-0 border-b-2 border-l-2 border-green-300 bg-slate-950 px-2.5 pb-2.5 pt-5 text-sm text-gray-300 focus:border-green-600 focus:outline-none focus:ring-0 dark:border-green-600 dark:text-white dark:focus:border-green-500"
                          placeholder=" "
                          style={{
                            WebkitBoxShadow: "0 0 0px 1000px #111827 inset",
                            WebkitTextFillColor: "#D1D5DB",
                          }}
                          {...field}
                        />
                        <Label htmlFor="firstName" className={labelLead}>
                          First Name
                        </Label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={signupForm.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="text"
                        id="lastName"
                        className={inputLead}
                        placeholder=" "
                        style={{
                          WebkitBoxShadow: "0 0 0px 1000px #111827 inset",
                          WebkitTextFillColor: "#D1D5DB",
                        }}
                        {...field}
                      />
                      <Label htmlFor="lastName" className={labelLead}>
                        Last Name
                      </Label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={signupForm.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="email"
                        id="email"
                        className={inputLead}
                        placeholder=" "
                        style={{
                          WebkitBoxShadow: "0 0 0px 1000px #111827 inset",
                          WebkitTextFillColor: "#D1D5DB",
                        }}
                        {...field}
                      />
                      <Label htmlFor="email" className={labelLead}>
                        Email
                      </Label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={signupForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={isView ? "text" : "password"}
                        id="password"
                        className={inputLead}
                        placeholder=" "
                        style={{
                          WebkitBoxShadow: "0 0 0px 1000px #111827 inset",
                          WebkitTextFillColor: "#D1D5DB",
                        }}
                        {...field}
                      />
                      {isView ? (
                        <Eye
                          className="absolute right-4 top-4 z-10 cursor-pointer text-gray-500"
                          onClick={() => {
                            setIsView(!isView), console.log(isView)
                          }}
                        />
                      ) : (
                        <EyeOff
                          className="absolute right-4 top-4 z-10 cursor-pointer text-gray-500"
                          onClick={() => setIsView(!isView)}
                        />
                      )}

                      <Label htmlFor="password" className={labelLead}>
                        Password
                      </Label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              variant="default"
              disabled={createUserMutation.isPending}
              className={cn(
                createUserMutation.isPending
                  ? `inline-flex w-full items-center justify-center rounded-md border border-transparent bg-primary px-6 py-6 text-sm font-semibold leading-5 text-gray-500 transition-all duration-200`
                  : `inline-flex w-full items-center justify-center rounded-md border border-transparent bg-primary px-6 py-6 text-sm font-semibold leading-5 text-white transition-all duration-200`
              )}
            >
              Create a User
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default UserCreatePage
