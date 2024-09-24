import type { Metadata } from "next"
// import { checkIfLoggedIn } from "@/actions/userIfLoggedIn"

import Header from "@/components/layout/header"
import UserSidebar from "@/components/layout/userSidebar"
import { ThemeProvider } from "@/components/theme-provider"
import axios from "axios"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { API_URL } from "@/config/env"

export const metadata: Metadata = {
  title: "Vayu || User Dashboard",
  description: "Basic dashboard with Next.js and Shadcn",
}

async function checkIfLoggedIn() {
  let isLoading = true;

  try {
    const res = await axios.get(
      `${API_URL}/users/me`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies().get("accessToken")?.value}`,
        },
      }
    );

    isLoading = false;

    if (res?.data?.id) {
      return { data: res.data, isLoading };
    } else {
      // redirect("/auth/login");
      return { data: null, isLoading };
    }
  } catch (e) {
    isLoading = false;
    // redirect("/auth/login");
    return { data: null, isLoading };
  }
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: userData, isLoading } = await checkIfLoggedIn()
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system">
        <Header userData={userData} />
        <div className="flex h-screen overflow-hidden">
          <UserSidebar userData={userData} isLoading={isLoading} />
          <main className="mt-16  w-full overflow-x-hidden overflow-y-scroll ">
            {children}
          </main>
        </div>
      </ThemeProvider>
    </>
  )
}
