import Link from "next/link"
import { cn } from "@/lib/utils"
import Logo from "../icons/logo"
import { MobileSidebar } from "./mobile-sidebar"
import { UserNav } from "./user-nav"

type Props = {
  userData: any
}
export default function Header({ userData }: Props) {
  return (
    <div className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20  bg-background/95 border-b border-primary bg-slate-950 text-slate-300 py-1 backdrop-blur">
      <nav className="flex h-16 items-center justify-between px-2">
        <div className="mx-6 hidden lg:block">
          <Link href="/dashboard">
            <Logo height={70} width={100} />
          </Link>
        </div>
        <div className="flex gap-2">
          <div className="search hidden justify-end lg:block">
          </div>
          <div className={cn("block lg:!hidden")}>
            <MobileSidebar />
          </div>

          <div className="flex items-center justify-between gap-2 pr-6 ">
            <UserNav userData={userData} />
          </div>
        </div>
      </nav>
    </div>
  )
}
