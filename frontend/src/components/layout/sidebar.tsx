"use client"

import { useEffect } from "react"
import { navItems } from "@/constants/data"
import useMeStore from "@/store/useMeStore"

import { cn } from "@/lib/utils"
import { DashboardNav } from "@/components/dashboard-nav"

type Props = {
  userData: any
  isLoading: boolean
}


export default function Sidebar({ userData, isLoading }: Props) {
  const { setMeData, setIsLoading } = useMeStore()

  useEffect(() => {
    if (userData || isLoading) {
      setMeData(userData)
      setIsLoading(isLoading)
    }
  }, [userData, setMeData, isLoading])

  return (
    <nav
      className={cn(`relative hidden h-screen w-72 border-r border-primary pt-16 lg:block `)}
    >
      <div className="space-y-4 py-4 ">
        <div className="px-2 py-2">
          <div className="space-y-1">
            <DashboardNav items={navItems} />
          </div>
        </div>
      </div>
    </nav>
  )
}
