import React from "react"

import SignupForm from "@/components/auth-form/SignupForm"

export const metadata = {
  title: "Sign Up",
  description: "Sign up to Vayu",
}

const page = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-slate-950">
      <SignupForm />
    </div>
  )
}

export default page
