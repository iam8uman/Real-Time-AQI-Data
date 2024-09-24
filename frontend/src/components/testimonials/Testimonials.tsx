import React from "react"

const Testimonials = () => {
  return (
    <div>
      <section className="bg-gray-950 py-12 sm:py-16 lg:py-20 xl:py-44">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-200 sm:text-4xl lg:text-5xl">
              Don&apos;t just take our words.
            </h2>
          </div>

          <div className="mx-auto mt-12 grid max-w-md grid-cols-1 gap-5 sm:mt-16 lg:max-w-none lg:grid-cols-3">
            <div className="rounded-2xl bg-gray-600 xl:-rotate-2">
              <div className="p-8">
                <blockquote>
                  <p className="text-xl font-medium leading-9 text-black">
                    "We love Landingfolio! Our designers were using it for their
                    projects, so clients already knew what Landingfolio was and
                    how to use it."
                  </p>
                </blockquote>
                <p className="mt-6 text-base font-semibold text-gray-900">
                  Bessie Cooper
                </p>
                <p className="mt-1 text-base font-normal text-gray-200">
                  Co-Founder, CEO
                </p>
                <div className="mt-5 flex items-center justify-between border-t border-gray-200 pt-5">
                  <img
                    className="h-7 w-auto"
                    src="https://landingfoliocom.imgix.net/store/collection/saasui/images/testimonial/5/alterbone.svg"
                    alt=""
                  />
                  <img
                    className="h-10 w-10 rounded-full object-cover"
                    src="https://landingfoliocom.imgix.net/store/collection/saasui/images/testimonial/5/avatar-male-1.png"
                    alt=""
                  />
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-gray-600 xl:rotate-2">
              <div className="p-8">
                <blockquote>
                  <p className="text-xl font-medium leading-9 text-black">
                    "I didn&apos;t know designing in Figma could be this
                    individualized. I&apos;d never considered it before, but
                    Landingfolio changed my mind."
                  </p>
                </blockquote>
                <p className="mt-6 text-base font-semibold text-gray-900">
                  Albert Flores
                </p>
                <p className="mt-1 text-base font-normal text-gray-200">
                  Senior Product Manager
                </p>
                <div className="mt-5 flex items-center justify-between border-t border-gray-200 pt-5">
                  <img
                    className="h-7 w-auto"
                    src="https://landingfoliocom.imgix.net/store/collection/saasui/images/testimonial/5/ridoria.svg"
                    alt=""
                  />
                  <img
                    className="h-10 w-10 rounded-full object-cover"
                    src="https://landingfoliocom.imgix.net/store/collection/saasui/images/testimonial/5/avatar-female-1.png"
                    alt=""
                  />
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-gray-600 xl:-rotate-2">
              <div className="p-8">
                <blockquote>
                  <p className="text-xl font-medium leading-9 text-black">
                    "We love Landingfolio! Our designers were using it for their
                    projects, so clients already knew what Landingfolio was and
                    how to use it."
                  </p>
                </blockquote>
                <p className="mt-6 text-base font-semibold text-gray-900">
                  Jenny Wilson
                </p>
                <p className="mt-1 text-base font-normal text-gray-200">
                  Head of Marketing
                </p>
                <div className="mt-5 flex items-center justify-between border-t border-gray-200 pt-5">
                  <img
                    className="h-7 w-auto"
                    src="https://landingfoliocom.imgix.net/store/collection/saasui/images/testimonial/5/incanto.svg"
                    alt=""
                  />
                  <img
                    className="h-10 w-10 rounded-full object-cover"
                    src="https://landingfoliocom.imgix.net/store/collection/saasui/images/testimonial/5/avatar-female-2.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Testimonials
