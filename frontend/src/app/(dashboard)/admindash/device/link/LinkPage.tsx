import React, { useState } from "react"
import Router from "next/router"
import { Copy } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

interface Props {
  token: string
  setIsOpen: (isOpen: boolean) => void
}

const LinkPage = ({ token, setIsOpen }: Props) => {
  const [copySuccess, setCopySuccess] = useState(false)

  const handleCopy = () => {
    navigator.clipboard
      .writeText(token)
      .then(() => {
        setCopySuccess(true)
        toast.success("Copied to clipboard")
        setTimeout(() => setCopySuccess(false), 2000) // Reset after 2 seconds
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err)
      })
  }

  return (
    <div>
      <div className="items-center rounded-lg border-none bg-slate-950 p-10 drop-shadow-2xl">
        <div className="mb-16 text-center">
          <h1 className="mt-8 text-3xl font-bold text-green-500">Token Link</h1>
          {/* link  */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-center text-sm font-bold text-green-500">
            <Input value={token} className="h-10  w-[80%]" />
            <Button
              variant={"link"}
              className="w-1/6"
              onClick={handleCopy}
              style={{ color: copySuccess ? "text-primary" : "text-slate-300" }} // Conditional styling
            >
              <Copy className={copySuccess ? "text-green-500" : "text-slate-300"} />
            </Button>
          </div>
          <p className="mt-4 text-sm font-medium text-gray-500">
            Keep this token safe. You can use it to access the device.
          </p>
        </div>
        <Button
          type="submit"
          variant="default"
          className="inline-flex h-12 w-full items-center justify-center rounded-sm border border-transparent bg-primary px-6 py-3 text-sm font-semibold leading-5 text-white transition-all duration-200"
          onClick={() => setIsOpen(false)}
        >
          Okay i will remember!
        </Button>
      </div>
    </div>
  )
}

export default LinkPage
