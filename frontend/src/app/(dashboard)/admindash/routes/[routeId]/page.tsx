import React from "react"

import RoutesPage from "./RoutesPage"
import { ScrollArea } from "@/components/ui/scroll-area"

const page = () => {
  return (
    <div>
      <ScrollArea className="min-h-full">
        <RoutesPage />
      </ScrollArea>
    </div>
  )
}

export default page
