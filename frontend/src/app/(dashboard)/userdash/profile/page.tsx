"use client"

import React from "react"
import useMeStore from "@/store/useMeStore"

export default function Page() {
  const { meData } = useMeStore()

  return (
    <div className="flex h-screen items-center justify-center bg-slate-950 pb-10">
      <div className="relative mb-10 h-[600px] w-[500px] rounded-md">
        <img
          src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg"
          alt="AirMax Pro"
          className="z-0 h-full w-full rounded-md object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        <div className="absolute bottom-4 left-4 text-left">
          <h1 className="text-lg font-semibold uppercase text-primary">
            {meData?.firstName} {meData?.lastName}{" "}
          </h1>
          <p className="mt-2 flex flex-col text-sm text-gray-300">
            {meData?.email} <br />
            Roles : {meData?.roles?.[0]?.name ?? ""}{" "}
          </p>
          <p className=" flex flex-col text-sm text-gray-300">
            Created At: {meData?.createdAt?.toString() ?? ""}{" "}
          </p>
          <button className="mt-2 inline-flex cursor-pointer items-center text-sm font-semibold text-gray-600">
            View More &rarr;
          </button>
        </div>
      </div>
    </div>
  )
}
