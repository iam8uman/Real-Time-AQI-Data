// ForgotPasswordForm.tsx
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
import { z } from "zod"

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
import { forgotPasswordValidatorSchema } from "@/lib/validators/forgotPasswordValidatorSchema"
import { routes } from "@/config/routes"
import { toast } from "sonner"

// Infer the type from the schema
export type ForgotPasswordFormType = z.infer<typeof forgotPasswordValidatorSchema>

export const inputLead =
  "peer block w-full h-14 appearance-none rounded-t-lg border-0 border-b-2 border-l-2 border-green-300 px-2.5 pb-2.5 pt-5 text-sm focus:border-green-600 focus:outline-none focus:ring-0 dark:border-green-600 bg-slate-950 dark:text-white dark:focus:border-green-500 text-gray-300"
export const labelLead =
  "absolute start-2.5 top-4 z-10 origin-[0] -translate-y-4 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-green-600 dark:text-gray-400 peer-focus:dark:text-green-500 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"

export default function ForgotPasswordForm() {
  const router = useRouter()

  const forgotPasswordForm = useForm({
    resolver: zodResolver(forgotPasswordValidatorSchema),
    defaultValues: {
      email: "",
    },
  })

  // Create an instance of UseMutationOptions with appropriate types
  const mutationOptions: UseMutationOptions<
    AxiosResponse<any, any>,
    AxiosError<any, any>,
    ForgotPasswordFormType,
    unknown
  > = {
    // Specify the mutation function
    mutationFn: async (formData: ForgotPasswordFormType) => {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
        const response = await axios.post(`${backendUrl}/auth/forgot-password`, {
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
        description: "Reset password link has been sent to your email.",
      })
      router.push(routes.auth.login)
    },

    // Define error handling
    onError: (error) => {
      toast.error("Error ❌", {
        description: `${error?.response?.data?.message} with Status ${error?.response?.status ?? "Unknown"}`,
      })
    },
  }

  // Use the mutation hook with the defined options
  const mutation: UseMutationResult<
    AxiosResponse<any, any>,
    AxiosError<any, any>,
    ForgotPasswordFormType,
    unknown
  > = useMutation(mutationOptions)

  // Define your onSubmit function
  const onSubmitForgotPassword = async (data: ForgotPasswordFormType) => {
    mutation.mutate(data)
  }

  return (
    <div className="28 w-[28rem] items-center rounded-lg border border-slate-300 bg-slate-950 p-10 drop-shadow-2xl">
      <div className="text-center mb-16">
        <h1 className="mt-8 text-3xl font-bold text-green-500">Forgot Password</h1>
        <p className="mt-4 text-sm font-medium text-gray-500">
          Enter your email to receive a reset password link
        </p>
      </div>

      <Form {...forgotPasswordForm}>
        <form
          onSubmit={forgotPasswordForm.handleSubmit(onSubmitForgotPassword)}
          className="mt-4 space-y-4"
        >
          <FormField
            control={forgotPasswordForm.control}
            name="email"
            render={({ field }) => (
              <FormItem className="text-slate-300">
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
                    <FormLabel htmlFor="email" className={labelLead}>
                      Email
                    </FormLabel>
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
            Send Reset Link
          </Button>
        </form>
      </Form>
    </div>
  )
}
