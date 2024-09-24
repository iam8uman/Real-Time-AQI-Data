import React from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import UserPage from "./UserPage"

type Props = {}

const page = (props: Props) => {
  return (
    <ScrollArea className="min-h-full"> 
      <UserPage />
    </ScrollArea>
  )
}

export default page
