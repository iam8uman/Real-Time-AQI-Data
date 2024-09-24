import React from "react"
import Image from "next/image"
import Logo from "../icons/logo"
import { Button } from "../ui/button"

export default function Hero() {
  return (
    <div className="relative w-full bg-slate-950">
      <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
        <div className="flex flex-col justify-center px-4 py-12 md:py-16 lg:col-span-7 lg:gap-x-6 lg:px-6 lg:py-24 xl:col-span-6">
          <Logo height={100} width={120} />
          <div className="mt-8 flex max-w-max items-center space-x-2 rounded-full bg-slate-300 p-1 border-[1px] border-primary">
            <div className="rounded-full bg-primary p-1 px-2 ">
              <p className="text-sm text-black font-medium">We&apos; hiring</p>
            </div>
            <p className="text-sm font-medium text-black">Join our team &rarr;</p>
          </div>
          <h1 className="mt-8 text-3xl font-bold tracking-tight text-gray-300 md:text-4xl lg:text-6xl">
            People who care about our .env
          </h1>
          <p className="mt-8 text-lg text-gray-300">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
            modi blanditiis dolores quasi eaque explicabo!
          </p>
          <form action="" className="mt-8 flex items-start space-x-2">
            <div>
              <input
                className="flex w-full rounded-sm border border-gray-300 bg-transparent px-3 py-2 text-sm bg-gray-300 placeholder:text-gray-950 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="email"
                placeholder="Enter your email"
                id="email"
              ></input>
              <p className="mt-2 text-xs text-gray-500">
                We care about your privacy
              </p>
            </div>
            <div>
              <Button
                type="button"
                variant="default"
                className="rounded-sm bg-primary px-7 py-2.5 text-sm font-medium text-white shadow dark:hover:bg-teal-500"
              >
                Subscribe
              </Button>
            </div>
          </form>
        </div>
        <div className="relative lg:col-span-5 lg:-mr-8 xl:col-span-6">
          <Image
            height={700}
            width={800}
            className="aspect-[3/2] bg-gray-50 object-cover lg:aspect-[4/3] lg:h-[700px] xl:aspect-[16/9]"
            src="https://plus.unsplash.com/premium_photo-1679079456783-5d862f755557?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjQ3fHxtYW4lMjB3aXRoJTIwbGFwdG9wfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
            alt=""
          />
        </div>
      </div>
    </div>
  )
}
