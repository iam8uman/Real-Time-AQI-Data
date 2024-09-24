import React from "react"
import Image from "next/image"
import dolphy from "@/../public/logo/logo-1.png"
import bay from "@/../public/logo/logo-2.png"
import dolphine from "@/../public/logo/logo-3.png"
import elixir from "@/../public/logo/logo-4.png"
import Imgoneeee from "@/../public/logo/logo-5.png"
import savemax from "@/../public/logo/logo-6.png"

const TrustedBy = () => {
  return (
    <div>
      <section className="py-10 sm:py-16 lg:py-24">
        <div className="flex items-center justify-center gap-4 py-2 ">
          <h2 className="aaa text-center text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl ">
            Just Look at Our Partners
          </h2>
        </div>
        <div className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 items-center gap-10 sm:grid-cols-3 sm:gap-y-16 xl:grid-cols-6">
            <div>
              <Image
                height={1000}
                width={1000}
                className="mx-auto h-20 w-auto transform object-contain grayscale transition-transform duration-300 ease-in-out hover:scale-125 hover:grayscale-0"
                src={dolphine}
                alt=""
              />
            </div>

            <div>
              <Image
                height={1000}
                width={1000}
                className="mx-auto h-14 w-auto transform object-contain grayscale transition-transform duration-300 ease-in-out hover:scale-125 hover:grayscale-0"
                src={dolphy}
                alt=""
              />
            </div>

            <div>
              <Image
                height={1000}
                width={1000}
                className="mx-auto h-24 w-auto transform object-contain grayscale transition-transform duration-300 ease-in-out hover:scale-125 hover:grayscale-0"
                src={bay}
                alt=""
              />
            </div>

            <div>
              <Image
                height={1000}
                width={1000}
                className="mx-auto h-14 w-auto transform object-contain grayscale transition-transform duration-300 ease-in-out hover:scale-125 hover:grayscale-0"
                src={elixir}
                alt=""
              />
            </div>

            <div>
              <Image
                height={1000}
                width={1000}
                className="mx-auto h-14 w-auto transform object-contain grayscale transition-transform duration-300 ease-in-out hover:scale-125 hover:grayscale-0"
                src={Imgoneeee}
                alt=""
              />
            </div>

            <div>
              <Image
                height={1000}
                width={1000}
                className="mx-auto h-14 w-auto transform object-contain grayscale transition-transform duration-300 ease-in-out hover:scale-125 hover:grayscale-0"
                src={savemax}
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default TrustedBy
