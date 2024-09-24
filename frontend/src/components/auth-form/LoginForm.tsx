"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import loginMutationAction from "@/actions/loginAction"
import { LocalStore } from "@/store/localStore"
import useMeStore from "@/store/useMeStore"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query"
import axios, { AxiosError, AxiosResponse } from "axios"
import { jwtDecode } from "jwt-decode"
import { Eye, EyeOff } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { setCookie } from "@/lib/cookie"
import {
  loginFormSchema,
  LoginFormType,
} from "@/lib/validators/LoginValidators"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { Label } from "../ui/label"
import { Separator } from "../ui/separator"
import { inputLead, labelLead } from "./SignupForm"

const Login: React.FC = () => {
  const router = useRouter()
  const [isView, setIsView] = useState(false)
  const { setIsLoggedIn, isLoggedIn } = useMeStore()

  const loginForm = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const loginMutation: UseMutationOptions<
    AxiosResponse<any, any>,
    AxiosError<any, any>,
    LoginFormType,
    unknown
  > = {
    mutationFn: loginMutationAction, // The server action for loginmutation
    onSuccess: (data) => {
      toast.success("User Logged IN SuccessFully", {
        description: "Sunday, December 03, 2024 at 9:00 AM",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      })

      setIsLoggedIn(true)

      // Decode JWT to get expiration time and user info
      const decoded: { exp: number } = jwtDecode(data.data.jwt)

      const exp = decoded.exp

      setCookie("accessToken", data.data.jwt, exp)
      LocalStore.setAccessToken(data.data.jwt)
      router.push("/userdash")
    },
    onError: (error) => {
      toast.error("Failed to log in", {
        description: `${error?.response?.data.message} with Status ${error?.response?.status ?? "Unknown"}`,
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      })
    },
  }

  const mutation: UseMutationResult<
    AxiosResponse<any, any>,
    AxiosError<any, any>,
    LoginFormType,
    unknown
  > = useMutation(loginMutation)

  const onSubmitLogin = async (data: LoginFormType) => {
    mutation.mutate(data)
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="28 w-[26rem] items-center rounded-lg border border-slate-300 bg-slate-950 p-10 drop-shadow-2xl">
        <div className="text-center">
          <Image
            src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/logo-symbol.svg"
            alt=""
            width={120}
            height={40}
            className="mx-auto h-12 w-auto"
          />
          <h1 className="mt-8 text-3xl font-bold text-green-600">Login</h1>
          <p className="mt-4 text-sm font-medium text-gray-500">
            Vayu - City Air Quality Monitoring System. Instant and Accurate!
          </p>
        </div>

        <Form {...loginForm}>
          <form
            onSubmit={loginForm.handleSubmit(onSubmitLogin)}
            className="mt-4 space-y-4"
          >
            <FormField
              control={loginForm.control}
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
              control={loginForm.control}
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
              className="inline-flex h-12 w-full items-center justify-center rounded-md border border-transparent bg-primary px-6 py-3 text-sm font-semibold leading-5 text-white transition-all duration-200"
            >
              Login
            </Button>
          </form>
        </Form>

        <div className="flex flex-col items-center text-center text-slate-300">
          <div className="mt-6 text-center">
            <p className="text-sm font-medium text-gray-300">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/signup"
                passHref
                className="font-bold hover:underline"
              >
                Sign up now
              </Link>
            </p>
          </div>
          <div className="my-2 flex w-full items-center gap-1 text-primary">
            <Separator className="w-36" />
            OR <Separator className="w-36" />
          </div>
          <Link
            href="/auth/forgot-ps"
            passHref
            className="text-sm font-medium hover:underline"
          >
            Forgot Password ?
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
