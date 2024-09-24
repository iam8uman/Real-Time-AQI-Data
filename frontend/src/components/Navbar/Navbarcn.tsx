"use client"

import { Sign } from "crypto"
import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { LocalStore } from "@/store/localStore"
import { LogInIcon, Menu, X } from "lucide-react"

import { clearCookie } from "@/lib/cookie"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import Login from "../auth-form/LoginForm"
import Register from "../auth-form/SignupForm"
import Logo from "../icons/logo"
import { Button } from "../ui/button"

const Navbarcn = ({ userData }: any) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const isLogin = userData?.id
  const router = useRouter()

  return (
    <>
      <header className="sticky top-0 z-10  bg-gray-950 py-2">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex-1 md:flex md:items-center md:gap-12">
              <Link href="/">
                <div
                  className="block text-primary dark:text-teal-300"
                  aria-label="Home"
                >
                  <Logo height={80} width={100} />
                </div>
              </Link>
            </div>
            <Button
              type="button"
              className="inline-flex rounded-md p-2 text-gray-300 transition-all duration-200 lg:hidden"
              onClick={toggleMenu}
            >
              {isOpen ? (
                <X className="h-6 w-6 cursor-pointer text-gray-200" />
              ) : (
                <Menu className="h-6 w-6 cursor-pointer text-gray-200" />
              )}
            </Button>

            <div className="hidden lg:ml-auto lg:flex lg:items-center lg:space-x-10">
              <nav aria-label="Global" className="hidden md:block">
                <ul className="text-md flex items-center gap-6">
                  <li>
                    <Link href="/about">
                      <div className="text-gray-300 transition hover:text-gray-300/75 dark:text-white dark:hover:text-white/75">
                        About
                      </div>
                    </Link>
                  </li>
                </ul>
              </nav>

              {!isLogin ? (
                <div className="flex items-center gap-4">
                  <div className="sm:flex sm:gap-4">
                    <Link href="/auth/login">
                      <Button className="rounded-full border-2 border-primary bg-green-700 px-6 py-4 text-base text-white shadow hover:bg-green-900">
                        Login
                      </Button>
                    </Link>

                    <div className="hidden sm:flex">
                      <Link href="/auth/signup">
                        <Button className="rounded-full border-[1px] border-primary  bg-gray-900 px-6 py-4 text-sm font-medium text-primary text-white hover:bg-gray-950 hover:text-white/75">
                          Register
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <div className="sm:flex sm:gap-4">
                    <Link
                      href={
                        userData?.roles[0].name === "Admin"
                          ? "admindash"
                          : "userdash"
                      }
                    >
                      <Button className="rounded-full border-2 border-primary bg-green-700 px-6 py-4 text-base text-white shadow dark:hover:bg-green-900">
                        Dashboard
                      </Button>
                    </Link>

                    <Button
                      className="rounded-full border-2 border-primary bg-gray-900 px-6 py-4 text-base text-white shadow hover:bg-gray-950"
                      onClick={() => {
                        LocalStore.remove("jwt")
                        clearCookie("accessToken")
                        router.replace("/")
                      }}
                    >
                      Logout
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <nav
          className={`mx-2 rounded-md border border-gray-200 bg-gray-950 pb-6 pt-4 shadow-md lg:hidden ${
            isOpen ? "block" : "hidden"
          }`}
          style={{ transition: "height 0.3s ease" }}
        >
          <div className="flow-root">
            <div className="-my-2 flex flex-col space-y-1 px-6">
              <Link href="#">
                <div className="flex justify-center py-2 text-base font-medium text-gray-300 transition-all duration-200 hover:text-red-600 focus:text-red-600">
                  About
                </div>
              </Link>
            </div>
          </div>
          <div className="mt-6 px-6">
            <div className="flex-col items-center gap-4 gap-y-4">
              {/* {isLogin && ( */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full items-center rounded-md bg-primary px-20 py-2.5 text-center text-sm font-medium text-white shadow">
                    Login
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[200px]">
                  {/* Login form */}
                  <Login />
                </DialogContent>
              </Dialog>
              {/* )}  */}{" "}
              {!isLogin && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className=" bg-gray-800text-white mt-4 w-full rounded-md border-[1px] border-primary text-center text-sm font-medium text-primary">
                      Register
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    {/* Register Form */}
                    <Register />
                  </DialogContent>
                </Dialog>
              )}{" "}
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}

export default Navbarcn
