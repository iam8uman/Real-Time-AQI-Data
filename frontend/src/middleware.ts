import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import axios from "axios"
import { jwtDecode } from "jwt-decode"

import { API_URL } from "./config/env"

interface MyCookies {
  accessToken?: {
    name: string
    value: string
  }
}

interface User {
  id: string
  roles: [
    {
      id: string
      name: string
    },
  ]
}

interface DecodedToken {
  userId?: string
  role?: string
}

interface NextRequestWithUser extends NextRequest {
  user?: User
}

export async function middleware(request: NextRequest) {
  const cookiesStore = cookies()
  const accessTokenCookie = cookiesStore.get("accessToken")
  const currentPath = new URL(request.url).pathname

  // Bypass middleware logic for the root path
  if (currentPath === "/") {
    return NextResponse.next()
  }

  const accessToken = accessTokenCookie?.value
  let decodedToken: DecodedToken | undefined

  try {
    if (accessToken) {
      decodedToken = jwtDecode<DecodedToken>(accessToken)
      console.log("one")
    }
  } catch (e) {
    console.log("two")
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }

  if (decodedToken?.userId) {
    try {
      const res = await axios.get(`${API_URL}/users/me`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      const user = await res.data

      ;(request as NextRequestWithUser).user = user
    } catch (e: any) {
      return NextResponse.redirect(new URL("/auth/login", request.url))
    }
  }

  const user = (request as NextRequestWithUser).user

  if (
    user &&
    (currentPath === "/auth/login" || currentPath === "/auth/signup")
  ) {
    // User is logged in and trying to access login or signup, redirect based on role
    if (
      user &&
      user.roles &&
      user.roles.length > 0 &&
      user.roles[0].name === "Admin"
    ) {
      return NextResponse.redirect(new URL("/admindash", request.url))
    } else {
      return NextResponse.redirect(new URL("/userdash", request.url))
    }
  }

  if (
    !decodedToken?.userId &&
    currentPath !== "/auth/login" &&
    currentPath !== "/auth/signup"
  ) {
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }

  if (user && user.roles && user.roles.length > 0) {
    if (user.roles[0]?.name === "Admin") {
      if (!currentPath.startsWith("/admindash")) {
        return NextResponse.redirect(new URL("/admindash", request.url))
      }
      if (currentPath.startsWith("/userdash")) {
        return NextResponse.redirect(new URL("/admindash", request.url))
      }
    }
    if (user.roles[0].name === "User") {
      if (!currentPath.startsWith("/userdash")) {
        return NextResponse.redirect(new URL("/userdash", request.url))
      }
      if (currentPath.startsWith("/admindash")) {
        return NextResponse.redirect(new URL("/userdash", request.url))
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/admindash",
    "/userdash",
    "/auth/login",
    "/auth/signup",
    "/admindash/:path*",
    "/userdash/:path*",
    "/",
  ],
}
