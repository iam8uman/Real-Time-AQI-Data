import React from "react"

const Pricing = () => {
  return (
    <>
      <section className="bg-white py-12 sm:py-16 lg:py-20 xl:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
              Plans that scale with business
            </h2>
            <p className="mt-4 text-base font-normal leading-7 text-gray-600 lg:mt-6 lg:text-lg lg:leading-8">
              Clarity gives you the blocks & components you need to create a
              truly professional website, landing page or admin panel for your
              SaaS.
            </p>
          </div>

          <div className="mt-8 flex items-center justify-center space-x-6 sm:mt-12">
            <div className="flex items-center">
              <input
                type="radio"
                id="monthly"
                name="pricing-plans"
                className="h-4 w-4 border border-gray-200 text-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                checked
              />
              <label
                htmlFor="monthly"
                className="ml-3 block text-sm font-medium text-gray-900 sm:text-base"
              >
                {" "}
                Monthly Plan{" "}
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="radio"
                id="yearly"
                name="pricing-plans"
                className="h-4 w-4 border border-gray-200 text-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
              <label
                htmlFor="yearly"
                className="ml-3 block text-sm font-medium text-gray-900 sm:text-base"
              >
                {" "}
                Yearly Plan{" "}
              </label>
              <span className="ml-1 text-sm font-medium text-blue-600">
                {" "}
                (Save 20%){" "}
              </span>
            </div>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 sm:mt-16 lg:mt-20 lg:grid-cols-3 lg:gap-8">
            <div className="divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white sm:rounded-3xl">
              <div className="rounded-t-2xl bg-gray-50 px-4 py-5 sm:rounded-t-3xl sm:p-6">
                <div className="flex items-start">
                  <span className="shrink-0 text-3xl"> 👋 </span>
                  <div className="ml-6">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Basic
                    </h3>
                    <p className="mt-2 text-sm font-normal text-gray-500">
                      Lorem ipsum dolor sit amet, consec tetur adipis elit
                    </p>
                  </div>
                </div>
              </div>

              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-end">
                  <p className="text-5xl font-semibold text-gray-900">$0</p>
                  <p className="py-1 text-sm font-normal text-gray-500">
                    /mo/user
                  </p>
                </div>

                <div className="mt-6">
                  <a
                    href="#"
                    title=""
                    className="inline-flex w-full items-center justify-center rounded-xl border border-transparent bg-gray-400 px-6 py-3 text-base font-medium text-white transition-all duration-200 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    role="button"
                  >
                    Get 14 days free trial
                  </a>
                </div>

                <p className="mt-8 text-xs font-semibold uppercase tracking-widest text-gray-500">
                  Best for free
                </p>

                <ul className="mt-8 space-y-4">
                  <li className="flex items-center">
                    <svg
                      className="mr-2 h-5 w-5 shrink-0 text-blue-600"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    Full Access to Landingfolio
                  </li>

                  <li className="flex items-center">
                    <svg
                      className="mr-2 h-5 w-5 shrink-0 text-blue-600"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    100 GB Free Storage
                  </li>

                  <li className="flex items-center">
                    <svg
                      className="mr-2 h-5 w-5 shrink-0 text-blue-600"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    Unlimited Visitors
                  </li>

                  <li className="flex items-center">
                    <svg
                      className="mr-2 h-5 w-5 shrink-0 text-blue-600"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    10 Agents
                  </li>

                  <li className="flex items-center">
                    <svg
                      className="mr-2 h-5 w-5 shrink-0 text-blue-600"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    Live Chat Support
                  </li>
                </ul>
              </div>
            </div>

            <div className="relative mt-14 divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white sm:rounded-3xl lg:mt-0">
              <div className="absolute right-0 top-0 -mt-8 flex items-start">
                <svg
                  className="h-16 w-auto text-blue-600"
                  viewBox="0 0 83 64"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M4.27758 62.7565C4.52847 63.5461 5.37189 63.9827 6.16141 63.7318L19.0274 59.6434C19.817 59.3925 20.2536 58.5491 20.0027 57.7595C19.7518 56.97 18.9084 56.5334 18.1189 56.7842L6.68242 60.4184L3.04824 48.982C2.79735 48.1924 1.95394 47.7558 1.16441 48.0067C0.374889 48.2576 -0.0617613 49.101 0.189127 49.8905L4.27758 62.7565ZM13.4871 47.8215L12.229 47.0047L13.4871 47.8215ZM39.0978 20.5925L38.1792 19.4067L39.0978 20.5925ZM7.03921 62.9919C8.03518 61.0681 13.1417 51.1083 14.7453 48.6383L12.229 47.0047C10.5197 49.6376 5.30689 59.8127 4.37507 61.6126L7.03921 62.9919ZM14.7453 48.6383C22.0755 37.3475 29.8244 29.6738 40.0164 21.7784L38.1792 19.4067C27.7862 27.4579 19.7827 35.3698 12.229 47.0047L14.7453 48.6383ZM40.0164 21.7784C52.6582 11.9851 67.634 7.57932 82.2576 3.44342L81.4412 0.556653C66.8756 4.67614 51.3456 9.20709 38.1792 19.4067L40.0164 21.7784Z" />
                </svg>
                <span className="-mt-2 ml-2 text-sm font-semibold text-blue-600">
                  {" "}
                  Most popular{" "}
                </span>
              </div>

              <div className="rounded-t-2xl bg-gray-50 px-4 py-5 sm:rounded-t-3xl sm:p-6">
                <div className="flex items-start">
                  <span className="shrink-0 text-3xl"> 💪 </span>
                  <div className="ml-6">
                    <h3 className="text-lg font-semibold text-gray-900">Pro</h3>
                    <p className="mt-2 text-sm font-normal text-gray-500">
                      Lorem ipsum dolor sit amet, consec tetur adipis elit
                    </p>
                  </div>
                </div>
              </div>

              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-end">
                  <p className="text-5xl font-semibold text-gray-900">$49</p>
                  <p className="py-1 text-sm font-normal text-gray-500">
                    /mo/user
                  </p>
                </div>

                <div className="mt-6">
                  <a
                    href="#"
                    title=""
                    className="inline-flex w-full items-center justify-center rounded-xl border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white transition-all duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2"
                    role="button"
                  >
                    Get 14 days free trial
                  </a>
                </div>

                <p className="mt-8 text-xs font-semibold uppercase tracking-widest text-gray-500">
                  Best for free
                </p>

                <ul className="mt-8 space-y-4">
                  <li className="flex items-center">
                    <svg
                      className="mr-2 h-5 w-5 shrink-0 text-blue-600"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    Full Access to Landingfolio
                  </li>

                  <li className="flex items-center">
                    <svg
                      className="mr-2 h-5 w-5 shrink-0 text-blue-600"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    100 GB Free Storage
                  </li>

                  <li className="flex items-center">
                    <svg
                      className="mr-2 h-5 w-5 shrink-0 text-blue-600"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    Unlimited Visitors
                  </li>

                  <li className="flex items-center">
                    <svg
                      className="mr-2 h-5 w-5 shrink-0 text-blue-600"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    10 Agents
                  </li>

                  <li className="flex items-center">
                    <svg
                      className="mr-2 h-5 w-5 shrink-0 text-blue-600"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    Live Chat Support
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white sm:rounded-3xl lg:mt-0">
              <div className="rounded-t-2xl bg-gray-50 px-4 py-5 sm:rounded-t-3xl sm:p-6">
                <div className="flex items-start">
                  <span className="shrink-0 text-3xl"> 🚀 </span>
                  <div className="ml-6">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Exclusive
                    </h3>
                    <p className="mt-2 text-sm font-normal text-gray-500">
                      Lorem ipsum dolor sit amet, consec tetur adipis elit
                    </p>
                  </div>
                </div>
              </div>

              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-end">
                  <p className="text-5xl font-semibold text-gray-900">$99</p>
                  <p className="py-1 text-sm font-normal text-gray-500">
                    /mo/user
                  </p>
                </div>

                <div className="mt-6">
                  <a
                    href="#"
                    title=""
                    className="inline-flex w-full items-center justify-center rounded-xl border border-transparent bg-gray-400 px-6 py-3 text-base font-medium text-white transition-all duration-200 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    role="button"
                  >
                    Get 14 days free trial
                  </a>
                </div>

                <p className="mt-8 text-xs font-semibold uppercase tracking-widest text-gray-500">
                  Best for free
                </p>

                <ul className="mt-8 space-y-4">
                  <li className="flex items-center">
                    <svg
                      className="mr-2 h-5 w-5 shrink-0 text-blue-600"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    Full Access to Landingfolio
                  </li>

                  <li className="flex items-center">
                    <svg
                      className="mr-2 h-5 w-5 shrink-0 text-blue-600"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    100 GB Free Storage
                  </li>

                  <li className="flex items-center">
                    <svg
                      className="mr-2 h-5 w-5 shrink-0 text-blue-600"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    Unlimited Visitors
                  </li>

                  <li className="flex items-center">
                    <svg
                      className="mr-2 h-5 w-5 shrink-0 text-blue-600"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    10 Agents
                  </li>

                  <li className="flex items-center">
                    <svg
                      className="mr-2 h-5 w-5 shrink-0 text-blue-600"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    Live Chat Support
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Pricing
