import { Metadata } from "next"
import { Montserrat } from "next/font/google"

import "./globals.css"

import { metaObject } from "@/config/site.config"
import { ReactQueryProvider } from "@/lib/providers/QueryProviders"
import { Toaster } from "@/components/ui/sonner"

const montserrat = Montserrat({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display:'swap',
  fallback: ['Arial', 'sans-serif'],
});

// metadata write here

export const metadata = {
  ...metaObject("Vayu - Air Quality Monitoring System"),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <ReactQueryProvider>
          <div className="flex overflow-hidden">
            <main className="w-full">
              {children}
              <Toaster richColors />
            </main>
          </div>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
