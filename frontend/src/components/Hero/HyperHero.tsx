"use client"

import React from "react"
import { motion } from "framer-motion"
import { MapPin } from "lucide-react"
import { useInView } from "react-intersection-observer"

const locations = [
  {
    title: "YAKS INC office",
    timings: "Mon-Sat 9am to 5pm.",
    address: "Baluwatar, Kathmandu, Bagmati Province, 46000, Nepal",
  },
  {
    title: "Chicago office",
    timings: "Mon-Sat 9am to 5pm.",
    address: "123, Wacker Dr, Chicago, IL 60601, USA",
  },
  {
    title: "NYC office",
    timings: "Mon-Sat 9am to 5pm.",
    address:
      "123, 5th Ave, New York, NY 10001, USA",
  },
]

const HyperHero = () => {
  const { ref: heroRef, inView: heroInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const { ref: mapRef, inView: mapInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const { ref: locationsRef, inView: locationsInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const { ref: hiringRef, inView: hiringInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <div className="bg-gray-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-4">
        {/* Hero Map */}
        <motion.div
          className="flex flex-col space-y-8 pb-10 pt-12 md:pt-24"
          ref={heroRef}
          initial={{ opacity: 0, x: -100 }}
          animate={heroInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="max-w-max rounded-full border bg-gray-50 p-1 px-3"
            initial={{ scale: 0.8, x: -100 }}
            animate={heroInView ? { scale: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-semibold leading-normal text-gray-950 md:text-sm">
              About the company
            </p>
          </motion.div>
          <motion.p
            className="text-3xl font-bold text-primary md:text-5xl md:leading-10"
            initial={{ opacity: 0, x: -100 }}
            animate={heroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Made with love, right here in Nepal
          </motion.p>
          <motion.p
            className="max-w-4xl text-base text-gray-600 md:text-xl"
            initial={{ opacity: 0, x: -100 }}
            animate={heroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Join us on this journey as we strive to create a world where
            everyone has access to real-time AQI data, empowering individuals to
            make informed decisions and fostering a sustainable future.
            Together, we can build a better tomorrow.
          </motion.p>
        </motion.div>
        <motion.div
          className="w-full space-y-4"
          ref={mapRef}
          initial={{ opacity: 0, x: 100 }}
          animate={mapInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className="relative h-96 w-full">
            <iframe
              width="100%"
              height="400"
              src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Kathmandu,%20Kathmandu%20Metropolitan%20City,%20Kathmandu,%20Bagmati%20Province,%2046000,%20Nepal+(Vayu%20Monitoring%20City%20Air%20Quality%20Index%20Instant%20&amp;%20Accurate)&amp;t=h&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            ></iframe>
          </div>
        </motion.div>
        {/* locations */}
        <motion.div
          className="my-8 flex flex-col gap-y-6 md:flex-row lg:justify-around"
          ref={locationsRef}
          initial={{ opacity: 0, x: 100 }}
          animate={locationsInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          {locations.map((location) => (
            <motion.div
              key={location.title}
              className="flex flex-col space-y-3 md:w-2/4 lg:w-1/5"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{
                opacity: 0,
                x: location.title.includes("NYC") ? -100 : 100,
              }}
              animate={locationsInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <MapPin className="h-5 w-5" />
              <p className="w-full text-xl font-semibold  text-primary">
                {location.title}
              </p>
              <p className="w-full text-base text-gray-700">
                {location.timings}
              </p>
              <p className="text-sm font-medium">{location.address}</p>
            </motion.div>
          ))}
        </motion.div>
        <hr className="mt-20" />

        {/* Hiring Banner */}
        <motion.div
          className="flex flex-col items-center gap-x-4 gap-y-4 py-16 md:flex-row"
          ref={hiringRef}
          initial={{ opacity: 0, x: -100 }}
          animate={hiringInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -100 }}
            animate={hiringInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <p className="text-sm font-semibold md:text-base">
              Join our team &rarr;
            </p>
            <p className="text-3xl font-bold md:text-4xl">
              We&apos;re just getting started
            </p>
            <p className="text-base text-gray-600 md:text-lg">
              Our philosophy is simple — hire a team of diverse, passionate
              people and foster a culture that empowers you to do your best
              work.
            </p>
            <button
              type="button"
              className="rounded-full bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Join Now
            </button>
          </motion.div>
          <motion.div
            className="md:mt-o mt-10 w-full"
            initial={{ opacity: 0, x: 100 }}
            animate={hiringInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 1.4, duration: 0.8 }}
          >
            <img
              src="https://images.unsplash.com/photo-1605165566807-508fb529cf3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
              alt="Getting Started"
              className="rounded-lg"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default HyperHero
