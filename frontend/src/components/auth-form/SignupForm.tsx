// SignupForm.tsx
"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import logo from "@/../public/The Wind (1).svg"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query"
import axios, { AxiosError, AxiosResponse } from "axios"
import { Eye, EyeOff } from "lucide-react"
import { useForm } from "react-hook-form"

import {
  signupFormSchema,
  SignupFormType,
} from "@/lib/validators/signupValidators"
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
import {toast} from "sonner"
import { Label } from "../ui/label"

export const inputLead =
  "peer block w-full h-14 appearance-none rounded-t-lg border-0 border-b-2 border-l-2 border-green-300 bg-gray-50 px-2.5 pb-2.5 pt-5 text-sm focus:border-green-600 focus:outline-none focus:ring-0 dark:border-green-600 bg-slate-950 dark:text-white dark:focus:border-green-500 text-gray-300"
export const labelLead =
  "absolute start-2.5 top-4 z-10 origin-[0] -translate-y-4 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-green-600 dark:text-gray-400 peer-focus:dark:text-green-500 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"

export default function SignupForm() {
  const router = useRouter()
  const [isView, setIsView] = useState(false)

  const signupForm = useForm({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      // organizationId: NaN,
    },
  })

  // Create an instance of UseMutationOptions with appropriate types
  const mutationOptions: UseMutationOptions<
    AxiosResponse<any, any>,
    AxiosError<any, any>,
    SignupFormType,
    unknown
  > = {
    // Specify the mutation function
    mutationFn: async (formData: SignupFormType) => {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
        const response = await axios.post(`${backendUrl}/users/signup`, {
          ...formData,
        })
        return response
      } catch (error) {
        throw error
      }
    },

    // Define success behavior
    onSuccess: (data) => {
      toast.success("Success ✅",{
        description: "Please check your phone for the OTP."
      })
      router.push("/auth/input-otp")
    },

    // Define error handling
    onError: (error) => {
      toast("Error ❌", {
        description: `${error?.response?.data?.message} with Status ${error?.response?.status ?? "Unknown"}`,
      })
    },
  }

  // Use the mutation hook with the defined options
  const mutation: UseMutationResult<
    AxiosResponse<any, any>,
    AxiosError<any, any>,
    SignupFormType,
    unknown
  > = useMutation(mutationOptions)

  // Define your onSubmit function as before
  const onSubmitSignup = async (data: SignupFormType) => {
    mutation.mutate(data)
  }

  return (
    <div className="28 w-[28rem] items-center rounded-lg border border-slate-300 bg-slate-950 p-10 drop-shadow-2xl">
      <div className="text-center">
        <Image
          src={
            "https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/logo-symbol.svg"
          }
          alt=""
          width={120}
          height={40}
          className="mx-auto h-12 w-auto"
        />
        <h1 className="mt-8 text-3xl font-bold text-green-500">Signup</h1>
        <p className="mt-4 text-sm font-medium text-gray-500">
          Vayu who cares about your .env
        </p>
      </div>

      <Form {...signupForm}>
        <form
          onSubmit={signupForm.handleSubmit(onSubmitSignup)}
          className="mt-4 space-y-4"
        >
          <FormField
            control={signupForm.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Input
                      type="text"
                      id="firstName"
                      className={inputLead}
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
              <FormItem>
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
            className="inline-flex h-12 w-full items-center justify-center rounded-sm border border-transparent bg-primary px-6 py-3 text-sm font-semibold leading-5 text-white transition-all duration-200"
          >
            Sign Up
          </Button>
        </form>
      </Form>
      <div className="mt-6 text-center">
        <p className="text-sm font-medium text-gray-300">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            passHref
            className="font-bold hover:underline"
          >
            Login now
          </Link>
        </p>
      </div>
    </div>
  )
}
