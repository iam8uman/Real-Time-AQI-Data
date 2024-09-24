"use client"

import { Dispatch, SetStateAction } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { NavItem } from "@/types"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

import { Separator } from "./ui/separator"

interface DashboardNavProps {
  items: NavItem[]
  setOpen?: Dispatch<SetStateAction<boolean>>
}

export function DashboardNav({ items, setOpen }: DashboardNavProps) {
  const path = usePathname()

  if (!items?.length) {
    return null
  }

  return (
    <nav className="grid items-start gap-2">
      {items.map((item, index) => {
        const Icon = Icons[item.icon || "arrowRight"]
        return (
          item.href && (
            <>
              <Link
                key={index}
                href={item.disabled ? "/" : item.href}
                onClick={() => {
                  if (setOpen) setOpen(false)
                }}
              >
                <span
                  className={cn(
                    "text-md group flex items-center rounded-sm px-3 py-3 font-medium hover:bg-slate-700 hover:text-green-400",
                    path.split("/")[2] === item.href.split("/")[2]
                      ? "bg-slate-700 text-green-500"
                      : "text-gray-300",
                    item.disabled && "cursor-not-allowed opacity-80"
                  )}
                >
                  <Icon className="mr-2 h-4 w-4 " />
                  <span>{item.title}</span>
                </span>
              </Link>
              {/* <div className="absolute bottom-0 left-0 w-full">
                <Link
                  href="/admindash/profile"
                  className={cn(
                    "group flex w-full items-center gap-2 rounded-none px-3 py-3 text-sm font-medium bg-black text-white hover:bg-slate-700 hover:text-green-400"
                  )}
                >
                  <Image
                    className="h-10 w-10 rounded-full object-fill bg-primary"
                    alt="logo"
                    width={40}
                    height={40}
                    src={"/The Wind.svg"}
                  />
                  <span className="text-lg font-extrabold md:pl-3">
                    ADMIN
                  </span>{" "}
                </Link>
              </div> */}
            </>
          )
        )
      })}
    </nav>
  )
}
// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";

// import { Icons } from "@/components/icons";
// import { cn } from "@/lib/utils";
// import { NavItem } from "@/types";
// import { Dispatch, SetStateAction, useState } from "react";
// import { PanelsLeftBottom, Settings } from "lucide-react";
// import { useQuery } from "@tanstack/react-query";
// import useMeStore from "@/store/use-me";
// import { LocalStore } from "@/store/localstore";
// import Image from "next/image";
// import ProfileAvatar from "./DisplayPicture";
// import useOrganizationData from "@/store/useOrganizationData";
// import { Separator } from "./ui/separator";

// interface DashboardNavProps {
//   items: NavItem[];
//   setOpen?: Dispatch<SetStateAction<boolean>>;
// }

// export function DashboardNav({ items, setOpen }: DashboardNavProps) {
//   const path = usePathname();
//   const { organization } = useOrganizationData();

//   if (!items?.length) {
//     return null;
//   }
//   return (
//     <div className="flex flex-col justify-between h-full">
//       <div className="grid items-start gap-2 h-full">
//         {items.map((item, index) => {
//           const Icon = Icons[item.icon || "arrowRight"];
//           return (
//             item.href && (
//               <Link
//                 key={index}
//                 href={item.disabled ? "/" : item.href}
//                 onClick={() => {
//                   if (setOpen) setOpen(false);
//                 }}
//               >
//                 <span
//                   className={cn(
//                     "group flex items-center rounded-none px-3 py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
//                     path.split("/")[2] === item.href.split("/")[2]
//                       ? "bg-rose-600 text-white hover:bg-rose-600/90 hover:text-white"
//                       : "transparent",
//                     item.disabled && "cursor-not-allowed opacity-80"
//                   )}
//                 >
//                   <Icon className="mr-2 h-4 w-4" />
//                   <span>{item.title}</span>
//                 </span>
//               </Link>
//             )
//           );
//         })}
//       </div>
//       <div className="absolute bottom-0 left-0 w-full">
//         <div className="mx-2">
//           <Separator className="bg-gray-300" />
//         </div>

//         <Link
//           href="/dashboard/organizations"
//           className={cn(
//             "group flex gap-2 items-center w-full rounded-none px-3 py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground text-black "
//           )}
//         >
//           {/* <PanelsLeftBottom /> */}
//           {/* <ProfileAvatar
//             updateUrl={process.env.NEXT_PUBLIC_BACKEND_API_URL_ORGANIZATIONS}
//             type="organizations"
//             id={0}
//             refetch={refetch}
//             fieldName="file"
//             src={data?.logo }
//             route="update-logo"
//             hasPermission={false}
//           />{" "} */}
//           <Image
//             className="rounded-full object-fill h-12 w-12"
//             alt="logo"
//             width={40}
//             height={40}
//             src={`${process.env.NEXT_PUBLIC_BACKEND_API_URL_ORGANIZATIONS}/${organization?.logo}`}
//           />
//           <span className="md:pl-3 text-lg font-extrabold">
//             {organization && capitalizeWords(organization.name)}
//           </span>{" "}
//         </Link>
//       </div>
//     </div>
//   );
// }
// function capitalizeWords(str: string) {
//   return str
//     .split(" ")
//     .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//     .join(" ");
// }
