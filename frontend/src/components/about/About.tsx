import React from "react"
import Image from "next/image"
import Link from "next/link"
import bg from "@/../public/blob-shape.svg"
import businessWoman from "@/../public/business-woman.png"
const About = () => {
  return (
    <>
      <section className="overflow-hidden bg-gray-50 pt-10 sm:pt-16 md:pt-0 2xl:pt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
                Hey 👋 I am <br className="block sm:hidden" />
                Jenny Carter
              </h2>
              <p className="mt-3 max-w-lg text-xl leading-relaxed text-gray-600 md:mt-8">
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                amet sint. Velit officia consequat duis enim velit mollit.
                Exercitation veniam consequat sunt nostrud amet.
              </p>

              <p className="mt-4 text-xl text-gray-600 md:mt-8">
                <span className="relative inline-block">
                  <span className="absolute bottom-0.5 inline-block h-2 w-full bg-yellow-300"></span>
                  <span className="relative"> Have Link question? </span>
                </span>
                <br className="block sm:hidden" />
                Ask me on{" "}
                <Link
                  href="#"
                  title=""
                  className="text-sky-500 transition-all duration-200 hover:text-sky-600 hover:underline"
                >
                  Twitter
                </Link>
              </p>
            </div>

            <div className="relative">
              <Image
                height={500}
                width={500}
                className="absolute inset-x-0 bottom-0 left-1/2 -mb-48 -translate-x-1/2"
                src={bg}
                alt=""
              />

              <Image
                height={500}
                width={500}
                className="relative w-full xl:mx-auto xl:max-w-lg 2xl:origin-bottom 2xl:scale-110"
                src={businessWoman}
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default About
