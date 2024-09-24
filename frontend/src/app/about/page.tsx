"use client"

import React from "react"
import { MapPin, Menu, X } from "lucide-react"

import Footer from "@/components/footer/Footer"
import Navbarcn from "@/components/Navbar/Navbarcn"

const locations = [
  {
    title: "YAKS INC office",
    timings: "Mon-Sat 9am to 5pm.",
    address: "100, Electronic City Phase-1, Bengaluru, Karnataka 560100 IN",
  },
  {
    title: "Chicago office",
    timings: "Mon-Sat 9am to 5pm.",
    address: "12th Main Rd, Indiranagar, Bengaluru, Karnataka 560008 IN",
  },
  {
    title: "NYC office",
    timings: "Mon-Sat 9am to 5pm.",
    address:
      "42, Residency Rd, Shanthala Nagar, Ashok Nagar, Bengaluru, Karnataka 560025 IN",
  },
]

const Page = () => {
  return (
    <div className="bg-gray-950 text-slate-300">
      <Navbarcn />
      <div className="mx-auto max-w-7xl px-4">
        {/* Hero Map */}
        <div className="flex flex-col space-y-8 pb-10 pt-12 md:pt-24">
          <div className="max-w-max rounded-full border bg-gray-50 p-1 px-3">
            <p className="text-xs font-semibold leading-normal text-gray-950 md:text-sm">
              About the company
            </p>
          </div>
          <p className="text-3xl font-bold text-primary md:text-5xl md:leading-10">
            Made with love, right here in Nepal
          </p>
          <p className="max-w-4xl text-base text-gray-600 md:text-xl">
            Join us on this journey as we strive to create a world where
            everyone has access to real-time AQI data, empowering individuals to
            make informed decisions and fostering a sustainable future.
            Together, we can build a better tomorrow.
          </p>
        </div>
        <div className="w-full space-y-4">
          <div className="relative h-96 w-full">
            <iframe
              width="100%"
              height="400"
              src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Kathmandu,%20Kathmandu%20Metropolitan%20City,%20Kathmandu,%20Bagmati%20Province,%2046000,%20Nepal+(Vayu%20Monitoring%20City%20Air%20Quality%20Index%20Instant%20&amp;%20Accurate)&amp;t=h&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            ></iframe>
          </div>
        </div>
        {/* locations */}
        <div className="my-8 flex flex-col gap-y-6 md:flex-row lg:justify-around">
          {locations.map((location) => (
            <div
              key={location.title}
              className="flex flex-col space-y-3 md:w-2/4 lg:w-1/5"
            >
              <MapPin className="h-5 w-5" />
              <p className="w-full text-xl font-semibold  text-primary">
                {location.title}
              </p>
              <p className="w-full text-base text-gray-700">
                {location.timings}
              </p>
              <p className="text-sm font-medium">{location.address}</p>
            </div>
          ))}
        </div>
        <hr className="mt-20" />

        {/* Hiring Banner */}
        <div className="flex flex-col items-center gap-x-4 gap-y-4 py-16 md:flex-row">
          <div className="space-y-6">
            <p className="text-sm font-semibold md:text-base">
              Join our team &rarr;
            </p>
            <p className="text-3xl font-bold md:text-4xl">
              We&apos;re just getting started
            </p>
            <p className="max-w-6xl text-base text-gray-600 md:text-lg">
              At the core of our mission is the belief that by providing the
              best possible service, we can make a positive impact on the lives
              of individuals and communities. We are excited about the potential
              of our hardware device to contribute to a healthier and safer
              environment for all.
            </p>
            <button
              type="button"
              className="rounded-full bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Join Now
            </button>
          </div>
          <div className="md:mt-o mt-10 w-full ">
            <img
              src="https://images.unsplash.com/photo-1605165566807-508fb529cf3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
              alt="Getting Started"
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Page
