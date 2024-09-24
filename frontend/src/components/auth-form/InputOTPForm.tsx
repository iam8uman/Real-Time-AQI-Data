// RequestOTPForm.tsx
"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query"
import axios, { AxiosError, AxiosResponse } from "axios"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { otpValidatorSchema } from "@/lib/validators/Otpvalidators"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"

import { Input } from "../ui/input"
import { Label } from "../ui/label"

// Infer the type from the schema
export type OTPFormType = z.infer<typeof otpValidatorSchema>

export const inputLead =
  "peer block w-full h-14 appearance-none rounded-t-lg border-0 border-b-2 border-l-2 border-green-300 bg-gray-50 px-2.5 pb-2.5 pt-5 text-sm focus:border-green-600 focus:outline-none focus:ring-0 dark:border-green-600 bg-slate-950 dark:text-white dark:focus:border-green-500 text-gray-300"
export const labelLead =
  "absolute start-2.5 top-4 z-10 origin-[0] -translate-y-4 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-green-600 dark:text-gray-400 peer-focus:dark:text-green-500 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"

export default function RequestOTPForm() {
  const router = useRouter()

  const otpForm = useForm({
    resolver: zodResolver(otpValidatorSchema),
    defaultValues: {
      otpCode: "",
      email: "",
    },
  })

  // Create an instance of UseMutationOptions with appropriate types
  const mutationOptions: UseMutationOptions<
    AxiosResponse<any, any>,
    AxiosError<any, any>,
    OTPFormType,
    unknown
  > = {
    // Specify the mutation function
    mutationFn: async (formData: OTPFormType) => {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
        const response = await axios.post(`${backendUrl}/auth/verify-otp`, {
          ...formData,
        })
        return response
      } catch (error) {
        throw error
      }
    },

    // Define success behavior
    onSuccess: (data) => {
      toast.success("Success ✅", {
        description: "Successfully verified OTP. Login Now!",
      })
      router.push("/auth/login")
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
    OTPFormType,
    unknown
  > = useMutation(mutationOptions)

  // Define your onSubmit function
  const onSubmitOTP = async (data: OTPFormType) => {
    mutation.mutate(data)
  }

  return (
    <div className="28 w-[28rem] items-center rounded-lg border border-slate-300 bg-slate-950 p-10 drop-shadow-2xl">
      <div className="mb-16 text-center">
        <h1 className="mt-8 text-3xl font-bold text-green-500">Verify OTP</h1>
        <p className="mt-4 text-sm font-medium text-gray-500">
          Enter a one-time password
        </p>
      </div>

      <Form {...otpForm}>
        <form
          onSubmit={otpForm.handleSubmit(onSubmitOTP)}
          className="mt-4 space-y-4"
        >
          <FormField
            control={otpForm.control}
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
                      Enter Your Email
                    </Label>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={otpForm.control}
            name="otpCode"
            render={({ field }) => (
              <FormItem className="text-slate-300">
                {/* <FormLabel className="text-center text-xl items-center">One-Time Password</FormLabel> */}
                <FormControl>
                  <InputOTP maxLength={6} {...field} className="py-10">
                    <InputOTPGroup>
                      <InputOTPSlot index={0} className="p-6" />
                      <InputOTPSlot index={1} className="p-6" />
                      <InputOTPSlot index={2} className="p-6" />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} className="p-6" />
                      <InputOTPSlot index={4} className="p-6" />
                      <InputOTPSlot index={5} className="p-6" />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription className="pt-6">
                  Please enter the one-time password sent to your phone.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            variant="default"
            className="inline-flex h-12 w-full items-center justify-center rounded-sm border border-transparent bg-primary px-6 py-3 text-sm font-semibold leading-5 text-white transition-all duration-200"
          >
            Verify
          </Button>
        </form>
      </Form>
    </div>
  )
}
