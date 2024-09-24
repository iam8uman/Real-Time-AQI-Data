import React from "react"
import Header from "@/components/layout/header"
import Sidebar from "@/components/layout/sidebar"
import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { API_URL } from "@/config/env";


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
}: Readonly<{
  children: React.ReactNode
}>) {
  const { data: userData, isLoading } = await checkIfLoggedIn()
  return (
    <div>
      <Header userData={userData} />
      <div className="flex h-screen  bg-slate-950">
        <Sidebar userData={userData} isLoading={isLoading} />
        <main className="mt-20  w-full overflow-x-hidden overflow-y-scroll md:p-4">
          {children}
        </main>
      </div>
    </div>
  )
}
