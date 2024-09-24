"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"

import { LampContainer } from "../ui/lamp"

export default function LampDemo() {
  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-4 bg-gradient-to-br from-slate-200 to-slate-500 bg-clip-text py-4 text-center font-bold tracking-tight text-transparent"
      >
        <div className="bg-gradient-to-r  from-white to-white-600 bg-clip-text text-3xl font-extrabold font-outline-2 sm:text-5xl">
          Vayu - Monitoring City Air Quality Index
          <span className="sm:block text-primary"> Instant & Accurate </span>
        </div>

        <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed text-gray-400">
          One and only platform to monitor city air space on real time.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            className="block w-full rounded border border-blue-600 bg-primary px-12 py-3 text-md font-bold text-gray-950 hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
            href="/auth/login"
          >
            Get Started
          </Link>

          <Link
            className="block w-full rounded border border-blue-600 px-12 py-3 text-md font-bold text-white hover:bg-gray-900 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
            href="/about"
          >
            Learn More
          </Link>
        </div>
      </motion.h1>
    </LampContainer>
  )
}
