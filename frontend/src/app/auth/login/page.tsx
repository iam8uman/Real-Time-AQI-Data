import React from "react"
import Login from "@/components/auth-form/LoginForm"
import { metaObject } from "@/config/site.config";

export const metadata = {
  ...metaObject('Login To Vayu'),
};

const page = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-slate-950">
      <Login />
    </div>
  )
}

export default page
