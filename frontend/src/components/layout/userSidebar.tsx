"use client"

import { DashboardNav } from "@/components/dashboard-nav";
import { navItemsUser } from "@/constants/data";
import { cn } from "@/lib/utils";
import useMeStore from "@/store/useMeStore";
import { useEffect } from "react";


type Props = {
  userData: any
  isLoading: boolean
}


export default function UserSidebar({ userData, isLoading }: Props) {
  const { setMeData, setIsLoading } = useMeStore()

  useEffect(() => {
    if (userData || isLoading) {
      setMeData(userData)
      setIsLoading(isLoading)
    }
  }, [userData, setMeData, isLoading])

  return (
    <nav
    className={cn(`relative hidden h-screen w-72 border-r border-primary pt-16 lg:block bg-slate-950`)}
    >
      <div className="space-y-4 py-4">
        <div className="px-2 py-2">
          <div className="space-y-1">
            <DashboardNav items={navItemsUser} />
          </div>
        </div>
      </div>
    </nav>
  );
}
