"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { LocalStore } from "@/store/localStore"
import { User } from "@/types"
import { AvatarFallback } from "@radix-ui/react-avatar"

import { clearCookie } from "@/lib/cookie"
import { Avatar } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Props = {
  userData: User
}
export function UserNav({ userData }: Props) {
  const router = useRouter()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex h-10 w-10  min-w-0 cursor-pointer items-center justify-between space-x-3 rounded-full border-2  border-green-400 bg-slate-300 text-black">
          {userData && (
            <Avatar>
              {/* <Image height={32} width={32} src={img} alt="Profile picture" /> */}
              <AvatarFallback className=" ml-2.5 flex w-full items-center justify-between font-mono  text-xl ">
                {userData.email.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          )}
        </div>
      </DropdownMenuTrigger>
      {userData && (
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {" "}
                {userData.email.split("@")[0]}{" "}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {userData.email}
              </p>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <Link
              href={`/${userData.roles?.[0]?.name === "Admin" ? "admindash" : "userdash"}/profile`}
            >
              <DropdownMenuItem>
                Profile
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              LocalStore.remove("jwt")
              clearCookie("accessToken")
              router.replace("/")
            }}
          >
            Logout
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  )
}
