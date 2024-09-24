import React from "react"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

import { API_URL } from "@/config/env"
// import { routes } from "@/config/routes"
import { serverFetch } from "@/lib/graphql-server-fetch"

interface AuthProps {
  children: React.ReactNode
}

const AuthProvider: React.FC<AuthProps> = async ({ children }) => {

  axios.get(`${API_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${cookies().get("accessToken")?.value}`,
    },
  }).then((res) => {
    console.log(res.data, "ress")
  }).catch((e) => {
    console.log(e, "error")
    redirect("auth/")
  }
  )


  // console.log(data, "dataaaaaa")

  // } catch (e) {
  //   console.log(e)
  //   redirect("auth/")
  // }
  return <>{children}</>
}

export default AuthProvider
