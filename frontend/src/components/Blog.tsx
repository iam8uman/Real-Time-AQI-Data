import React from "react"

const Blog = () => {
  return (
    <div className="">
      <section className="bg-slate-950 py-12 text-slate-300 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-lg text-center">
            <h2 className="text-3xl font-bold  text-slate-300 sm:text-4xl">
              Read Latest Articles
            </h2>
            <p className="mx-auto mt-5 w-full text-base font-normal leading-7 text-gray-500">
             Our blog is a place where we share our thoughts, ideas, and experiences. We write about design, development, and business, but also about our journey and the lessons we learned along the way.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-md grid-cols-1 gap-x-8 gap-y-12 sm:mt-16 md:max-w-none md:grid-cols-3">
            <div className="group flex flex-col">
              <a
                href="/blog"
                title=""
                className="aspect-w-16 aspect-h-9 flex shrink-0 overflow-hidden"
              >
                <img
                  className="h-52 w-full transform object-cover transition-all duration-200 group-hover:scale-110"
                  src="https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt=""
                />
              </a>
              <a href="/blog" title="" className="flex flex-1 flex-col">
                <p className="mt-6 text-2xl font-bold  text-slate-300">
                  AQI index & Its Importance
                </p>
                <p className="mt-4 line-clamp-2 text-sm leading-6 text-gray-500">
                    The AQI is an index for reporting air quality on a daily basis. It tells you how clean or polluted your air is, and what associated health effects might be a concern for you.
                </p>
              </a>
              <div className="mt-6 lg:mt-8">
                <a
                  href="/blog"
                  title=""
                  className="group inline-flex items-center text-xs font-bold uppercase tracking-widest  text-slate-300"
                >
                  Continue Reading
                  <svg
                    className="ml-2 h-4 w-4 transform transition-all duration-200 group-hover:translate-x-1"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </a>
              </div>
            </div>

            <div className="group flex flex-col">
              <a
                href="/blog"
                title=""
                className="aspect-w-16 aspect-h-9 flex shrink-0 overflow-hidden"
              >
                <img
                  className="h-52 w-full transform object-cover transition-all duration-200 group-hover:scale-110"
                  src="https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/blog-grid/3/thumbnail-2.png"
                  alt=""
                />
              </a>
              <a href="/blog" title="" className="flex flex-1 flex-col">
                <p className="mt-6 text-2xl font-bold  text-slate-300">
                  Real Time Data AQI data in Vayu App
                </p>
                <p className="mt-4 line-clamp-2 text-sm leading-6 text-gray-500">
                    Vayu App provides real-time AQI data for your location. It helps you to know the air quality index of your location and take necessary precautions.
                </p>
              </a>
              <div className="mt-6 lg:mt-8">
                <a
                  href="/blog"
                  title=""
                  className="group inline-flex items-center text-xs font-bold uppercase tracking-widest  text-slate-300"
                >
                  Continue Reading
                  <svg
                    className="ml-2 h-4 w-4 transform transition-all duration-200 group-hover:translate-x-1"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </a>
              </div>
            </div>

            <div className="group flex flex-col">
              <a
                href="/blog"
                title=""
                className="aspect-w-16 aspect-h-9 flex shrink-0 overflow-hidden"
              >
                <img
                  className="h-52 w-full transform object-cover transition-all duration-200 group-hover:scale-110"
                  src="https://images.pexels.com/photos/459728/pexels-photo-459728.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt=""
                />
              </a>
              <a href="/blog" title="" className="flex flex-1 flex-col">
                <p className="mt-6 text-2xl font-bold  text-slate-300">
                  Polution and its effects on the environment
                </p>
                <p className="mt-4 line-clamp-2 text-sm leading-6 text-gray-500">
                  Polution is a major problem in the world today. It has a wide range of effects on the environment, human health, and the economy.
                </p>
              </a>
              <div className="mt-6 lg:mt-8">
                <a
                  href="/blog"
                  title=""
                  className="group inline-flex items-center text-xs font-bold uppercase tracking-widest  text-slate-300"
                >
                  Continue Reading
                  <svg
                    className="ml-2 h-4 w-4 transform transition-all duration-200 group-hover:translate-x-1"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Blog
